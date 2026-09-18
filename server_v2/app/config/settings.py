from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    MONGODB_URI: str
    MONGODB_DB_NAME: str = "LawSaralV2"
    GEMINI_API_KEY: str

    QDRANT_URL: str
    QDRANT_API_KEY: str

    class Config:
        env_file = ".env"
        extra = "ignore"


settings = Settings()
