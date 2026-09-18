from fastapi import APIRouter, UploadFile, File, HTTPException, Depends

import os
import uuid

from qdrant_client.models import Filter, FieldCondition, MatchValue

from app.services.pdf_service import extract_text_from_pdf
from app.services.image_service import extract_text_from_image
from app.services.chunk_service import split_text
from app.services.vector_service import add_chunks
from app.services.summary_service import generate_document_summary

from app.config.database import db
from app.config.qdrant import client, COLLECTION_NAME

from app.api.dependencies import get_current_user


router = APIRouter(
    prefix="/api/documents",
    tags=["Documents"]
)


UPLOAD_DIR = "uploads"

os.makedirs(
    UPLOAD_DIR,
    exist_ok=True
)


ALLOWED_EXTENSIONS = {
    ".pdf",
    ".png",
    ".jpg",
    ".jpeg",
}


MAX_FILE_SIZE = 10 * 1024 * 1024


@router.post("/upload")
async def upload_document(
    file: UploadFile = File(...),
    current_user: dict = Depends(get_current_user)
):
    if not file.filename:
        raise HTTPException(
            status_code=400,
            detail="Filename is required"
        )

    extension = os.path.splitext(
        file.filename
    )[1].lower()

    if extension not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail=(
                "Only PDF, PNG, JPG and JPEG "
                "files are allowed"
            )
        )

    document_id = str(uuid.uuid4())

    firebase_uid = current_user.get("uid")

    if not firebase_uid:
        raise HTTPException(
            status_code=401,
            detail="Invalid authenticated user"
        )

    file_path = os.path.join(
        UPLOAD_DIR,
        f"{document_id}{extension}"
    )

    contents = await file.read()

    if len(contents) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=400,
            detail="File size must not exceed 10 MB"
        )

    try:
        with open(file_path, "wb") as f:
            f.write(contents)

        if extension == ".pdf":
            text = extract_text_from_pdf(file_path)
        else:
            text = extract_text_from_image(file_path)

        if not text or not text.strip():
            raise HTTPException(
                status_code=400,
                detail=(
                    "Could not extract text from "
                    "the uploaded document"
                )
            )

        chunks = split_text(text)

        if not chunks:
            raise HTTPException(
                status_code=400,
                detail="Could not create document chunks"
            )

        add_chunks(
            chunks=chunks,
            document_id=document_id,
            filename=file.filename,
        )

        db.documents.insert_one({
            "document_id": document_id,
            "firebase_uid": firebase_uid,
            "filename": file.filename,
            "file_path": file_path,
            "file_type": extension.replace(".", ""),
            "text_length": len(text),
            "chunks_count": len(chunks),
        })

    except HTTPException:
        if os.path.exists(file_path):
            os.remove(file_path)
        raise

    except Exception as error:
        if os.path.exists(file_path):
            os.remove(file_path)

        print(
            "Document upload error:",
            repr(error)
        )

        raise HTTPException(
            status_code=500,
            detail=(
                "Unable to process the uploaded "
                "document right now."
            )
        )

    return {
        "document_id": document_id,
        "filename": file.filename,
        "file_type": extension.replace(".", ""),
        "pages_text_length": len(text),
        "chunks_count": len(chunks),
        "message": (
            "Document uploaded, text extracted, "
            "chunked and indexed successfully"
        ),
    }


@router.get("/history")
def get_document_history(
    current_user: dict = Depends(
        get_current_user
    )
):
    firebase_uid = current_user.get("uid")

    documents = list(
        db.documents.find(
            {
                "firebase_uid": firebase_uid
            },
            {
                "_id": 0
            }
        ).sort("_id", -1)
    )

    return {
        "documents": documents
    }


@router.post("/{document_id}/summary")
def create_document_summary(
    document_id: str,
    current_user: dict = Depends(
        get_current_user
    )
):
    firebase_uid = current_user.get("uid")

    document = db.documents.find_one({
        "document_id": document_id,
        "firebase_uid": firebase_uid,
    })

    if not document:
        raise HTTPException(
            status_code=404,
            detail="Document not found"
        )

    try:
        summary = generate_document_summary(
            document_id
        )

    except Exception as error:
        print(
            "Document summary error:",
            repr(error)
        )

        raise HTTPException(
            status_code=500,
            detail=(
                "Unable to generate document "
                "summary right now."
            )
        )

    db.documents.update_one(
        {
            "document_id": document_id,
            "firebase_uid": firebase_uid,
        },
        {
            "$set": {
                "summary": summary
            }
        }
    )

    return {
        "document_id": document_id,
        "filename": document["filename"],
        "summary": summary
    }


@router.delete("/{document_id}")
def delete_document(
    document_id: str,
    current_user: dict = Depends(
        get_current_user
    )
):
    firebase_uid = current_user.get("uid")

    document = db.documents.find_one({
        "document_id": document_id,
        "firebase_uid": firebase_uid,
    })

    if not document:
        raise HTTPException(
            status_code=404,
            detail="Document not found"
        )

    try:
        client.delete(
            collection_name=COLLECTION_NAME,
            points_selector=Filter(
                must=[
                    FieldCondition(
                        key="metadata.document_id",
                        match=MatchValue(
                            value=document_id
                        )
                    )
                ]
            ),
            wait=True,
        )

    except Exception as error:
        print(
            "Qdrant delete error:",
            repr(error)
        )

        raise HTTPException(
            status_code=500,
            detail=(
                "Unable to delete document vectors "
                "right now."
            )
        )

    db.documents.delete_one({
        "document_id": document_id,
        "firebase_uid": firebase_uid,
    })

    file_path = document.get("file_path")

    if file_path and os.path.exists(file_path):
        os.remove(file_path)

    # Delete only this user's chat history.
    db.document_chats.delete_many({
        "document_id": document_id,
        "firebase_uid": firebase_uid,
    })

    # Delete only this user's risk history.
    db.risk_analyses.delete_many({
        "document_id": document_id,
        "firebase_uid": firebase_uid,
    })

    return {
        "document_id": document_id,
        "message": (
            "Document, Qdrant vectors, "
            "chat history and risk history "
            "deleted successfully"
        )
    }