package com.synapvault.server.processing.event;

import com.synapvault.server.processing.DocumentProcessingService;

import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
public class DocumentUploadedListener {

    private final DocumentProcessingService
        documentProcessingService;

    public DocumentUploadedListener(
        DocumentProcessingService
            documentProcessingService
    ) {
        this.documentProcessingService =
            documentProcessingService;
    }

    @Async
    @TransactionalEventListener(
        phase =
            TransactionPhase.AFTER_COMMIT
    )
    public void handle(
        DocumentUploadedEvent event
    ) {
        try {
            documentProcessingService
                .processDocument(
                    event.documentId()
                );
        } catch (RuntimeException exception) {
            System.err.println(
                "Document processing failed for document "
                    + event.documentId()
                    + ": "
                    + exception.getMessage()
            );
        }
    }
}