import { NavLink } from "react-router-dom";
import css from "./Navigate.module.css";

export default function Navigate() {
  return (
    <nav className={css.container}>
      <NavLink
        className={({ isActive }) =>
          isActive ? `${css.link} ${css.isActive}` : css.link
        }
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? `${css.link} ${css.isActive}` : css.link
        }
        to="/catalog"
      >
        Catalog
      </NavLink>
    </nav>
  );
}
