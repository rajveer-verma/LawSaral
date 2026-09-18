from typing import Annotated, TypedDict

from langchain_core.messages import (
    AIMessage,
    BaseMessage,
    SystemMessage,
    ToolMessage,
)
from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages

from app.services.gemini_service import llm
from app.tools.document_tools import search_document


class AgentState(TypedDict):
    messages: Annotated[list[BaseMessage], add_messages]
    document_id: str


SYSTEM_PROMPT = """
You are LawSaral, an AI legal document analysis agent.

You have access to the uploaded legal document through the search_document tool.

IMPORTANT RULES:

1. When the user asks about information from the document, use the
   search_document tool.

2. Carefully inspect ALL retrieved results before answering.
   Never rely only on the first result.

3. Distinguish between different legal concepts even when they use
   similar words.

4. In particular, distinguish:
   - termination notice period
   - official notice delivery/receipt period
   - arbitration or dispute-resolution period

5. If the user asks:
   "What is the notice period for terminating the agreement?"
   then look for the TERMINATION clause.

6. If the user asks:
   "How long does an official notice take to be received?"
   then look for the NOTICES clause.

7. If the question is ambiguous, explain the relevant distinctions
   instead of incorrectly choosing one meaning.

8. Use only information found in the uploaded document.
   Do not invent facts.

9. Give a concise answer and mention the relevant section/clause
   when possible.

10. VAGUE QUESTION RULE:
    If the user's question is too vague to identify what information
    they are asking for, do not search the document.

    Examples of vague questions:
    - "What?"
    - "Tell me"
    - "Explain"
    - "Tell me something"
    - "What do you know?"

    For a vague question, politely ask the user to clarify what they
    want to know about the document.

    Do not give a generic greeting.
    Do not provide unrelated information from the document.
"""


def is_vague_question(message: str) -> bool:
    """
    Detect very common vague inputs before sending them to Gemini.
    This prevents unnecessary document search and Gemini calls.
    """

    normalized = " ".join(message.strip().lower().split())

    vague_questions = {
        "what",
        "what?",
        "tell me",
        "tell me?",
        "explain",
        "explain?",
        "tell me something",
        "tell me something?",
        "what do you know",
        "what do you know?",
    }

    return normalized in vague_questions


def agent(state: AgentState):
    user_message = state["messages"][-1]

    # Handle vague questions without calling Gemini or Qdrant.
    if isinstance(user_message, BaseMessage):
        user_content = user_message.content

        if isinstance(user_content, str) and is_vague_question(user_content):
            return {
                "messages": [
                    AIMessage(
                        content=(
                            "Your question is too vague. Please specify "
                            "what you would like to know about the document. "
                            "For example, you can ask about payment terms, "
                            "termination, liability, confidentiality, or "
                            "data privacy."
                        )
                    )
                ]
            }

    messages = [
        SystemMessage(content=SYSTEM_PROMPT),
        *state["messages"],
    ]

    response = llm.bind_tools([search_document]).invoke(messages)

    return {
        "messages": [response]
    }


def tool_node(state: AgentState):
    last_message = state["messages"][-1]

    results = []

    for tool_call in last_message.tool_calls:
        tool_args = dict(tool_call["args"])

        # The agent does not need to provide the document_id.
        # We take it securely from the graph state.
        tool_args["document_id"] = state["document_id"]

        result = search_document.invoke(tool_args)

        results.append(
            ToolMessage(
                content=result,
                tool_call_id=tool_call["id"],
            )
        )

    return {
        "messages": results
    }


def should_continue(state: AgentState):
    last_message = state["messages"][-1]

    if last_message.tool_calls:
        return "tools"

    return END


builder = StateGraph(AgentState)

builder.add_node("agent", agent)
builder.add_node("tools", tool_node)

builder.add_edge(START, "agent")

builder.add_conditional_edges(
    "agent",
    should_continue,
    {
        "tools": "tools",
        END: END,
    },
)

builder.add_edge("tools", "agent")

agent_graph = builder.compile()