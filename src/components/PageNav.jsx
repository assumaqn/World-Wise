import { NavLink } from "react-router-dom";
import style from "./PageNav.module.css";

function PageNav() {
  return (
    <nav className={style.nav}>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/Pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/Product">Product</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
