package com.synapvault.server.document;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/v1/documents")
public class DocumentController {

    private final DocumentService documentService;

    public DocumentController(
        DocumentService documentService
    ) {
        this.documentService =
            documentService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public DocumentResponse upload(
        @RequestPart("file") MultipartFile file,
        Authentication authentication
    ) {
        return documentService.upload(
            file,
            authentication.getName()
        );
    }

    @GetMapping
    public List<DocumentResponse> findAll(
        Authentication authentication
    ) {
        return documentService.findAll(
            authentication.getName()
        );
    }

    @GetMapping("/{documentId}")
    public DocumentResponse findOne(
        @PathVariable Long documentId,
        Authentication authentication
    ) {
        return documentService.findOne(
            documentId,
            authentication.getName()
        );
    }

    @DeleteMapping("/{documentId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(
        @PathVariable Long documentId,
        Authentication authentication
    ) {
        documentService.delete(
            documentId,
            authentication.getName()
        );
    }

    @GetMapping("/count")
    public DocumentCountResponse count(
        Authentication authentication
    ) {
        return new DocumentCountResponse(
            documentService.count(
                authentication.getName()
            )
        );
    }

    public record DocumentCountResponse(
        long total
    ) {
    }
}