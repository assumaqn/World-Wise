import { NavLink } from "react-router-dom";
import style from "./PageNav.module.css";
import { ReorderThreeOutline, CloseOutline } from "react-ionicons";
import Logo from "./Logo.jsx";
import { useState } from "react";

function PageNav() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const toggleNav = () => setIsNavOpen(!isNavOpen);

  return (
    <nav className={style.nav}>
      <Logo />

      {/* Mobile Icon */}
      <div className={style.mobileIcon} onClick={toggleNav}>
        {!isNavOpen ? (
          <ReorderThreeOutline color="#fffe" height="30px" width="30px" />
        ) : (
          <CloseOutline color="#fffe" height="30px" width="30px" />
        )}
      </div>

      {/* Navigation Links */}
      <ul className={`${style.navLinks} ${isNavOpen ? style.showMenu : ""}`}>
        <li>
          <NavLink to="/Pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/Product">Product</NavLink>
        </li>
        <li>
          <NavLink to="/Login">Login</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
