package com.synapvault.server.chunk;

import com.synapvault.server.document.Document;
import com.synapvault.server.page.Page;
import com.synapvault.server.page.PageRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Service
public class DocumentChunkService {

    private final DocumentChunkRepository chunkRepository;
    private final PageRepository pageRepository;
    private final TextChunker textChunker;

    public DocumentChunkService(
        DocumentChunkRepository chunkRepository,
        PageRepository pageRepository,
        TextChunker textChunker
    ) {
        this.chunkRepository = chunkRepository;
        this.pageRepository = pageRepository;
        this.textChunker = textChunker;
    }

    @Transactional
    public int rebuildChunks(Document document) {

        chunkRepository.deleteAllByDocumentId(
            document.getId()
        );

        List<Page> pages =
            pageRepository
                .findAllByDocumentIdOrderByPageNumberAsc(
                    document.getId()
                );

        List<DocumentChunk> chunks =
            new ArrayList<>();

        int chunkIndex = 0;

        Instant now = Instant.now();

        for (Page page : pages) {

            String text =
                page.getTextContent();

            if (
                text == null ||
                text.isBlank()
            ) {
                continue;
            }

            List<String> pageChunks =
                textChunker.chunk(text);

            for (String content : pageChunks) {

                if (
                    content == null ||
                    content.isBlank()
                ) {
                    continue;
                }

                DocumentChunk chunk =
                    new DocumentChunk();

                chunk.setDocument(document);

                chunk.setPageNumber(
                    page.getPageNumber()
                );

                chunk.setChunkIndex(
                    chunkIndex
                );

                chunk.setContent(content);

                chunk.setWordCount(
                    textChunker.countWords(
                        content
                    )
                );

                chunk.setCharacterCount(
                    content.length()
                );

                chunk.setEstimatedTokens(
                    textChunker.estimateTokens(
                        content
                    )
                );

                chunk.setCreatedAt(now);

                chunks.add(chunk);

                chunkIndex++;
            }
        }

        if (!chunks.isEmpty()) {
            chunkRepository.saveAll(
                chunks
            );
        }

        return chunks.size();
    }

    @Transactional(readOnly = true)
    public List<DocumentChunkResponse> getChunks(
        Long documentId
    ) {
        return chunkRepository
            .findAllByDocumentIdOrderByChunkIndexAsc(
                documentId
            )
            .stream()
            .map(
                chunk ->
                    new DocumentChunkResponse(
                        chunk.getId(),
                        chunk.getPageNumber(),
                        chunk.getChunkIndex(),
                        chunk.getContent(),
                        chunk.getWordCount(),
                        chunk.getCharacterCount(),
                        chunk.getEstimatedTokens()
                    )
            )
            .toList();
    }

    @Transactional(readOnly = true)
    public long countChunks(
        Long documentId
    ) {
        return chunkRepository
            .countByDocumentId(
                documentId
            );
    }
}
