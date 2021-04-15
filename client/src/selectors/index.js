export const selectStatus = (state) => state.search.status;
export const selectSearchTerm = (state) => state.search.searchTerm;
export const selectSearchResults = (state) => {
  let type = state.search.filters.searchType;
  let results = state.search.searchResults;

  return results.map((result) => ({
    searchTerm: type === "toIpa" ? result.word : result.ipaTranscription,
    searchResults: type === "toIpa" ? result.ipaTranscriptions : result.words,
  }));
};
export const selectLoadedCount = (state) => state.search.loadedCount;

// filters
export const selectLanguage = (state) => state.search.filters.language;
export const selectPosition = (state) => state.search.filters.position;
export const selectSearchType = (state) => state.search.filters.searchType;
export const selectSortOption = (state) => state.search.filters.sortOption;
