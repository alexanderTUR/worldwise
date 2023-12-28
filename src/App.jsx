import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { ProtectedRoute } from './pages/ProtectedRoute/ProtectedRoute.jsx';
import { CitiesProvider } from './contexts/CitiesContext.jsx';
import { AuthProvider } from './contexts/FakeAuthContext.jsx';

import { CityList } from './components/CityList/CityList.jsx';
import { CountryList } from './components/CountryList/CountryList.jsx';
import { City } from './components/City/City.jsx';
import { Form } from './components/Form/Form.jsx';
import { SpinnerFullPage } from './components/SpinnerFullPage/SpinnerFullPage.jsx';

const Homepage = lazy(() =>
  import('./pages/Homepage/Homepage.jsx').then((module) => ({
    default: module.Homepage,
  })),
);
const Product = lazy(() =>
  import('./pages/Product/Product.jsx').then((module) => ({
    default: module.Product,
  })),
);
const Pricing = lazy(() =>
  import('./pages/Pricing/Pricing.jsx').then((module) => ({
    default: module.Pricing,
  })),
);
const Login = lazy(() =>
  import('./pages/Login/Login.jsx').then((module) => ({
    default: module.Login,
  })),
);
const AppLayout = lazy(() =>
  import('./pages/AppLayout/AppLayout.jsx').then((module) => ({
    default: module.AppLayout,
  })),
);
const PageNotFound = lazy(() =>
  import('./pages/PageNotFound/PageNotFound.jsx').then((module) => ({
    default: module.PageNotFound,
  })),
);

const App = () => {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<Homepage />} />
              <Route path='product' element={<Product />} />
              <Route path='pricing' element={<Pricing />} />
              <Route path='login' element={<Login />} />
              <Route
                path='app'
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to='cities' replace />} />
                <Route path='cities' element={<CityList />} />
                <Route path='cities/:id' element={<City />} />
                <Route path='countries' element={<CountryList />} />
                <Route path='form' element={<Form />} />
              </Route>
              <Route path='*' element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
};

export default App;
