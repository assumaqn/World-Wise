import styles from "./CityItem.module.css";
import PropTypes from "prop-types";
import { FlagIcon } from "react-flag-kit";
import { Link } from "react-router-dom";
import { useCities } from "../Context/CitiesContext";
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
function CityItem({ city }) {
  const { currentCity, deleteCity } = useCities();

  CityItem.propTypes = {
    city: PropTypes.object.isRequired,
  };
  const { cityName, emoji, date, id, position } = city;
  function handleDeleteCity(e) {
    e.preventDefault();
    deleteCity(id);
  }
  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          currentCity.id === id ? styles["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{<FlagIcon code={emoji} />}</span>
        <span className={styles.name}>{cityName}</span>
        <time className={styles.date}>({formatDate(date)})</time>
        <button
          className={styles.deleteBtn}
          onClick={(e) => handleDeleteCity(e)}
        >
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
