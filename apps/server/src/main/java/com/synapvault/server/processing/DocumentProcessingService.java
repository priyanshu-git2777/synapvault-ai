package com.synapvault.server.processing;

import com.synapvault.server.chunk.DocumentChunkService;
import com.synapvault.server.document.Document;
import com.synapvault.server.document.DocumentRepository;
import com.synapvault.server.document.DocumentStatus;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;

@Service
public class DocumentProcessingService {

    private final DocumentRepository
        documentRepository;

    private final DocumentProcessor
        documentProcessor;

    private final DocumentChunkService
        documentChunkService;

    public DocumentProcessingService(
        DocumentRepository documentRepository,
        DocumentProcessor documentProcessor,
        DocumentChunkService
            documentChunkService
    ) {
        this.documentRepository =
            documentRepository;

        this.documentProcessor =
            documentProcessor;

        this.documentChunkService =
            documentChunkService;
    }

    @Transactional
    public void processDocument(
        Long documentId
    ) {
        Document document =
            documentRepository
                .findById(documentId)
                .orElseThrow(
                    () ->
                        new IllegalStateException(
                            "Document not found: "
                                + documentId
                        )
                );

        try {
            document.setStatus(
                DocumentStatus.PROCESSING
            );

            document.setUpdatedAt(
                Instant.now()
            );

            documentRepository.save(
                document
            );

            int pageCount =
                documentProcessor
                    .process(document);

            document.setPageCount(
                pageCount
            );

            documentChunkService
                .rebuildChunks(
                    document
                );

            document.setStatus(
                DocumentStatus.READY
            );

            document.setUpdatedAt(
                Instant.now()
            );

            documentRepository.save(
                document
            );

        } catch (RuntimeException exception) {
            document.setStatus(
                DocumentStatus.FAILED
            );

            document.setUpdatedAt(
                Instant.now()
            );

            documentRepository.save(
                document
            );

            throw exception;
        }
    }
}