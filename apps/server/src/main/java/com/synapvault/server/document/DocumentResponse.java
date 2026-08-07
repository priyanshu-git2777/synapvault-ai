package com.synapvault.server.document;

import java.time.Instant;

public record DocumentResponse(
    Long id,
    String name,
    String contentType,
    long fileSize,
    DocumentStatus status,
    Integer pageCount,
    Instant createdAt,
    Instant updatedAt
) {
}