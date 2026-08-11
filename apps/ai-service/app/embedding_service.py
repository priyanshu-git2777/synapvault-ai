from sentence_transformers import SentenceTransformer


MODEL_NAME = "sentence-transformers/all-MiniLM-L6-v2"


class EmbeddingService:
    def __init__(self) -> None:
        self.model = SentenceTransformer(
            MODEL_NAME
        )

    def embed_text(
        self,
        text: str,
    ) -> list[float]:
        embedding = self.model.encode(
            text,
            normalize_embeddings=True,
        )

        return embedding.tolist()

    def embed_batch(
        self,
        texts: list[str],
    ) -> list[list[float]]:
        embeddings = self.model.encode(
            texts,
            normalize_embeddings=True,
            batch_size=32,
            show_progress_bar=False,
        )

        return embeddings.tolist()


embedding_service = EmbeddingService()