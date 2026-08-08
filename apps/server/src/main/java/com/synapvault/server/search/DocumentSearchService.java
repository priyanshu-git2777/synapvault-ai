package com.synapvault.server.search;

import com.synapvault.server.document.Document;
import com.synapvault.server.document.DocumentRepository;
import com.synapvault.server.document.DocumentStatus;
import com.synapvault.server.page.Page;
import com.synapvault.server.page.PageRepository;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

@Service
public class DocumentSearchService {

    private static final int SNIPPET_RADIUS = 120;

    private final DocumentRepository documentRepository;
    private final PageRepository pageRepository;

    public DocumentSearchService(
        DocumentRepository documentRepository,
        PageRepository pageRepository
    ) {
        this.documentRepository = documentRepository;
        this.pageRepository = pageRepository;
    }

    @Transactional(readOnly = true)
    public DocumentSearchResponse search(
        Long documentId,
        String rawQuery,
        String ownerEmail
    ) {
        validateQuery(rawQuery);
        validateOwnerEmail(ownerEmail);

        String normalizedEmail =
            ownerEmail
                .trim()
                .toLowerCase(Locale.ROOT);

        Document document =
            documentRepository
                .findByIdAndOwnerEmail(
                    documentId,
                    normalizedEmail
                )
                .orElseThrow(
                    () -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Document was not found."
                    )
                );

        if (document.getStatus() != DocumentStatus.READY) {
            throw new ResponseStatusException(
                HttpStatus.CONFLICT,
                "Document is not ready for search yet."
            );
        }

        String query =
            rawQuery.trim();

        List<Page> matchingPages =
            pageRepository.searchDocumentPages(
                documentId,
                query
            );

        List<SearchMatchResponse> results =
            new ArrayList<>();

        int totalMatches = 0;

        for (Page page : matchingPages) {
            String text =
                page.getTextContent();

            int matchCount =
                countOccurrences(
                    text,
                    query
                );

            if (matchCount <= 0) {
                continue;
            }

            totalMatches += matchCount;

            String snippet =
                createSnippet(
                    text,
                    query
                );

            results.add(
                new SearchMatchResponse(
                    page.getId(),
                    page.getPageNumber(),
                    matchCount,
                    snippet
                )
            );
        }

        return new DocumentSearchResponse(
            document.getId(),
            document.getOriginalName(),
            query,
            totalMatches,
            results.size(),
            results
        );
    }

    private void validateQuery(
        String query
    ) {
        if (
            query == null ||
            query.isBlank()
        ) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "Search query cannot be empty."
            );
        }

        String trimmed =
            query.trim();

        if (trimmed.length() < 2) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "Search query must contain at least 2 characters."
            );
        }

        if (trimmed.length() > 150) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "Search query cannot exceed 150 characters."
            );
        }
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

    private int countOccurrences(
        String text,
        String query
    ) {
        if (
            text == null ||
            text.isBlank()
        ) {
            return 0;
        }

        String lowerText =
            text.toLowerCase(Locale.ROOT);

        String lowerQuery =
            query.toLowerCase(Locale.ROOT);

        int count = 0;
        int index = 0;

        while (
            (
                index =
                    lowerText.indexOf(
                        lowerQuery,
                        index
                    )
            ) != -1
        ) {
            count++;

            index +=
                lowerQuery.length();
        }

        return count;
    }

    private String createSnippet(
        String text,
        String query
    ) {
        if (
            text == null ||
            text.isBlank()
        ) {
            return "";
        }

        String lowerText =
            text.toLowerCase(Locale.ROOT);

        String lowerQuery =
            query.toLowerCase(Locale.ROOT);

        int matchIndex =
            lowerText.indexOf(
                lowerQuery
            );

        if (matchIndex < 0) {
            return normalizeSnippet(
                text.substring(
                    0,
                    Math.min(
                        240,
                        text.length()
                    )
                )
            );
        }

        int start =
            Math.max(
                0,
                matchIndex - SNIPPET_RADIUS
            );

        int end =
            Math.min(
                text.length(),
                matchIndex
                    + query.length()
                    + SNIPPET_RADIUS
            );

        String snippet =
            normalizeSnippet(
                text.substring(
                    start,
                    end
                )
            );

        if (start > 0) {
            snippet = "..." + snippet;
        }

        if (end < text.length()) {
            snippet = snippet + "...";
        }

        return snippet;
    }

    private String normalizeSnippet(
        String value
    ) {
        return value
            .replaceAll("\\s+", " ")
            .trim();
    }
}
