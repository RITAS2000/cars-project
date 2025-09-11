import { useDispatch, useSelector } from "react-redux";
import CarsList from "../../components/CarsList/CarsList.jsx";
import SearchBox from "../../components/SearchBox/SearchBox.jsx";
import { fetchBrands } from "../../redux/brands/operations.js";
import { fetchCars } from "../../redux/cars/operations.js";
import { useEffect } from "react";
import { selectBrands } from "../../redux/brands/selectors.js";
import { selectCars } from "../../redux/cars/selectors.js";
import { selectFilters } from "../../redux/filters/selectors.js";

export default function CarsPage() {
  const brands = useSelector(selectBrands);
  const cars = useSelector(selectCars);

  const filters = useSelector(selectFilters);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBrands());

    dispatch(fetchCars({ page: 1, filters: {} }));
  }, [dispatch]);

  const priceOptions = [30, 40, 50, 60, 70, 80].map((price) => ({
    value: price,
    label: `${price}`,
  }));

  const filteredCars = cars.cars.filter((car) => {
    if (filters.brand && car.brand !== filters.brand) return false;
    if (filters.price && car.rentalPrice > filters.price) return false;
    if (filters.minMileage && car.mileage < filters.minMileage) return false;
    if (filters.maxMileage && car.mileage > filters.maxMileage) return false;
    return true;
  });

  return (
    <div>
      <SearchBox brands={brands} priceOptions={priceOptions} />

      <CarsList cars={filteredCars.length ? filteredCars : cars.cars} />
    </div>
  );
}
