package com.synapvault.server.chunk;

import com.synapvault.server.document.Document;
import com.synapvault.server.document.DocumentRepository;
import com.synapvault.server.document.DocumentStatus;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Locale;

@RestController
@RequestMapping(
    "/api/v1/documents/{documentId}/chunks"
)
public class DocumentChunkController {

    private final DocumentRepository
        documentRepository;

    private final DocumentChunkService
        documentChunkService;

    public DocumentChunkController(
        DocumentRepository documentRepository,
        DocumentChunkService
            documentChunkService
    ) {
        this.documentRepository =
            documentRepository;

        this.documentChunkService =
            documentChunkService;
    }

    @GetMapping
    public List<DocumentChunkResponse>
        getChunks(
            @PathVariable Long documentId,
            Authentication authentication
        ) {
        Document document =
            findOwnedDocument(
                documentId,
                authentication.getName()
            );

        return documentChunkService
            .getChunks(
                document.getId()
            );
    }

    @PostMapping("/rebuild")
    @ResponseStatus(HttpStatus.OK)
    public ChunkRebuildResponse rebuild(
        @PathVariable Long documentId,
        Authentication authentication
    ) {
        Document document =
            findOwnedDocument(
                documentId,
                authentication.getName()
            );

        if (
            document.getStatus()
                != DocumentStatus.READY
        ) {
            throw new ResponseStatusException(
                HttpStatus.CONFLICT,
                "Document must be READY before chunks can be rebuilt."
            );
        }

        int totalChunks =
            documentChunkService
                .rebuildChunks(
                    document
                );

        return new ChunkRebuildResponse(
            document.getId(),
            totalChunks
        );
    }

    private Document findOwnedDocument(
        Long documentId,
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

        String normalized =
            ownerEmail
                .trim()
                .toLowerCase(
                    Locale.ROOT
                );

        return documentRepository
            .findByIdAndOwnerEmail(
                documentId,
                normalized
            )
            .orElseThrow(
                () ->
                    new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Document was not found."
                    )
            );
    }

    public record ChunkRebuildResponse(
        Long documentId,
        int totalChunks
    ) {
    }
}