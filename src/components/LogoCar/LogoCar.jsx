import { Link } from "react-router-dom";
import logo from "../../image/Logo.png";
import css from "./LogoCar.module.css";

export default function LogoCar() {
  return (
    <Link className={css.container} to="/">
      <img src={logo} alt="Logo" width="106" height="16" />
    </Link>
  );
}
