package com.synapvault.server.processing;

import com.synapvault.server.document.Document;
import com.synapvault.server.page.Page;
import com.synapvault.server.page.PageRepository;
import com.synapvault.server.pdf.PdfExtractor;
import com.synapvault.server.pdf.PdfPage;

import org.springframework.stereotype.Component;

import java.nio.file.Path;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Component
public class DocumentProcessor {

    private final PdfExtractor pdfExtractor;
    private final PageRepository pageRepository;

    public DocumentProcessor(
        PdfExtractor pdfExtractor,
        PageRepository pageRepository
    ) {
        this.pdfExtractor =
            pdfExtractor;

        this.pageRepository =
            pageRepository;
    }

    public int process(
        Document document
    ) {
        Path pdfPath =
            Path.of(
                document.getStoragePath()
            );

        List<PdfPage> extractedPages =
            pdfExtractor.extract(
                pdfPath
            );

        pageRepository
            .deleteAllByDocumentId(
                document.getId()
            );

        List<Page> pages =
            new ArrayList<>(
                extractedPages.size()
            );

        Instant createdAt =
            Instant.now();

        for (
            PdfPage extractedPage
                : extractedPages
        ) {
            Page page =
                new Page();

            page.setDocument(
                document
            );

            page.setPageNumber(
                extractedPage
                    .pageNumber()
            );

            page.setTextContent(
                extractedPage.text()
            );

            page.setWordCount(
                extractedPage
                    .wordCount()
            );

            page.setCharacterCount(
                extractedPage
                    .characterCount()
            );

            page.setCreatedAt(
                createdAt
            );

            pages.add(page);
        }

        pageRepository.saveAll(
            pages
        );

        return pages.size();
    }
}