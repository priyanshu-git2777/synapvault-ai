package com.synapvault.server.storage;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.Locale;
import java.util.UUID;

@Service
public class LocalFileStorageService
    implements FileStorageService {

    private static final long MAX_FILE_SIZE =
        10L * 1024L * 1024L;

    private final Path uploadDirectory;

    public LocalFileStorageService(
        @Value("${app.storage.upload-dir:uploads}")
        String uploadDirectory
    ) {
        this.uploadDirectory = Path
            .of(uploadDirectory)
            .toAbsolutePath()
            .normalize();
    }

    @PostConstruct
    public void initialize() {
        try {
            Files.createDirectories(uploadDirectory);
        } catch (IOException exception) {
            throw new StorageException(
                "Unable to create the upload directory.",
                exception
            );
        }
    }

    @Override
    public StoredFile store(MultipartFile file) {
        validate(file);

        String storedName =
            UUID.randomUUID() + ".pdf";

        Path target =
            uploadDirectory.resolve(storedName);

        try {
            Files.copy(
                file.getInputStream(),
                target,
                StandardCopyOption.REPLACE_EXISTING
            );

            return new StoredFile(
                storedName,
                target.toString()
            );
        } catch (IOException exception) {
            throw new StorageException(
                "Unable to save the uploaded PDF.",
                exception
            );
        }
    }

    @Override
    public void delete(String storedName) {
        try {
            Files.deleteIfExists(resolve(storedName));
        } catch (IOException exception) {
            throw new StorageException(
                "Unable to delete the stored PDF.",
                exception
            );
        }
    }

    @Override
    public Path resolve(String storedName) {
        Path resolved =
            uploadDirectory
                .resolve(storedName)
                .normalize();

        if (!resolved.startsWith(uploadDirectory)) {
            throw new StorageException(
                "Invalid storage path."
            );
        }

        return resolved;
    }

    private void validate(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new StorageException(
                "Please select a PDF file."
            );
        }

        if (file.getSize() > MAX_FILE_SIZE) {
            throw new StorageException(
                "PDF size cannot exceed 10 MB."
            );
        }

        String originalName =
            file.getOriginalFilename();

        if (
            originalName == null ||
            originalName.isBlank()
        ) {
            throw new StorageException(
                "The uploaded file must have a name."
            );
        }

        if (
            !originalName
                .toLowerCase(Locale.ROOT)
                .endsWith(".pdf")
        ) {
            throw new StorageException(
                "Only PDF files are supported right now."
            );
        }

        String contentType = file.getContentType();

        if (
            contentType != null &&
            !contentType.equalsIgnoreCase(
                "application/pdf"
            )
        ) {
            throw new StorageException(
                "The selected file is not a valid PDF."
            );
        }
    }
}