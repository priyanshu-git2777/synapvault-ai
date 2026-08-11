from fastapi import FastAPI
from fastapi import HTTPException

from app.embedding_service import (
    embedding_service,
)
from app.schemas import (
    BatchEmbeddingRequest,
    BatchEmbeddingResponse,
    EmbeddingRequest,
    EmbeddingResponse,
)


app = FastAPI(
    title="SynapVault AI Service",
    version="1.0.0",
)


@app.get("/health")
def health() -> dict[str, str]:
    return {
        "status": "ok",
        "service": "synapvault-ai-service",
    }


@app.post(
    "/api/v1/embeddings",
    response_model=EmbeddingResponse,
)
def create_embedding(
    request: EmbeddingRequest,
) -> EmbeddingResponse:
    try:
        embedding = (
            embedding_service.embed_text(
                request.text
            )
        )

        return EmbeddingResponse(
            dimensions=len(embedding),
            embedding=embedding,
        )

    except Exception as exception:
        raise HTTPException(
            status_code=500,
            detail="Unable to generate embedding.",
        ) from exception


@app.post(
    "/api/v1/embeddings/batch",
    response_model=BatchEmbeddingResponse,
)
def create_batch_embeddings(
    request: BatchEmbeddingRequest,
) -> BatchEmbeddingResponse:
    if not request.texts:
        raise HTTPException(
            status_code=400,
            detail="At least one text is required.",
        )

    cleaned_texts = [
        text.strip()
        for text in request.texts
        if text and text.strip()
    ]

    if not cleaned_texts:
        raise HTTPException(
            status_code=400,
            detail="No valid text was provided.",
        )

    try:
        embeddings = (
            embedding_service.embed_batch(
                cleaned_texts
            )
        )

        dimensions = (
            len(embeddings[0])
            if embeddings
            else 0
        )

        return BatchEmbeddingResponse(
            dimensions=dimensions,
            embeddings=embeddings,
        )

    except Exception as exception:
        raise HTTPException(
            status_code=500,
            detail="Unable to generate embeddings.",
        ) from exception