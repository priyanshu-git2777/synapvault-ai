package com.synapvault.server.document;

import com.synapvault.server.storage.FileStorageService;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.util.List;

@Service
public class DocumentService {

    private final DocumentRepository documentRepository;
    private final FileStorageService fileStorageService;

    public DocumentService(
        DocumentRepository documentRepository,
        FileStorageService fileStorageService
    ) {
        this.documentRepository =
            documentRepository;

        this.fileStorageService =
            fileStorageService;
    }

    @Transactional
    public DocumentResponse upload(
        MultipartFile file,
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

        FileStorageService.StoredFile storedFile =
            fileStorageService.store(file);

        try {
            Instant now = Instant.now();

            Document document = new Document();

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

            document.setFileSize(file.getSize());

            document.setStoragePath(
                storedFile.storagePath()
            );

            document.setStatus(
                DocumentStatus.UPLOADED
            );

            document.setPageCount(null);

            document.setOwnerEmail(
                ownerEmail.toLowerCase()
            );

            document.setCreatedAt(now);
            document.setUpdatedAt(now);

            Document saved =
                documentRepository.save(document);

            return DocumentMapper.toResponse(saved);

        } catch (RuntimeException exception) {
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
        return documentRepository
            .findAllByOwnerEmailOrderByCreatedAtDesc(
                ownerEmail.toLowerCase()
            )
            .stream()
            .map(DocumentMapper::toResponse)
            .toList();
    }

    @Transactional(readOnly = true)
    public DocumentResponse findOne(
        Long documentId,
        String ownerEmail
    ) {
        Document document =
            findOwnedDocument(
                documentId,
                ownerEmail
            );

        return DocumentMapper.toResponse(
            document
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

        fileStorageService.delete(
            document.getStoredName()
        );

        documentRepository.delete(document);
    }

    @Transactional(readOnly = true)
    public long count(String ownerEmail) {
        return documentRepository
            .countByOwnerEmail(
                ownerEmail.toLowerCase()
            );
    }

    private Document findOwnedDocument(
        Long documentId,
        String ownerEmail
    ) {
        return documentRepository
            .findByIdAndOwnerEmail(
                documentId,
                ownerEmail.toLowerCase()
            )
            .orElseThrow(
                () -> new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Document was not found."
                )
            );
    }

    private String sanitizeOriginalName(
        String originalName
    ) {
        if (originalName == null) {
            return "document.pdf";
        }

        String sanitized =
            PathSafeFilename.sanitize(
                originalName
            );

        if (sanitized.isBlank()) {
            return "document.pdf";
        }

        return sanitized;
    }

    private static final class PathSafeFilename {

        private PathSafeFilename() {
        }

        private static String sanitize(
            String filename
        ) {
            String normalized =
                filename.replace("\\", "/");

            int lastSlash =
                normalized.lastIndexOf('/');

            if (lastSlash >= 0) {
                normalized =
                    normalized.substring(
                        lastSlash + 1
                    );
            }

            return normalized
                .replace("\0", "")
                .trim();
        }
    }
}