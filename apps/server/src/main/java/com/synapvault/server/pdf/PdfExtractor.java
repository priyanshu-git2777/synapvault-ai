package com.synapvault.server.pdf;

import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;

@Component
public class PdfExtractor {

    public List<PdfPage> extract(
        Path pdfPath
    ) {
        File pdfFile =
            pdfPath.toFile();

        if (!pdfFile.exists()) {
            throw new PdfExtractionException(
                "PDF file does not exist: "
                    + pdfPath
            );
        }

        try (
            PDDocument document =
                Loader.loadPDF(pdfFile)
        ) {
            if (document.isEncrypted()) {
                throw new PdfExtractionException(
                    "Encrypted PDFs are not supported yet."
                );
            }

            int numberOfPages =
                document.getNumberOfPages();

            List<PdfPage> pages =
                new ArrayList<>(
                    numberOfPages
                );

            PDFTextStripper stripper =
                new PDFTextStripper();

            stripper.setSortByPosition(true);

            for (
                int pageNumber = 1;
                pageNumber <= numberOfPages;
                pageNumber++
            ) {
                stripper.setStartPage(
                    pageNumber
                );

                stripper.setEndPage(
                    pageNumber
                );

                String extractedText =
                    stripper.getText(
                        document
                    );

                String cleanedText =
                    cleanText(
                        extractedText
                    );

                pages.add(
                    new PdfPage(
                        pageNumber,
                        cleanedText,
                        countWords(
                            cleanedText
                        ),
                        cleanedText.length()
                    )
                );
            }

            return pages;

        } catch (IOException exception) {
            throw new PdfExtractionException(
                "Unable to extract text from the PDF.",
                exception
            );
        }
    }

    private String cleanText(
        String text
    ) {
        if (text == null) {
            return "";
        }

        return text
            .replace("\u0000", "")
            .replaceAll(
                "[\\t\\x0B\\f\\r]+",
                " "
            )
            .replaceAll(
                " +",
                " "
            )
            .replaceAll(
                "\\n{3,}",
                "\n\n"
            )
            .trim();
    }

    private int countWords(
        String text
    ) {
        if (
            text == null ||
            text.isBlank()
        ) {
            return 0;
        }

        return text
            .trim()
            .split("\\s+")
            .length;
    }
}