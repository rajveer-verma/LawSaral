from typing import TypedDict

from langgraph.graph import StateGraph, START, END

from app.services.vector_service import vector_store
from app.services.gemini_service import llm


class RAGState(TypedDict):
    question: str
    context: str
    answer: str


def retrieve(state: RAGState):
    documents = vector_store.similarity_search(
        state["question"],
        k=3,
    )

    context = "\n\n".join(
        document.page_content
        for document in documents
    )

    return {
        "context": context
    }


def generate(state: RAGState):
    prompt = f"""
You are LawSaral, an AI legal document assistant.

Answer the user's question using ONLY the provided document context.

If the answer is not present in the context, say:
"I could not find this information in the uploaded document."

Do not invent legal facts.

Document Context:
{state["context"]}

User Question:
{state["question"]}

Answer:
"""

    response = llm.invoke(prompt)

    return {
        "answer": response.content
    }


builder = StateGraph(RAGState)

builder.add_node("retrieve", retrieve)
builder.add_node("generate", generate)

builder.add_edge(START, "retrieve")
builder.add_edge("retrieve", "generate")
builder.add_edge("generate", END)

rag_graph = builder.compile()
