import styles from "./CityItem.module.css";
import PropTypes from "prop-types";
import { FlagIcon } from "react-flag-kit";
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
function CityItem({ city }) {
  CityItem.propTypes = {
    city: PropTypes.object.isRequired,
  };
  const { cityName, emoji, date } = city;

  return (
    <li className={styles.cityItem}>
      <span className={styles.emoji}>{<FlagIcon code={emoji} />}</span>
      <span className={styles.name}>{cityName}</span>
      <time className={styles.date}>({formatDate(date)})</time>
      <button className={styles.deleteBtn}>&times;</button>
    </li>
  );
}

export default CityItem;
