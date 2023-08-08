// First stage
/*
const { configureStore } = require("@reduxjs/toolkit");

//create store

const store = configureStore({
  reducer: {},
  middleware: () => {},
  devTools: true,
});

// Export store

export default store; 
*/

// Second  stage

// import { configureStore } from "@reduxjs/toolkit";
// import apiSlice from "./Api/ApiSlice";

// //create store

// const store = configureStore({
//   reducer: {
//     // counter : counterReducer
//     [apiSlice.reducerPath]: [apiSlice.reducer],
//   },
//   middleware: (getDefaultMiddleware) => {
//     getDefaultMiddleware().concat(apiSlice.middleware);
//   },
//   devTools: true,
// });

// export default store;

import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "./Api/ApiSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  },
  devTools: true,
});

export default store;
