from fastapi import Header, HTTPException

from app.config.firebase_auth import verify_firebase_token
from app.config.database import db


def get_current_user(
    authorization: str | None = Header(default=None)
):
    if not authorization:
        raise HTTPException(
            status_code=401,
            detail="Authorization header is required"
        )

    if not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=401,
            detail="Invalid Authorization header"
        )

    id_token = authorization[7:].strip()

    if not id_token:
        raise HTTPException(
            status_code=401,
            detail="Firebase ID token is missing"
        )

    try:
        decoded_token = verify_firebase_token(id_token)
        return decoded_token

    except Exception:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired Firebase ID token"
        )


def get_owned_document(
    document_id: str,
    firebase_uid: str
):
    document = db.documents.find_one(
        {
            "document_id": document_id,
            "firebase_uid": firebase_uid,
        },
        {
            "_id": 0
        }
    )

    if not document:
        raise HTTPException(
            status_code=404,
            detail="Document not found"
        )

    return document