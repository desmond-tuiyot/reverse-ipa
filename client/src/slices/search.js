import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as api from "../api/index";

export const fetchResults = createAsyncThunk(
  "search/fetchResults",
  async ({ term, type, position }) => {
    const response = await api.fetchResults(term, type, position);
    return response.data;
  }
);

const initialState = {
  status: "idle",
  error: "" || null,
  searchTerm: "",
  searchResults: [],
  loadedCount: 0,
  filters: {
    searchType: "toWord",
    language: "en_us",
    position: "anywhere",
    sortBy: "relevance",
  },
};

export const slice = createSlice({
  name: "search",
  initialState,
  reducers: {
    updateSearchBar: (state, action) => {
      state.searchTerm = action.payload;
      state.status = "idle";
    },

    setFilters: (state, action) => {
      let { filter, value } = action.payload;
      state.filters[filter] = value;
    },

    setLoadedCount: (state, action) => {
      state.loadedCount = action.payload;
    },
  },
  extraReducers: {
    // fetchResults
    [fetchResults.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchResults.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.searchResults = action.payload;
    },
    [fetchResults.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export const { updateSearchBar, setFilters, setLoadedCount } = slice.actions;

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

export default slice.reducer;
