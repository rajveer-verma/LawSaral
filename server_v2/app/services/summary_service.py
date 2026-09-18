from qdrant_client.models import Filter, FieldCondition, MatchValue

from app.config.qdrant import client, COLLECTION_NAME
from app.services.gemini_service import llm


def get_document_text(document_id: str) -> str:
    """
    Retrieve all indexed chunks for a document from Qdrant.
    No Gemini call is made here.
    """

    points, _ = client.scroll(
        collection_name=COLLECTION_NAME,
        scroll_filter=Filter(
            must=[
                FieldCondition(
                    key="metadata.document_id",
                    match=MatchValue(
                        value=document_id
                    ),
                )
            ]
        ),
        limit=1000,
        with_payload=True,
        with_vectors=False,
    )

    chunks = []

    for point in points:
        payload = point.payload or {}

        page_content = payload.get(
            "page_content",
            ""
        )

        metadata = payload.get(
            "metadata",
            {}
        )

        chunk_index = metadata.get(
            "chunk_index",
            0
        )

        if page_content:
            chunks.append(
                (
                    chunk_index,
                    page_content
                )
            )

    chunks.sort(
        key=lambda item: item[0]
    )

    return "\n\n".join(
        text for _, text in chunks
    )


def generate_document_summary(
    document_id: str
) -> str:

    document_text = get_document_text(
        document_id
    )

    if not document_text.strip():
        return (
            "No indexed document content was found."
        )

    prompt = f"""
You are LawSaral, an AI legal document assistant.

Create a clear and practical summary of the
uploaded legal document.

Use ONLY the document text provided below.

Do not invent facts, clauses, laws, or information.

Include:

1. Document overview
2. Main purpose of the agreement
3. Important obligations
4. Important rights
5. Key financial or payment terms, if present
6. Termination conditions
7. Liability / indemnification provisions
8. Dispute resolution
9. Important clauses the client should review

Keep the explanation simple and concise.

Document Text:
{document_text}

Return a structured summary.
"""

    # Exactly ONE Gemini call.
    response = llm.invoke(prompt)

    return response.content
