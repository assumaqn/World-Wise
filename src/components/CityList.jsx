import CityItem from "./CityItem.jsx";
import styles from "./CityList.module.css";
import Spinner from "./Spinner.jsx";
import Message from "./Message.jsx";
import PropTypes from "prop-types";
function CityList({ cities, isLoading }) {
  CityList.propTypes = {
    cities: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
  };
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return <Message message="Start by adding City by Clicking the map" />;
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
