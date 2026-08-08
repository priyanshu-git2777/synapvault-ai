package com.synapvault.server.search;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(
    "/api/v1/documents/{documentId}/search"
)
public class DocumentSearchController {

    private final DocumentSearchService documentSearchService;

    public DocumentSearchController(
        DocumentSearchService documentSearchService
    ) {
        this.documentSearchService =
            documentSearchService;
    }

    @GetMapping
    public DocumentSearchResponse search(
        @PathVariable Long documentId,
        @RequestParam("q") String query,
        Authentication authentication
    ) {
        return documentSearchService.search(
            documentId,
            query,
            authentication.getName()
        );
    }
}
