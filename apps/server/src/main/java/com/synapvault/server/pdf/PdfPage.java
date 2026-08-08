package com.synapvault.server.pdf;

public record PdfPage(
    int pageNumber,
    String text,
    int wordCount,
    int characterCount
) {
}