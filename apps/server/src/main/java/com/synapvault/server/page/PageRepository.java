package com.synapvault.server.page;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PageRepository
    extends JpaRepository<Page, Long> {

    List<Page> findAllByDocumentIdOrderByPageNumberAsc(
        Long documentId
    );

    void deleteAllByDocumentId(
        Long documentId
    );

    long countByDocumentId(
        Long documentId
    );

    @Query("""
        SELECT p
        FROM Page p
        WHERE p.document.id = :documentId
          AND LOWER(p.textContent)
              LIKE LOWER(CONCAT('%', :query, '%'))
        ORDER BY p.pageNumber ASC
        """)
    List<Page> searchDocumentPages(
        @Param("documentId") Long documentId,
        @Param("query") String query
    );
}
