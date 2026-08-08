package com.synapvault.server.search;

public record SearchMatchResponse(
    Long pageId,
    int pageNumber,
    int matchCount,
    String snippet
) {
}
