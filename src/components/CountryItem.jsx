import styles from "./CountryItem.module.css";
import PropTypes from "prop-types";
import { FlagIcon } from "react-flag-kit";
function CountryItem({ country }) {
  CountryItem.propTypes = {
    country: PropTypes.object.isRequired,
  };
  return (
    <li className={styles.countryItem}>
      <span>{<FlagIcon code={country.emoji} />}</span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
