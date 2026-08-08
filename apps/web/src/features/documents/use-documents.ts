"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  deleteDocument,
  getDocuments,
  uploadDocument,
} from "./document.service";

import type {
  DocumentItem,
} from "./document.types";

export function useDocuments() {
  const [documents, setDocuments] =
    useState<DocumentItem[]>([]);

  const [isLoading, setIsLoading] =
    useState(true);

  const [isUploading, setIsUploading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const loadDocuments =
    useCallback(
      async (
        showLoading = false,
      ) => {
        if (showLoading) {
          setIsLoading(true);
        }

        try {
          setError(null);

          const result =
            await getDocuments();

          setDocuments(result);
        } catch (loadError) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Unable to load documents.",
          );
        } finally {
          if (showLoading) {
            setIsLoading(false);
          }
        }
      },
      [],
    );

  useEffect(() => {
    void loadDocuments(true);
  }, [loadDocuments]);

  useEffect(() => {
    const hasProcessingDocuments =
      documents.some(
        (document) =>
          document.status ===
            "UPLOADED" ||
          document.status ===
            "PROCESSING",
      );

    if (!hasProcessingDocuments) {
      return;
    }

    const interval =
      window.setInterval(() => {
        void loadDocuments(false);
      }, 2000);

    return () => {
      window.clearInterval(
        interval,
      );
    };
  }, [documents, loadDocuments]);

  async function upload(
    file: File,
  ): Promise<DocumentItem | null> {
    try {
      setError(null);
      setIsUploading(true);

      const uploaded =
        await uploadDocument(file);

      setDocuments((current) => [
        uploaded,
        ...current,
      ]);

      return uploaded;
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Unable to upload the PDF.",
      );

      return null;
    } finally {
      setIsUploading(false);
    }
  }

  async function remove(
    documentId: number,
  ): Promise<boolean> {
    try {
      setError(null);

      await deleteDocument(
        documentId,
      );

      setDocuments((current) =>
        current.filter(
          (document) =>
            document.id !==
            documentId,
        ),
      );

      return true;
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "Unable to delete the document.",
      );

      return false;
    }
  }

  return {
    documents,
    isLoading,
    isUploading,
    error,
    upload,
    remove,
    refresh: () =>
      loadDocuments(false),
  };
}