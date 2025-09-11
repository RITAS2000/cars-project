import { createSlice } from "@reduxjs/toolkit";
import { fetchCars, fetchCarsPage } from "./operations";

const carsSlice = createSlice({
  name: "cars",
  initialState: {
    cars: [],
    totalCars: 0,
    page: 1,
    totalPages: 0,
    isLoadingInitial: true,
    isLoadingMore: false,
    error: null,
  },
  reducers: {
    addCarsPage: (state, action) => {
      state.cars = [...state.cars, ...action.payload.cars]; // додаємо нові
      state.totalCars = action.payload.totalCars;
      state.page = Number(action.payload.page);
      state.totalPages = Number(action.payload.totalPages);
    },
    setLoadingInitial: (state, action) => {
      state.isLoadingInitial = action.payload;
    },
    setLoadingMore: (state, action) => {
      state.isLoadingMore = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state, action) => {
        const page = action.meta.arg?.page || 1; // дефолт 1, якщо не передано

        if (page === 1) {
          state.isLoadingInitial = true;
          state.cars = []; // новий пошук
        } else {
          state.isLoadingMore = true;
        }
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.isLoadingInitial = false;
        state.cars = action.payload.cars;
        state.totalCars = action.payload.totalCars;
        state.page = Number(action.payload.page);
        state.totalPages = Number(action.payload.totalPages);
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.isLoadingInitial = false;
        state.error = action.payload;
      })
      .addCase(fetchCarsPage.pending, (state) => {
        state.isLoadingMore = true;
      })
      .addCase(fetchCarsPage.fulfilled, (state, action) => {
        state.cars = [...state.cars, ...action.payload.cars];
        state.page = Number(action.payload.page);
        state.totalPages = Number(action.payload.totalPages);
        state.totalCars = action.payload.totalCars;
        state.isLoadingMore = false;
      })
      .addCase(fetchCarsPage.rejected, (state, action) => {
        state.isLoadingMore = false;
        state.error = action.payload;
      });
  },
});

export const { addCarsPage, setLoadingInitial, setLoadingMore } =
  carsSlice.actions;
export default carsSlice.reducer;
