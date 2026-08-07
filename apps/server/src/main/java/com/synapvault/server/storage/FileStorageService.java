package com.synapvault.server.storage;

import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;

public interface FileStorageService {

    StoredFile store(MultipartFile file);

    void delete(String storedName);

    Path resolve(String storedName);

    record StoredFile(
        String storedName,
        String storagePath
    ) {
    }
}