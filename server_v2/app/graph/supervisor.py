from typing import Annotated, TypedDict

from langchain_core.messages import BaseMessage
from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages

from app.graph.agent_graph import agent_graph
from app.graph.risk_graph import risk_graph


class SupervisorState(TypedDict):
    messages: Annotated[list[BaseMessage], add_messages]
    document_id: str
    route: str
    answer: str


def supervisor(state):
    user_message = state["messages"][-1].content.lower().strip()

    risk_keywords = [
        "risk",
        "risky",
        "red flag",
        "red flags",
        "danger",
        "dangerous",
        "analyze risk",
        "analyse risk",
        "analyze risks",
        "analyse risks",
        "risk analysis",
        "risk assessment",
        "identify risks",
        "find risks",
        "potential risks",
        "risky clauses",
    ]

    is_risk_request = any(
        keyword in user_message
        for keyword in risk_keywords
    )

    return {
        "route": "risk" if is_risk_request else "document"
    }


def document_agent_node(state):
    result = agent_graph.invoke(
        {
            "messages": state["messages"],
            "document_id": state["document_id"],
        }
    )

    return {
        "answer": result["messages"][-1].content
    }


def risk_agent_node(state):
    result = risk_graph.invoke(
        {
            "document_id": state["document_id"],
            "clauses": "",
            "answer": "",
        }
    )

    return {
        "answer": result["answer"]
    }


def route_request(state):
    if state["route"] == "risk":
        return "risk_agent"

    return "document_agent"


builder = StateGraph(SupervisorState)

builder.add_node(
    "supervisor",
    supervisor
)

builder.add_node(
    "document_agent",
    document_agent_node
)

builder.add_node(
    "risk_agent",
    risk_agent_node
)

builder.add_edge(
    START,
    "supervisor"
)

builder.add_conditional_edges(
    "supervisor",
    route_request,
    {
        "document_agent": "document_agent",
        "risk_agent": "risk_agent",
    }
)

builder.add_edge(
    "document_agent",
    END
)

builder.add_edge(
    "risk_agent",
    END
)

supervisor_graph = builder.compile()
