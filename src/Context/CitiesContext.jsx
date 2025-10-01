import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

const CitiesContext = createContext();
const BASE_URL = "http://localhost:3000";
function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    async function FetchCities() {
      try {
        setIsLoading(true);
        const resp = await fetch(`${BASE_URL}/cities`);
        const data = await resp.json();
        setCities(data);
      } catch (err) {
        alert(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    FetchCities();
  }, []);

  async function getCities(id) {
    try {
      setIsLoading(true);
      const resp = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await resp.json();
      setCurrentCity(data);
    } catch (err) {
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        getCities,
        currentCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("useCities must be used within CitiesProvider");
  return context;
}

CitiesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { CitiesProvider, useCities };
