import { createContext, useContext, useEffect, useReducer } from 'react';
import { BASE_URL } from '../constants';

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        isLoading: true,
      };
    case 'FETCH_CITIES':
      return {
        ...state,
        cities: action.payload,
        isLoading: false,
      };
    case 'FETCH_CITY':
      return {
        ...state,
        currentCity: action.payload,
        isLoading: false,
      };
    case 'CREATE_CITY':
      return {
        ...state,
        cities: [...state.cities, action.payload],
        isLoading: false,
        currentCity: action.payload,
      };
    case 'DELETE_CITY':
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
        isLoading: false,
        currentCity: {},
      };
    case 'REJECT':
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    default:
      throw new Error(`Unsupported action type ${action.type}`);
  }
};

export const CitiesProvider = ({ children }) => {
  const [{ cities, currentCity, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  const fetchCities = async () => {
    dispatch({ type: 'LOADING' });
    try {
      const response = await fetch(`${BASE_URL}/cities`);
      const cities = await response.json();
      dispatch({ type: 'FETCH_CITIES', payload: cities });
    } catch (error) {
      dispatch({
        type: 'REJECT',
        payload: 'Something went wrong with fetching cities',
      });
    }
  };

  const fetchCity = async (id) => {
    if (Number(id) === currentCity.id) return;

    dispatch({ type: 'LOADING' });
    try {
      const response = await fetch(`${BASE_URL}/cities/${id}`);
      const cities = await response.json();
      dispatch({ type: 'FETCH_CITY', payload: cities });
    } catch (error) {
      dispatch({
        type: 'REJECT',
        payload: 'Something went wrong with fetching city',
      });
    }
  };

  const createCity = async (newCity) => {
    dispatch({ type: 'LOADING' });
    try {
      const response = await fetch(`${BASE_URL}/cities/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCity),
      });
      const city = await response.json();
      dispatch({ type: 'CREATE_CITY', payload: city });
    } catch (error) {
      dispatch({
        type: 'REJECT',
        payload: 'Something went wrong with creating city',
      });
    }
  };

  const deleteCity = async (id) => {
    dispatch({ type: 'LOADING' });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE',
      });
      dispatch({ type: 'DELETE_CITY', payload: id });
    } catch (error) {
      dispatch({
        type: 'REJECT',
        payload: 'Something went wrong with deleting city',
      });
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);
  return (
    <CitiesContext.Provider
      value={{
        cities,
        currentCity,
        isLoading,
        error,
        fetchCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
};

export const useCities = () => {
  const context = useContext(CitiesContext);
  if (context === undefined) {
    throw new Error('useCities must be used within a CitiesProvider');
  }
  return context;
};
