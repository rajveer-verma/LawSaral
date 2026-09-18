from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel

from langchain_google_genai.chat_models import GoogleRateLimitError

from app.services.gemini_service import llm
from app.config.database import db
from app.api.dependencies import get_current_user


router = APIRouter(
    prefix="/api/general",
    tags=["General Legal AI"]
)


class GeneralChatRequest(BaseModel):
    message: str


SYSTEM_PROMPT = """
You are LawSaral, an AI legal assistant.

Answer general legal questions clearly and simply.

Rules:
- Do not invent laws, sections, cases, or facts.
- If jurisdiction or current law matters, clearly mention that it should be verified.
- Do not present the response as a substitute for professional legal advice.
"""


@router.post("/chat")
def general_chat(
    request: GeneralChatRequest,
    current_user: dict = Depends(get_current_user)
):
    firebase_uid = current_user.get("uid")

    message = request.message.strip()

    if not message:
        raise HTTPException(
            status_code=400,
            detail="Message cannot be empty."
        )

    prompt = f"""
{SYSTEM_PROMPT}

User Question:
{message}

Answer:
"""

    try:
        response = llm.invoke(prompt)
        answer = response.content

    except GoogleRateLimitError:
        raise HTTPException(
            status_code=429,
            detail="Gemini AI quota is temporarily exhausted. Please try again later."
        )

    except Exception as error:
        print("General Legal AI error:", repr(error))

        raise HTTPException(
            status_code=500,
            detail="Unable to process your legal question right now."
        )

    # Save only successful responses
    db.general_chats.insert_one(
        {
            "firebase_uid": firebase_uid,
            "question": message,
            "answer": answer,
        }
    )

    return {
        "question": message,
        "answer": answer,
    }


@router.get("/history")
def get_general_chat_history(
    current_user: dict = Depends(get_current_user)
):
    firebase_uid = current_user.get("uid")

    chats = list(
        db.general_chats.find(
            {
                "firebase_uid": firebase_uid
            },
            {
                "_id": 0
            }
        ).sort("_id", 1)
    )

    return {
        "chats": chats
    }