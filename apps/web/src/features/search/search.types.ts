export type SearchMatch = {
  pageId: number;
  pageNumber: number;
  matchCount: number;
  snippet: string;
};

export type DocumentSearchResponse = {
  documentId: number;
  documentName: string;
  query: string;
  totalMatches: number;
  matchingPages: number;
  results: SearchMatch[];
};