package com.synapvault.server.chunk;

import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class TextChunker {

    private static final int MAX_WORDS = 220;
    private static final int OVERLAP_WORDS = 40;

    public List<String> chunk(
        String text
    ) {
        List<String> chunks =
            new ArrayList<>();

        if (
            text == null ||
            text.isBlank()
        ) {
            return chunks;
        }

        String normalized =
            normalize(text);

        if (normalized.isBlank()) {
            return chunks;
        }

        String[] words =
            normalized.split("\\s+");

        if (
            words.length <= MAX_WORDS
        ) {
            chunks.add(
                normalized
            );

            return chunks;
        }

        int start = 0;

        while (
            start < words.length
        ) {
            int end =
                Math.min(
                    start + MAX_WORDS,
                    words.length
                );

            StringBuilder builder =
                new StringBuilder();

            for (
                int index = start;
                index < end;
                index++
            ) {
                if (
                    builder.length() > 0
                ) {
                    builder.append(' ');
                }

                builder.append(
                    words[index]
                );
            }

            String chunk =
                builder
                    .toString()
                    .trim();

            if (!chunk.isBlank()) {
                chunks.add(chunk);
            }

            if (
                end >= words.length
            ) {
                break;
            }

            start =
                end - OVERLAP_WORDS;
        }

        return chunks;
    }

    public int countWords(
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

    public int estimateTokens(
        String text
    ) {
        if (
            text == null ||
            text.isBlank()
        ) {
            return 0;
        }

        return Math.max(
            1,
            (int) Math.ceil(
                text.length() / 4.0
            )
        );
    }

    private String normalize(
        String text
    ) {
        return text
            .replace("\u0000", "")
            .replaceAll(
                "\\s+",
                " "
            )
            .trim();
    }
}