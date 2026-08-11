from pydantic import BaseModel, Field


class EmbeddingRequest(BaseModel):
    text: str = Field(
        ...,
        min_length=1,
        max_length=20000,
    )


class EmbeddingResponse(BaseModel):
    dimensions: int
    embedding: list[float]


class BatchEmbeddingRequest(BaseModel):
    texts: list[str]


class BatchEmbeddingResponse(BaseModel):
    dimensions: int
    embeddings: list[list[float]]