package com.synapvault.server.document;

public final class DocumentMapper {

    private DocumentMapper() {
    }

    public static DocumentResponse toResponse(
        Document document
    ) {
        return new DocumentResponse(
            document.getId(),
            document.getOriginalName(),
            document.getContentType(),
            document.getFileSize(),
            document.getStatus(),
            document.getPageCount(),
            document.getCreatedAt(),
            document.getUpdatedAt()
        );
    }
}