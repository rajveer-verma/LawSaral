from pymongo import MongoClient
from app.config.settings import settings

client = MongoClient(settings.MONGODB_URI)

db = client[settings.MONGODB_DB_NAME]


def check_database_connection():
    client.admin.command("ping")
    return True
