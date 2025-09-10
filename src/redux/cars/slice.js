import { createSlice } from "@reduxjs/toolkit";
import { fetchCars, fetchCarsPage } from "./operations";

const carsSlice = createSlice({
  name: "cars",
  initialState: {
    cars: [],
    totalCars: 0,
    page: 1,
    totalPages: 0,
    isLoading: false,
    error: null,
  },
  reducers: {
    addCarsPage: (state, action) => {
      state.cars = [...state.cars, ...action.payload.cars]; // додаємо нові
      state.totalCars = action.payload.totalCars;
      state.totalPages = action.payload.totalPages;
      state.page = action.payload.page;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cars = action.payload.cars;
        state.totalCars = action.payload.totalCars;
        state.totalPages = action.payload.totalPages;
        state.page = action.payload.page;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchCarsPage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCarsPage.fulfilled, (state, action) => {
        state.cars = [...state.cars, ...action.payload.cars];
        state.page = Number(action.payload.page);
        state.totalPages = action.payload.totalPages;
        state.totalCars = action.payload.totalCars;
        state.isLoading = false;
      })
      .addCase(fetchCarsPage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { addCarsPage } = carsSlice.actions;
export default carsSlice.reducer;
