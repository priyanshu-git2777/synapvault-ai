package com.synapvault.server.document;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DocumentRepository
    extends JpaRepository<Document, Long> {

    List<Document>
        findAllByOwnerEmailOrderByCreatedAtDesc(
            String ownerEmail
        );

    Optional<Document>
        findByIdAndOwnerEmail(
            Long id,
            String ownerEmail
        );

    long countByOwnerEmail(
        String ownerEmail
    );
}