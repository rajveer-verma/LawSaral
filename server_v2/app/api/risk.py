from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel

from langchain_google_genai.chat_models import GoogleRateLimitError

from app.graph.risk_graph import risk_graph
from app.config.database import db
from app.api.dependencies import get_current_user, get_owned_document


router = APIRouter(
    prefix="/api/risk",
    tags=["Risk Analysis"]
)


class RiskRequest(BaseModel):
    document_id: str


@router.post("/analyze")
def analyze_document_risk(
    request: RiskRequest,
    current_user: dict = Depends(get_current_user)
):
    firebase_uid = current_user.get("uid")

    # Security: user can analyze only their own document
    get_owned_document(
        request.document_id,
        firebase_uid
    )

    try:
        result = risk_graph.invoke(
            {
                "document_id": request.document_id,
                "clauses": "",
                "answer": "",
            }
        )

        answer = result["answer"]

    except GoogleRateLimitError:
        raise HTTPException(
            status_code=429,
            detail="Gemini AI quota is temporarily exhausted. Please try again later."
        )

    except Exception as error:
        print("Risk Analysis error:", repr(error))

        raise HTTPException(
            status_code=500,
            detail="Unable to analyze document risks right now."
        )

    # Save only successful analysis
    db.risk_analyses.insert_one(
        {
            "firebase_uid": firebase_uid,
            "document_id": request.document_id,
            "answer": answer,
        }
    )

    return {
        "document_id": request.document_id,
        "answer": answer,
    }


@router.get("/history/{document_id}")
def get_risk_history(
    document_id: str,
    current_user: dict = Depends(get_current_user)
):
    firebase_uid = current_user.get("uid")

    # Security: user can access only their own document
    get_owned_document(
        document_id,
        firebase_uid
    )

    analyses = list(
        db.risk_analyses.find(
            {
                "firebase_uid": firebase_uid,
                "document_id": document_id,
            },
            {
                "_id": 0
            }
        ).sort("_id", -1)
    )

    return {
        "document_id": document_id,
        "analyses": analyses,
    }