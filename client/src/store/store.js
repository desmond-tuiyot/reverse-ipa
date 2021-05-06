import { configureStore } from "@reduxjs/toolkit";
import throttle from "lodash/throttle";

import searchReducer from "./slices/search";
import { loadState, saveState } from "../utils";

let preloadedState = loadState();

const store = configureStore({
  // preloadedState,
  reducer: {
    search: searchReducer,
  },
});

store.subscribe(
  throttle(() => {
    saveState({
      search: store.getState().search,
    });
  }, 1000)
);

export default store;
