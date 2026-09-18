from langchain_google_genai import ChatGoogleGenerativeAI

from app.config.settings import settings


GEMINI_MODEL = "gemini-3.6-flash"


llm = ChatGoogleGenerativeAI(
    model=GEMINI_MODEL,
    google_api_key=settings.GEMINI_API_KEY,
    temperature=0.2,
)


def ask_gemini(prompt: str) -> str:
    """
    Central Gemini call.

    Keep Gemini usage centralized so model configuration
    and quota handling can be controlled from one place.
    """

    response = llm.invoke(prompt)

    return response.content