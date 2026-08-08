package com.synapvault.server.document;

import com.synapvault.server.chunk.DocumentChunkRepository;
import com.synapvault.server.page.PageRepository;
import com.synapvault.server.processing.event.DocumentUploadedEvent;
import com.synapvault.server.storage.FileStorageService;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.util.List;
import java.util.Locale;

@Service
public class DocumentService {

    private final DocumentRepository
        documentRepository;

    private final FileStorageService
        fileStorageService;

    private final ApplicationEventPublisher
        eventPublisher;

    private final PageRepository
        pageRepository;

    private final DocumentChunkRepository
        chunkRepository;

    public DocumentService(
        DocumentRepository documentRepository,
        FileStorageService fileStorageService,
        ApplicationEventPublisher
            eventPublisher,
        PageRepository pageRepository,
        DocumentChunkRepository
            chunkRepository
    ) {
        this.documentRepository =
            documentRepository;

        this.fileStorageService =
            fileStorageService;

        this.eventPublisher =
            eventPublisher;

        this.pageRepository =
            pageRepository;

        this.chunkRepository =
            chunkRepository;
    }

    @Transactional
    public DocumentResponse upload(
        MultipartFile file,
        String ownerEmail
    ) {
        validateOwnerEmail(
            ownerEmail
        );

        FileStorageService.StoredFile
            storedFile =
                fileStorageService.store(
                    file
                );

        try {
            Instant now =
                Instant.now();

            Document document =
                new Document();

            document.setOriginalName(
                sanitizeOriginalName(
                    file.getOriginalFilename()
                )
            );

            document.setStoredName(
                storedFile.storedName()
            );

            document.setContentType(
                file.getContentType() == null
                    ? "application/pdf"
                    : file.getContentType()
            );

            document.setFileSize(
                file.getSize()
            );

            document.setStoragePath(
                storedFile.storagePath()
            );

            document.setStatus(
                DocumentStatus.UPLOADED
            );

            document.setPageCount(null);

            document.setOwnerEmail(
                normalizeEmail(
                    ownerEmail
                )
            );

            document.setCreatedAt(now);
            document.setUpdatedAt(now);

            Document saved =
                documentRepository
                    .save(document);

            eventPublisher.publishEvent(
                new DocumentUploadedEvent(
                    saved.getId()
                )
            );

            return DocumentMapper
                .toResponse(saved);

        } catch (
            RuntimeException exception
        ) {
            fileStorageService.delete(
                storedFile.storedName()
            );

            throw exception;
        }
    }

    @Transactional(readOnly = true)
    public List<DocumentResponse> findAll(
        String ownerEmail
    ) {
        validateOwnerEmail(
            ownerEmail
        );

        return documentRepository
            .findAllByOwnerEmailOrderByCreatedAtDesc(
                normalizeEmail(
                    ownerEmail
                )
            )
            .stream()
            .map(
                DocumentMapper::toResponse
            )
            .toList();
    }

    @Transactional(readOnly = true)
    public DocumentResponse findOne(
        Long documentId,
        String ownerEmail
    ) {
        return DocumentMapper
            .toResponse(
                findOwnedDocument(
                    documentId,
                    ownerEmail
                )
            );
    }

    @Transactional
    public void delete(
        Long documentId,
        String ownerEmail
    ) {
        Document document =
            findOwnedDocument(
                documentId,
                ownerEmail
            );

        chunkRepository
            .deleteAllByDocumentId(
                document.getId()
            );

        pageRepository
            .deleteAllByDocumentId(
                document.getId()
            );

        fileStorageService.delete(
            document.getStoredName()
        );

        documentRepository.delete(
            document
        );
    }

    @Transactional(readOnly = true)
    public long count(
        String ownerEmail
    ) {
        validateOwnerEmail(
            ownerEmail
        );

        return documentRepository
            .countByOwnerEmail(
                normalizeEmail(
                    ownerEmail
                )
            );
    }

    private Document findOwnedDocument(
        Long documentId,
        String ownerEmail
    ) {
        validateOwnerEmail(
            ownerEmail
        );

        return documentRepository
            .findByIdAndOwnerEmail(
                documentId,
                normalizeEmail(
                    ownerEmail
                )
            )
            .orElseThrow(
                () ->
                    new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Document was not found."
                    )
            );
    }

    private void validateOwnerEmail(
        String ownerEmail
    ) {
        if (
            ownerEmail == null ||
            ownerEmail.isBlank()
        ) {
            throw new ResponseStatusException(
                HttpStatus.UNAUTHORIZED,
                "Authenticated user was not found."
            );
        }
    }

    private String normalizeEmail(
        String ownerEmail
    ) {
        return ownerEmail
            .trim()
            .toLowerCase(
                Locale.ROOT
            );
    }

    private String sanitizeOriginalName(
        String originalName
    ) {
        if (
            originalName == null ||
            originalName.isBlank()
        ) {
            return "document.pdf";
        }

        String normalized =
            originalName.replace(
                "\\",
                "/"
            );

        int lastSlash =
            normalized
                .lastIndexOf('/');

        if (lastSlash >= 0) {
            normalized =
                normalized.substring(
                    lastSlash + 1
                );
        }

        normalized =
            normalized
                .replace("\0", "")
                .trim();

        if (normalized.isBlank()) {
            return "document.pdf";
        }

        return normalized;
    }
}