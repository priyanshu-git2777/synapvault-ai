package com.synapvault.server.chunk;

public record DocumentChunkResponse(
    Long id,
    int pageNumber,
    int chunkIndex,
    String content,
    int wordCount,
    int characterCount,
    int estimatedTokens
) {
}