from langchain_core.tools import tool
from langchain_qdrant import QdrantVectorStore
from qdrant_client.models import Filter, FieldCondition, MatchValue

from app.config.settings import settings
from app.config.qdrant import client, COLLECTION_NAME
from langchain_google_genai import GoogleGenerativeAIEmbeddings


# ============================================================
# Gemini Embeddings
# ============================================================

embeddings = GoogleGenerativeAIEmbeddings(
    model="gemini-embedding-001",
    google_api_key=settings.GEMINI_API_KEY,
)


# ============================================================
# Qdrant Vector Store
# ============================================================

vector_store = QdrantVectorStore(
    client=client,
    collection_name=COLLECTION_NAME,
    embedding=embeddings,
)


# ============================================================
# Risk Retrieval Queries
# ============================================================

RISK_QUERIES = [
    "termination conditions and notice period",
    "limitation of liability",
    "indemnification obligations",
    "warranties and guarantees",
    "confidentiality obligations",
    "data privacy and security obligations",
    "intellectual property ownership",
    "arbitration and dispute resolution",
    "suspension conditions",
]


# ============================================================
# Search Risky / Important Clauses
# ============================================================

def search_risky_clauses_for_document(document_id: str) -> str:
    """
    Search potentially important legal clauses from one document.

    This function performs only vector search.
    It does NOT call Gemini.
    """

    if not document_id:
        return "Document ID is required for risk analysis."

    found_documents = {}

    for query in RISK_QUERIES:

        documents = vector_store.similarity_search(
            query,
            k=2,
            filter=Filter(
                must=[
                    FieldCondition(
                        key="metadata.document_id",
                        match=MatchValue(
                            value=document_id
                        )
                    )
                ]
            )
        )

        for document in documents:

            chunk_index = document.metadata.get("chunk_index")

            if chunk_index not in found_documents:
                found_documents[chunk_index] = document

    if not found_documents:
        return "No potentially relevant clauses were found."

    results = []

    for chunk_index, document in sorted(
        found_documents.items()
    ):
        results.append(
            f"CLAUSE CHUNK {chunk_index}\n"
            f"{document.page_content}"
        )

    return "\n\n====================\n\n".join(results)