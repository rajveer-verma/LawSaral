from langchain.tools import tool

from qdrant_client.models import (
    Filter,
    FieldCondition,
    MatchValue,
)

from app.services.vector_service import vector_store


@tool
def search_document(
    query: str,
    document_id: str = "",
) -> str:
    """
    Search a specific uploaded legal document for information
    relevant to the user's question.

    The document_id identifies which uploaded document should
    be searched.
    """

    if not query.strip():
        return "Search query cannot be empty."

    if not document_id:
        return "Document ID is required to search the uploaded document."

    documents = vector_store.similarity_search(
        query,
        k=5,
        filter=Filter(
            must=[
                FieldCondition(
                    key="metadata.document_id",
                    match=MatchValue(
                        value=document_id,
                    ),
                )
            ]
        ),
    )

    if not documents:
        return (
            "No relevant information was found "
            "in the uploaded document."
        )

    results = []

    for index, document in enumerate(
        documents,
        start=1,
    ):
        results.append(
            f"RESULT {index}\n"
            f"Content:\n{document.page_content}\n"
            f"Metadata:\n{document.metadata}"
        )

    return "\n\n====================\n\n".join(results)