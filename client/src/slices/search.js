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

    resetState: (state) => {
      state.searchTerm = "";
      state.loadedCount = 0;
      state.searchResults = [];
      state.filters = initialState.filters;
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

export const {
  updateSearchBar,
  setFilters,
  setLoadedCount,
  resetState,
} = slice.actions;

export default slice.reducer;
