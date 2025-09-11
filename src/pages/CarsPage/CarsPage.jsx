import { useDispatch, useSelector } from "react-redux";
import CarsList from "../../components/CarsList/CarsList.jsx";
import SearchBox from "../../components/SearchBox/SearchBox.jsx";
import { fetchBrands } from "../../redux/brands/operations.js";
import { fetchCars } from "../../redux/cars/operations.js";
import { useEffect } from "react";
import { selectBrands } from "../../redux/brands/selectors.js";
import { selectCars } from "../../redux/cars/selectors.js";

import { clearCars } from "../../redux/cars/slice.js";
import { setFilters } from "../../redux/filters/slice.js";

export default function CarsPage() {
  const brands = useSelector(selectBrands);
  const cars = useSelector(selectCars);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBrands());
    dispatch(setFilters({}));
    dispatch(clearCars());
    dispatch(fetchCars({ page: 1, filters: {}, limit: 12 }));
  }, [dispatch]);

  const priceOptions = [30, 40, 50, 60, 70, 80].map((price) => ({
    value: price,
    label: `${price}`,
  }));

  return (
    <div>
      <SearchBox brands={brands} priceOptions={priceOptions} />
      <CarsList cars={cars.cars} />
    </div>
  );
}
