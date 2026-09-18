from app.services.vector_service import vector_store
from app.services.gemini_service import llm


retriever = vector_store.as_retriever(
    search_kwargs={"k": 3}
)


def answer_from_document(query: str) -> str:
    documents = retriever.invoke(query)

    context = "\n\n".join(
        document.page_content
        for document in documents
    )

    prompt = f"""
You are LawSaral, an AI legal document assistant.

Answer the user's question using ONLY the provided document context.

If the answer is not present in the context, say:
"I could not find this information in the uploaded document."

Do not invent legal facts.

Document Context:
{context}

User Question:
{query}

Answer:
"""

    response = llm.invoke(prompt)

    return response.content
