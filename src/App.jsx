import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { Product } from './pages/Product/Product.jsx';
import { Pricing } from './pages/Pricing/Pricing.jsx';
import { Homepage } from './pages/Homepage/Homepage.jsx';
import { PageNotFound } from './pages/PageNotFound/PageNotFound.jsx';
import { AppLayout } from './pages/AppLayout/AppLayout.jsx';
import { Login } from './pages/Login/Login.jsx';
import { CityList } from './components/CityList/CityList.jsx';
import { CountryList } from './components/CountryList/CountryList.jsx';
import { City } from './components/City/City.jsx';
import { Form } from './components/Form/Form.jsx';

const BASE_URL = 'http://localhost:8000';

const App = () => {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
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
    fetchCities();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path='product' element={<Product />} />
        <Route path='pricing' element={<Pricing />} />
        <Route path='login' element={<Login />} />
        <Route path='app' element={<AppLayout />}>
          <Route index element={<Navigate to='cities' replace />} />
          <Route
            path='cities'
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route path='cities/:id' element={<City />} />
          <Route
            path='countries'
            element={<CountryList cities={cities} isLoading={isLoading} />}
          />
          <Route path='form' element={<Form />} />
        </Route>
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
