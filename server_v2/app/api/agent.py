from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel

from app.graph.supervisor_graph import supervisor_graph
from app.api.dependencies import (
    get_current_user,
    get_owned_document,
)

from app.config.database import db


router = APIRouter(
    prefix="/api/agent",
    tags=["Agent"],
)


# ==========================================
# REQUEST MODEL
# ==========================================

class AgentRequest(BaseModel):
    message: str
    document_id: str


# ==========================================
# RUN AGENT
# ==========================================

@router.post("")
def run_agent(
    request: AgentRequest,
    current_user=Depends(get_current_user),
):
    firebase_uid = current_user.get("uid")

    # --------------------------------------
    # Validate message
    # --------------------------------------

    if not request.message.strip():
        raise HTTPException(
            status_code=400,
            detail="Message cannot be empty.",
        )

    # --------------------------------------
    # Validate document ownership
    # --------------------------------------

    get_owned_document(
        request.document_id,
        firebase_uid,
    )

    # --------------------------------------
    # Run Supervisor
    # --------------------------------------

    try:
        result = supervisor_graph.invoke(
            {
                "messages": [
                    {
                        "role": "user",
                        "content": request.message,
                    }
                ],
                "document_id": request.document_id,
                "route": "",
                "answer": "",
            }
        )

    except Exception as error:

        error_message = str(error).lower()

        # Gemini quota / rate limit
        if (
            "resource_exhausted" in error_message
            or "quota" in error_message
            or "rate limit" in error_message
            or "429" in error_message
        ):
            raise HTTPException(
                status_code=429,
                detail=(
                    "Gemini AI quota is temporarily "
                    "exhausted. Please try again later."
                ),
            )

        print(
            "AGENT ERROR:",
            repr(error),
        )

        raise HTTPException(
            status_code=500,
            detail=(
                "Unable to process the document question."
            ),
        )

    # --------------------------------------
    # Get answer
    # --------------------------------------

    answer = result.get("answer", "")

    if not answer:
        raise HTTPException(
            status_code=500,
            detail="No answer was generated.",
        )

    # --------------------------------------
    # SAVE CHAT HISTORY
    # --------------------------------------

    try:
        db.document_chats.insert_one(
            {
                "firebase_uid": firebase_uid,
                "document_id": request.document_id,
                "question": request.message.strip(),
                "answer": answer,
            }
        )

    except Exception as error:

        print(
            "CHAT HISTORY SAVE ERROR:",
            repr(error),
        )

        # Do not fail the AI response just because
        # history saving failed.
        pass

    # --------------------------------------
    # RESPONSE
    # --------------------------------------

    return {
        "message": request.message,
        "document_id": request.document_id,
        "route": result.get("route", ""),
        "answer": answer,
    }

