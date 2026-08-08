package com.synapvault.server.page;

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
    name = "document_pages",
    indexes = {
        @Index(
            name = "idx_document_pages_document",
            columnList = "document_id"
        ),
        @Index(
            name = "idx_document_pages_number",
            columnList = "document_id,page_number"
        )
    },
    uniqueConstraints = {
        @UniqueConstraint(
            name = "uk_document_page",
            columnNames = {
                "document_id",
                "page_number"
            }
        )
    }
)
public class Page {

    @Id
    @GeneratedValue(
        strategy = GenerationType.IDENTITY
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
        name = "text_content",
        nullable = false,
        columnDefinition = "TEXT"
    )
    private String textContent;

    @Column(
        name = "word_count",
        nullable = false
    )
    private int wordCount;

    @Column(
        name = "character_count",
        nullable = false
    )
    private int characterCount;

    @Column(
        name = "created_at",
        nullable = false
    )
    private Instant createdAt;

    public Page() {
    }

    public Long getId() {
        return id;
    }

    public Document getDocument() {
        return document;
    }

    public void setDocument(Document document) {
        this.document = document;
    }

    public int getPageNumber() {
        return pageNumber;
    }

    public void setPageNumber(int pageNumber) {
        this.pageNumber = pageNumber;
    }

    public String getTextContent() {
        return textContent;
    }

    public void setTextContent(String textContent) {
        this.textContent = textContent;
    }

    public int getWordCount() {
        return wordCount;
    }

    public void setWordCount(int wordCount) {
        this.wordCount = wordCount;
    }

    public int getCharacterCount() {
        return characterCount;
    }

    public void setCharacterCount(int characterCount) {
        this.characterCount = characterCount;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }
}
