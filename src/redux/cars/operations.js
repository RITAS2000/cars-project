import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://car-rental-api.goit.global";

export const fetchCars = createAsyncThunk(
  "cars/fetchAll",
  async (filters = {}, thunkAPI) => {
    try {
      const params = {};
      if (filters.brand) params.brand = filters.brand;
      if (filters.price != null) params.rentalPrice = filters.price;
      if (filters.minMileage != null) params.minMileage = filters.minMileage;
      if (filters.maxMileage != null) params.maxMileage = filters.maxMileage;

      const res = await axios.get("/cars", { params });
      console.log("Response cars:", res.data);
      return {
        cars: res.data.cars,
        totalCars: res.data.totalCars,
        page: res.data.page,
        totalPages: res.data.totalPages,
      };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const fetchCarsPage = createAsyncThunk(
  "cars/fetchPage",
  async (page = 1, thunkAPI) => {
    try {
      const res = await axios.get("/cars", { params: { page } });
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
