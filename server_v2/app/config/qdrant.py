from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams
from app.config.settings import settings


client = QdrantClient(
    url=settings.QDRANT_URL,
    api_key=settings.QDRANT_API_KEY,
)

COLLECTION_NAME = "LawSaralV2"


def check_qdrant_connection():
    client.get_collections()
    return True


def create_collection():
    existing_collections = [
        collection.name
        for collection in client.get_collections().collections
    ]

    if COLLECTION_NAME not in existing_collections:
        client.create_collection(
            collection_name=COLLECTION_NAME,
            vectors_config=VectorParams(
                size=3072,
                distance=Distance.COSINE,
            ),
        )
        return "Collection created"

    return "Collection already exists"
