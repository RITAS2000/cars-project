import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://car-rental-api.goit.global";

export const fetchCars = createAsyncThunk(
  "cars/fetchAll",
  async ({ page = 1, filters = {} } = {}, thunkAPI) => {
    try {
      const params = {};
      if (filters.brand) params.brand = filters.brand;
      if (filters.price != null) params.rentalPrice = filters.price;
      if (filters.minMileage != null) params.minMileage = filters.minMileage;
      if (filters.maxMileage != null) params.maxMileage = filters.maxMileage;

      const res = await axios.get("/cars", { params: { page, ...params } });

      return {
        cars: res.data.cars,
        totalCars: res.data.totalCars,
        page: Number(res.data.page),
        totalPages: Number(res.data.totalPages),
      };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const fetchCarsPage = createAsyncThunk(
  "cars/fetchPage",
  async ({ page, filters }, thunkAPI) => {
    try {
      const res = await axios.get("/cars", { params: { page, ...filters } });
      return {
        cars: res.data.cars,
        totalCars: res.data.totalCars,
        totalPages: res.data.totalPages,
        page: res.data.page,
      };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
