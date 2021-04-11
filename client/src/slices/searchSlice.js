import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as api from "../api/index";

export const fetchResults = createAsyncThunk(
  "search/fetchResults",
  async ({ term, type, position, skip }) => {
    const response = await api.fetchResults(term, type, position, skip);
    return response.data;
  }
);

const initialState = {
  status: "idle",
  error: "" || null,
  searchTerm: "",
  searchResults: [],
  searchType: "toWord",
  language: "en_us",
  searchTermPosition: "anywhere",
  sortOption: "relevance",
};

export const slice = createSlice({
  name: "search",
  initialState,
  reducers: {
    updateSearchBar: (state, action) => {
      state.searchTerm = action.payload;
      state.status = "idle";
    },

    resetState: (state, action) => {
      state.searchTerm = "";
      state.searchResults = [];
      state.searchType = "toWord";
      state.language = "en_us";
      state.searchTermPosition = "anywhere";
      state.sortOption = "relevance";
    },

    setSearchType: (state, action) => {
      state.searchType = action.payload;
    },

    setLanguage: (state, action) => {
      state.language = action.payload;
    },

    setPosition: (state, action) => {
      state.searchTermPosition = action.payload;
    },

    setSortOption: (state, action) => {
      state.sortOption = action.payload;
    },

    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
  },
  extraReducers: {
    // fetchResults
    [fetchResults.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchResults.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.searchResults = [...state.searchResults, ...action.payload];
    },
    [fetchResults.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export const {
  updateSearchBar,
  setSearchType,
  setPosition,
  setLanguage,
  setSortOption,
  setLoadedCount,
  setSearchResults,
  resetState,
} = slice.actions;

export const selectSearchTerm = (state) => state.search.searchTerm;
export const selectSearchResults = (state) => state.search.searchResults;
export const selectLanguage = (state) => state.search.language;
export const selectSearchTermPosition = (state) =>
  state.search.searchTermPosition;
export const selectStatus = (state) => state.search.status;
export const selectSearchType = (state) => state.search.searchType;
export const selectSortOption = (state) => state.search.sortOption;
export const selectLoadedCount = (state) => state.search.loadedCount;

export default slice.reducer;
