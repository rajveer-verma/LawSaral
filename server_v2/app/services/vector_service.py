from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_qdrant import QdrantVectorStore
from qdrant_client.models import Filter, FieldCondition, MatchValue

from app.config.settings import settings
from app.config.qdrant import client, COLLECTION_NAME


embeddings = GoogleGenerativeAIEmbeddings(
    model="gemini-embedding-001",
    google_api_key=settings.GEMINI_API_KEY,
)


vector_store = QdrantVectorStore(
    client=client,
    collection_name=COLLECTION_NAME,
    embedding=embeddings,
)


def add_chunks(
    chunks: list[str],
    document_id: str,
    filename: str,
):
    metadatas = [
        {
            "document_id": document_id,
            "filename": filename,
            "chunk_index": index,
        }
        for index in range(len(chunks))
    ]

    vector_store.add_texts(
        texts=chunks,
        metadatas=metadatas,
    )

    return True


def search_similar(
    query: str,
    document_id: str,
    k: int = 3,
):
    return vector_store.similarity_search(
        query,
        k=k,
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