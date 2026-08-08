package com.synapvault.server.chunk;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DocumentChunkRepository
    extends JpaRepository<DocumentChunk, Long> {

    List<DocumentChunk>
        findAllByDocumentIdOrderByChunkIndexAsc(
            Long documentId
        );

    List<DocumentChunk>
        findAllByDocumentIdAndPageNumberOrderByChunkIndexAsc(
            Long documentId,
            int pageNumber
        );

    void deleteAllByDocumentId(
        Long documentId
    );

    long countByDocumentId(
        Long documentId
    );
}