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
  const { currentCity } = useCities();

  CityItem.propTypes = {
    city: PropTypes.object.isRequired,
  };
  const { cityName, emoji, date, id, position } = city;

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          currentCity.id === id ? styles.cityItemActive : ""
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{<FlagIcon code={emoji} />}</span>
        <span className={styles.name}>{cityName}</span>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}

export default CityItem;
