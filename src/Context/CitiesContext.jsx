import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import PropTypes from "prop-types";

const CitiesContext = createContext();
const BASE_URL = "https://worldwise-json-server-8ese.onrender.com";

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return { ...state, cities: action.payload, isLoading: false };
    case "city/loaded":
      return { ...state, currentCity: action.payload, isLoading: false };
    case "city/created":
      return {
        ...state,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
        isLoading: false,
      };
    case "city/deleted":
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
        isLoading: false,
      };
    case "rejected":
      return { ...state, error: action.payload };
    default:
      throw new Error("unknown action");
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    async function FetchCities() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();

        dispatch({ type: "cities/loaded", payload: data });
      } catch (err) {
        dispatch({
          type: "rejected",
          payload: "there is an error getting cities",
        });
      }
    }
    FetchCities();
  }, []);

  const getCities = useCallback(
    async function (id) {
      if (!currentCity || Number(id) === currentCity.id) return;

      dispatch({ type: "loading" });
      try {
        const resp = await fetch(`${BASE_URL}/cities/${id}`);
        if (!resp.ok) throw new Error("Failed to fetch city data");

        const data = await resp.json();
        dispatch({ type: "city/loaded", payload: data });
      } catch (err) {
        dispatch({
          type: "rejected",
          payload: "There was an error getting the city.",
        });
      }
    },
    [currentCity]
  );
  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const resp = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await resp.json();
      dispatch({ type: "city/created", payload: data });
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: "there is an error on creating the city",
      });
    }
  }
  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "city/deleted", payload: id });
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: "there is an error on deleting the city",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        getCities,
        currentCity,
        createCity,
        deleteCity,
        error,
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
