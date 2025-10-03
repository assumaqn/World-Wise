import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useGeolocation } from "../hooks/UseGeoLocation";
import styles from "./Map.module.css";

import { useCities } from "../Context/CitiesContext";
import { FlagIcon } from "react-flag-kit";
import Button from "./Button";
import { UseUrlPosition } from "../hooks/useUrlPossition";
function Map() {
  const [position, setPosition] = useState([40, 0]);
  const { cities } = useCities();
  const [lat, lng] = UseUrlPosition();
  const {
    isLoading: isLoadingPosition,
    position: geoPossition,
    getPosition,
  } = useGeolocation();

  useEffect(() => {
    if (geoPossition) setPosition([geoPossition.lat, geoPossition.lng]);
  }, [geoPossition]);

  useEffect(() => {
    if (lat && lng) setPosition([lat, lng]);
  }, [lat, lng]);

  return (
    <div className={styles.mapContainer}>
      {!geoPossition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading.." : "use Your possition"}
        </Button>
      )}
      <MapContainer
        center={position}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>
                <FlagIcon code={city.emoji} size={32} />
              </span>
              <span>
                {city.city} {city.country}
              </span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={position} />
        <DetectingClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  ChangeCenter.propTypes = {
    position: PropTypes.array.isRequired,
  };
  const map = useMap();
  map.setView(position);

  return null;
}

function DetectingClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}

export default Map;
