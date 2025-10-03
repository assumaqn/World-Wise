import { useEffect, useState } from "react";
import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import { UseUrlPosition } from "../hooks/useUrlPossition";
import Spinner from "./Spinner";
import Message from "./Message";
import { FlagIcon } from "react-flag-kit";

function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [cityName, setCityName] = useState("");
  const [lat, lng] = UseUrlPosition();
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoadingGeo, setIsLoadingGeo] = useState(false);
  const [emoji, setEmoji] = useState("");
  const [geoPositionError, setGeoPositionError] = useState("");
  convertToEmoji(emoji);

  const BASEURL = "https://api.bigdatacloud.net/data/reverse-geocode-client";
  useEffect(() => {
    async function fetchCityData() {
      try {
        setIsLoadingGeo(true);
        setGeoPositionError("");
        const res = await fetch(`${BASEURL}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();
        if (!data.countryCode)
          throw new Error("That doesn't seem to be a city. Please try again");
        setCityName(data.city || data.locality || "");
        setCountry(data.countryName || "");

        setEmoji(data.countryCode);
      } catch (err) {
        setGeoPositionError(err.message);
      } finally {
        setIsLoadingGeo(false);
      }
    }
    fetchCityData();
  }, [lat, lng]);
  if (isLoadingGeo) return <Spinner />;
  if (geoPositionError) return <Message message={geoPositionError} />;
  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>
          <FlagIcon code={emoji} />
        </span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
