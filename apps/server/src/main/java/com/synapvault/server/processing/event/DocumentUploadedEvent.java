package com.synapvault.server.processing.event;

public record DocumentUploadedEvent(
    Long documentId
) {
}