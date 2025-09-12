import { useNavigate } from "react-router-dom";
import css from "./CarCard.module.css";
// import { useEffect, useState } from "react";
import { IoHeartSharp, IoHeartOutline } from "react-icons/io5";
import { selectFavoritos } from "../../redux/favorites/selectors.js";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../../redux/favorites/slice.js";

export default function CarCard({ car }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavoritos);

  const isFavorite = favorites.some((fav) => fav.id === car.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(car));
    } else {
      dispatch(addFavorite(car));
    }
  };

  const [city, country] = car.address.split(",").slice(-2);
  const line1 = `${city} | ${country} | ${car.rentalCompany} |`;
  const type =
    car.type.charAt(0).toUpperCase() + car.type.slice(1).toLowerCase();
  const mileage = car.mileage.toLocaleString("uk-UA");
  const line2 = `${type} | ${mileage} km`;
  return (
    <div className={css.container}>
      <div className={css.textContainer}>
        <button className={css.heart} onClick={toggleFavorite}>
          {isFavorite ? <IoHeartSharp /> : <IoHeartOutline />}
        </button>
        <img className={css.img} src={car.img} alt={car.brand} />
        <div>
          <div className={css.priceContainer}>
            <h3 className={css.title}>
              {car.brand} <span className={css.span}>{car.model}</span>,{" "}
              {car.year}
            </h3>
            <p className={css.price}>${car.rentalPrice}</p>
          </div>
          <div>
            <p className={`${css.gray} ${css.margin}`}>{line1}</p>
            <p className={css.gray}>{line2}</p>
          </div>
        </div>
      </div>
      <button
        className={css.button}
        onClick={() => navigate(`/cars/${car.id}`)}
      >
        Read more
      </button>
    </div>
  );
}
