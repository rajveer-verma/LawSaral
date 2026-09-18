from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel

from langchain_google_genai.chat_models import GoogleRateLimitError

from app.graph.agent_graph import agent_graph
from app.config.database import db
from app.api.dependencies import get_current_user, get_owned_document


router = APIRouter(
    prefix="/api/chat",
    tags=["Chat"]
)


class ChatRequest(BaseModel):
    message: str
    document_id: str


@router.post("")
def chat(
    request: ChatRequest,
    current_user: dict = Depends(get_current_user)
):
    firebase_uid = current_user.get("uid")

    # Make sure the document belongs to the logged-in user
    get_owned_document(
        request.document_id,
        firebase_uid
    )

    try:
        result = agent_graph.invoke(
            {
                "messages": [
                    {
                        "role": "user",
                        "content": request.message
                    }
                ],
                "document_id": request.document_id,
            }
        )

        answer = result["messages"][-1].content

    except GoogleRateLimitError:
        raise HTTPException(
            status_code=429,
            detail="Gemini AI quota is temporarily exhausted. Please try again later."
        )

    except Exception as error:
        print("Document chat error:", repr(error))

        raise HTTPException(
            status_code=500,
            detail="Unable to process your document question right now."
        )

    # Save successful chat only
    db.document_chats.insert_one(
        {
            "firebase_uid": firebase_uid,
            "document_id": request.document_id,
            "question": request.message,
            "answer": answer,
        }
    )

    return {
        "message": request.message,
        "document_id": request.document_id,
        "answer": answer,
    }


@router.get("/history/{document_id}")
def get_document_chat_history(
    document_id: str,
    current_user: dict = Depends(get_current_user)
):
    firebase_uid = current_user.get("uid")

    # Make sure the document belongs to the logged-in user
    get_owned_document(
        document_id,
        firebase_uid
    )

    chats = list(
        db.document_chats.find(
            {
                "firebase_uid": firebase_uid,
                "document_id": document_id,
            },
            {
                "_id": 0
            }
        ).sort("_id", 1)
    )

    return {
        "document_id": document_id,
        "chats": chats,
    }