package com.synapvault.server.search;

import java.util.List;

public record DocumentSearchResponse(
    Long documentId,
    String documentName,
    String query,
    int totalMatches,
    int matchingPages,
    List<SearchMatchResponse> results
) {
}
