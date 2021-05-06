import { configureStore } from "@reduxjs/toolkit";
// import throttle from "lodash/throttle";

import searchReducer from "./slices/search";
// import {
//   loadState,
//   saveState,
//   saveSearchParams,
//   loadSearchParams,
// } from "../utils";

// let preloadedState = loadSearchParams();
// console.log(preloadedState);

const store = configureStore({
  // preloadedState,
  reducer: {
    search: searchReducer,
  },
});

// store.subscribe(
//   throttle(() => {
//     saveSearchParams({
//       search: store.getState().search,
//     });
//   }, 1000)
// );

export default store;
