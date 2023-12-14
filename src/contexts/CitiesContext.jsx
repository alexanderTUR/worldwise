import { createContext, useContext, useEffect, useState } from 'react';
import { BASE_URL } from '../constants';

const CitiesContext = createContext();

export const CitiesProvider = ({ children }) => {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  const fetchCities = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/cities`);
      const cities = await response.json();
      setCities(cities);
    } catch (error) {
      alert('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCity = async (id) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/cities/${id}`);
      const cities = await response.json();
      setCurrentCity(cities);
    } catch (error) {
      alert('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);
  return (
    <CitiesContext.Provider
      value={{ cities, isLoading, currentCity, fetchCity }}
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
