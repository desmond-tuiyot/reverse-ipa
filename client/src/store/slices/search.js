import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as api from "../../api";
import * as selectors from "../selectors";
import filterOptions from "../../constants/filter-options";

export const fetchResults = createAsyncThunk(
  "search/fetchResults",
  async (_, { getState }) => {
    const state = getState();
    const term = selectors.selectSearchTerm(state);
    const type = selectors.selectSearchType(state);
    const position = selectors.selectPosition(state);
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

    setFilter: (state, action) => {
      let { filter, value } = action.payload;

      console.log(filterOptions[filter].map((options) => options.name));

      state.filters[filter] = value;
    },

    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
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
  setFilter,
  setFilters,
  setLoadedCount,
  resetState,
} = slice.actions;

export default slice.reducer;
