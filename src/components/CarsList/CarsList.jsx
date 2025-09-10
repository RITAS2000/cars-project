import Container from "../Container/Container.jsx";
import CarCard from "../CarCard/CarCard.jsx";
import css from "./CarsList.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchCarsPage } from "../../redux/cars/operations.js";
import {
  selectIsLoadingInitial,
  selectIsLoadingMore,
} from "../../redux/cars/selectors.js";
import { ScaleLoader } from "react-spinners";
import { useEffect } from "react";

export default function CarsList({ cars, page, totalPages }) {
  const dispatch = useDispatch();
  const isLoadingInitial = useSelector(selectIsLoadingInitial);
  const isLoadingMore = useSelector(selectIsLoadingMore);

  useEffect(() => {
    if (!isLoadingMore && page > 1) {
      requestAnimationFrame(() => {
        const items = document.querySelectorAll(`.${css.item}`);
        if (items.length > 0) {
          const lastItem = items[items.length - 1];
          const cardHeight = lastItem.offsetHeight;
          const lastItemOffsetTop = lastItem.offsetTop;

          window.scrollTo({
            top: lastItemOffsetTop - cardHeight * 2,
            behavior: "smooth",
          });
        }
      });
    }
  }, [cars, isLoadingMore, page]);

  return (
    <Container>
      <div className={css.container}>
        {isLoadingInitial ? (
          <div className={css.loaderWrapper}>
            <ScaleLoader
              color="#3470ff"
              height={50}
              width={7}
              radius={2}
              margin={2}
            />
            <ScaleLoader
              color="#3470ff"
              height={50}
              width={7}
              radius={2}
              margin={2}
            />
          </div>
        ) : cars.length === 0 ? (
          <p className={css.noCars}>No cars found for your search</p>
        ) : (
          <ul className={css.containerUl}>
            {cars.map((car) => (
              <li key={car.id} className={css.item}>
                <CarCard car={car} />
              </li>
            ))}
          </ul>
        )}
        <div className={css.buttonContainer}>
          {page < totalPages && (
            <button
              className={css.button}
              onClick={() => dispatch(fetchCarsPage(Number(page) + 1))}
            >
              {isLoadingMore ? (
                <ScaleLoader
                  color="#3470ff"
                  height={15}
                  width={3}
                  radius={2}
                  margin={2}
                />
              ) : (
                "Load More"
              )}
            </button>
          )}
        </div>
      </div>
    </Container>
  );
}
