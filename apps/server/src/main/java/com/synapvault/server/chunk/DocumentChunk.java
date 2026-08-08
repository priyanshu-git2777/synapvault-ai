package com.synapvault.server.chunk;

import com.synapvault.server.document.Document;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

import java.time.Instant;

@Entity
@Table(
    name = "document_chunks",
    indexes = {
        @Index(
            name = "idx_document_chunks_document",
            columnList = "document_id"
        ),
        @Index(
            name = "idx_document_chunks_page",
            columnList =
                "document_id,page_number"
        )
    },
    uniqueConstraints = {
        @UniqueConstraint(
            name = "uk_document_chunk_index",
            columnNames = {
                "document_id",
                "chunk_index"
            }
        )
    }
)
public class DocumentChunk {

    @Id
    @GeneratedValue(
        strategy =
            GenerationType.IDENTITY
    )
    private Long id;

    @ManyToOne(
        fetch = FetchType.LAZY,
        optional = false
    )
    @JoinColumn(
        name = "document_id",
        nullable = false
    )
    private Document document;

    @Column(
        name = "page_number",
        nullable = false
    )
    private int pageNumber;

    @Column(
        name = "chunk_index",
        nullable = false
    )
    private int chunkIndex;

    @Column(
        name = "content",
        nullable = false,
        columnDefinition = "TEXT"
    )
    private String content;

    @Column(
        name = "character_count",
        nullable = false
    )
    private int characterCount;

    @Column(
        name = "word_count",
        nullable = false
    )
    private int wordCount;

    @Column(
        name = "estimated_tokens",
        nullable = false
    )
    private int estimatedTokens;

    @Column(
        name = "created_at",
        nullable = false
    )
    private Instant createdAt;

    public DocumentChunk() {
    }

    public Long getId() {
        return id;
    }

    public Document getDocument() {
        return document;
    }

    public void setDocument(
        Document document
    ) {
        this.document =
            document;
    }

    public int getPageNumber() {
        return pageNumber;
    }

    public void setPageNumber(
        int pageNumber
    ) {
        this.pageNumber =
            pageNumber;
    }

    public int getChunkIndex() {
        return chunkIndex;
    }

    public void setChunkIndex(
        int chunkIndex
    ) {
        this.chunkIndex =
            chunkIndex;
    }

    public String getContent() {
        return content;
    }

    public void setContent(
        String content
    ) {
        this.content =
            content;
    }

    public int getCharacterCount() {
        return characterCount;
    }

    public void setCharacterCount(
        int characterCount
    ) {
        this.characterCount =
            characterCount;
    }

    public int getWordCount() {
        return wordCount;
    }

    public void setWordCount(
        int wordCount
    ) {
        this.wordCount =
            wordCount;
    }

    public int getEstimatedTokens() {
        return estimatedTokens;
    }

    public void setEstimatedTokens(
        int estimatedTokens
    ) {
        this.estimatedTokens =
            estimatedTokens;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(
        Instant createdAt
    ) {
        this.createdAt =
            createdAt;
    }
}