import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./slices/searchSlice";
import throttle from "lodash/throttle";
import { saveState, loadState } from "./slices/localStorageUtil";

const preloadedState = loadState();

const store = configureStore({
  reducer: {
    search: searchReducer,
  },
  preloadedState,
});

store.subscribe(
  throttle(() => {
    saveState(store.getState());
  }, 1000)
);

export default store;
