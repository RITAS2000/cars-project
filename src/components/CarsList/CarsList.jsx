import Container from "../Container/Container.jsx";
import CarCard from "../CarCard/CarCard.jsx";
import css from "./CarsList.module.css";
import { useDispatch } from "react-redux";
import { fetchCarsPage } from "../../redux/cars/operations.js";

export default function CarsList({ cars, page, totalPages }) {
  const dispatch = useDispatch();

  if (!cars.length) return <div>No cars found</div>;
  return (
    <Container>
      <div className={css.container}>
        <ul className={css.containerUl}>
          {cars.map((car) => (
            <li key={car.id} className={css.item}>
              <CarCard car={car} />
            </li>
          ))}
        </ul>
        {page < totalPages && (
          <button
            className={css.button}
            onClick={() => dispatch(fetchCarsPage(Number(page) + 1))}
          >
            Load more
          </button>
        )}
      </div>
    </Container>
  );
}
