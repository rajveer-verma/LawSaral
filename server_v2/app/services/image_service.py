import base64
import mimetypes

from langchain_core.messages import HumanMessage

from app.services.gemini_service import llm


def extract_text_from_image(file_path: str) -> str:
    """
    Extract text from a legal document image using Gemini Vision.
    """

    mime_type, _ = mimetypes.guess_type(file_path)

    if mime_type not in [
        "image/png",
        "image/jpeg",
        "image/jpg",
    ]:
        raise ValueError("Unsupported image format")

    with open(file_path, "rb") as image_file:
        image_bytes = image_file.read()

    image_base64 = base64.b64encode(
        image_bytes
    ).decode("utf-8")

    prompt = """
You are a legal document OCR assistant.

Extract all readable text from this document image.

Rules:
- Preserve the original text as accurately as possible.
- Preserve headings, paragraphs, numbers and clause text.
- Do not summarize.
- Do not explain the document.
- Do not add information that is not visible.
- Return only the extracted text.
"""

    message = HumanMessage(
        content=[
            {
                "type": "text",
                "text": prompt,
            },
            {
                "type": "image_url",
                "image_url": {
                    "url": (
                        f"data:{mime_type};base64,"
                        f"{image_base64}"
                    )
                },
            },
        ]
    )

    response = llm.invoke([message])

    return response.content
