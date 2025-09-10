import { configureStore } from "@reduxjs/toolkit";
import carsReducer from "./cars/slice.js";
import brandsReducer from "./brands/slice.js";
import filtersSlice from "./filters/slice.js";

export const store = configureStore({
  reducer: {
    cars: carsReducer,
    brands: brandsReducer,
    filters: filtersSlice,
  },
});
