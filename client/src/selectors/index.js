export const selectStatus = (state) => state.search.status;
export const selectSearchTerm = (state) => state.search.searchTerm;
export const selectSearchResults = (state) => {
  let results = state.search.searchResults;

  return results.map((result) => {
    // does frontend know too much about the backend data?
    // is it ok for this to be dependent on the shape of the data/
    const toIpa = result.hasOwnProperty("word");
    return {
      searchTerm: toIpa ? result.word : result.ipaTranscription,
      searchResults: toIpa ? result.ipaTranscriptions : result.words,
    };
  });
};
export const selectLoadedCount = (state) => state.search.loadedCount;

// filters
export const selectLanguage = (state) => state.search.filters.language;
export const selectPosition = (state) => state.search.filters.position;
export const selectSearchType = (state) => state.search.filters.searchType;
export const selectSortOption = (state) => state.search.filters.sortOption;
