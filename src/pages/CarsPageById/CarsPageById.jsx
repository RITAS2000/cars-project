// import { BsCarFront } from "react-icons/bs";
// <BsCarFront />;
// import { BsCalendar2Week } from "react-icons/bs";
// <BsCalendar2Week />;
import {
  BsCheckCircle,
  BsCalendar2Week,
  BsCarFront,
  BsFuelPump,
  BsGear,
} from "react-icons/bs";
// <BsCheckCircle />;
// import { BsGear } from "react-icons/bs";
// <BsGear />;
// import { BsFuelPump } from "react-icons/bs";
// <BsFuelPump />;
import { IoLocationOutline } from "react-icons/io5";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Container from "../../components/Container/Container.jsx";
import css from "./CarspageById.module.css";
import Form from "../../components/Form/Form.jsx";

export default function CarsPageById() {
  const { id } = useParams();
  const [car, setCar] = useState(null);

  useEffect(() => {
    axios
      .get(`https://car-rental-api.goit.global/cars/${id}`)
      .then((res) => setCar(res.data));
  }, [id]);
  if (!car) return <div>Loading...</div>;
  const shortId = car.img.match(/\/(\d+)-ai\.jpg$/)[1];

  const [city, country] = car.address.split(",").slice(-2);
  const mileage = car.mileage.toLocaleString("uk-UA");
  const type =
    car.type.charAt(0).toUpperCase() + car.type.slice(1).toLowerCase();

  return (
    <Container>
      <div className={css.container}>
        <div className={css.divOne}>
          <img src={car.img} className={css.imgContainer} />
          <div className={css.formContainer}>
            <Form />
          </div>
        </div>
        <div className={css.divTwo}>
          <div className={css.carDescr}>
            <h4 className={css.title}>
              {car.brand} {car.model}, {car.year}
              <span className={css.gray}>Id: {shortId}</span>
            </h4>

            <div className={css.mileage}>
              <div className={css.iconLocation}>
                <IoLocationOutline />
                <p className={css.textCity}>
                  {city}, {country}
                </p>
              </div>
              <p className={css.textCity}>Mileage: {mileage} km</p>
            </div>
            <p className={css.price}>${car.rentalPrice}</p>

            <p className={css.textCity}>{car.description}</p>
          </div>
          <div className={css.carOption}>
            <section>
              <h3 className={css.rentalTitle}>Rental Conditions:</h3>
              <ul className={css.rentalContainer}>
                <li className={css.iconCheck}>
                  <BsCheckCircle />
                  <p>{car.rentalConditions[0]}</p>
                </li>
                <li className={css.iconCheck}>
                  <BsCheckCircle />
                  <p>{car.rentalConditions[2]}</p>
                </li>
                <li className={css.iconCheck}>
                  <BsCheckCircle />
                  <p>{car.rentalConditions[1]}</p>
                </li>
              </ul>
            </section>
            <section>
              <h3 className={css.rentalTitle}>Car Specifications:</h3>
              <ul className={css.rentalContainer}>
                <li className={css.iconCheck}>
                  <BsCalendar2Week />
                  <p>Year: {car.year}</p>
                </li>
                <li className={css.iconCheck}>
                  <BsCarFront />
                  <p>Type: {type}</p>
                </li>
                <li className={css.iconCheck}>
                  <BsFuelPump />
                  <p>Fuel Consumption: {car.fuelConsumption}</p>
                </li>
                <li className={css.iconCheck}>
                  <BsGear />
                  <p>Engine Size: {car.engineSize}</p>
                </li>
              </ul>
            </section>
            <section>
              <h3 className={css.rentalTitle}>
                Accessories and functionalities:
              </h3>
              <ul className={css.rentalContainer}>
                <li className={css.iconCheck}>
                  <BsCheckCircle />
                  <p>{car.accessories[0]}</p>
                </li>
                <li className={css.iconCheck}>
                  <BsCheckCircle />
                  <p>{car.accessories[1]}</p>
                </li>
                <li className={css.iconCheck}>
                  <BsCheckCircle />
                  <p>{car.functionalities[1]}</p>
                </li>
                <li className={css.iconCheck}>
                  <BsCheckCircle />
                  <p>{car.functionalities[2]}</p>
                </li>
                <li className={css.iconCheck}>
                  <BsCheckCircle />
                  <p>{car.functionalities[0]}</p>
                </li>
                <li className={css.iconCheck}>
                  <BsCheckCircle />
                  <p>{car.accessories[2]}</p>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </Container>
  );
}
