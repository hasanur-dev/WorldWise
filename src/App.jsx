import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { CitiesProvider } from './contexts/CitiesContext'
import { AuthProvider } from './contexts/FakeAuthContext'
import ProtectedRoute from './pages/ProtectedRoute'

import CityList from './components/CityList'
import CountryList from './components/CountryList'
import City from './components/City'
import Form from './components/Form'
import SpinnerFullPage from './components/SpinnerFullPage'
// import Homepage from './pages/Homepage'
// import Product from './pages/Product'
// import Pricing from './pages/Pricing'
// import Login from './pages/Login'
// import AppLayout from './pages/AppLayout'
// import PageNotFound from './pages/PageNotFound'

const Homepage = lazy(() => import('./pages/Homepage'))
const Product = lazy(() => import('./pages/Product'))
const Pricing = lazy(() => import('./pages/Pricing'))
const Login = lazy(() => import('./pages/Login'))
const AppLayout = lazy(() => import('./pages/AppLayout'))
const PageNotFound = lazy(() => import('./pages/PageNotFound'))

// dist/index.html                   0.52 kB │ gzip:   0.32 kB
// dist/assets/index-h2srKsfD.css   31.90 kB │ gzip:   5.28 kB
// dist/assets/index-C7-Tj_I4.js   532.30 kB │ gzip: 150.70 kB

const App = () => {
    return (
        <AuthProvider>
            <CitiesProvider>
                <BrowserRouter>
                    <Suspense fallback={<SpinnerFullPage />}>
                        <Routes>
                            <Route index element={<Homepage />} />
                            <Route path="product" element={<Product />} />
                            <Route path="pricing" element={<Pricing />} />
                            <Route path="login" element={<Login />} />
                            <Route
                                path="app"
                                element={
                                    <ProtectedRoute>
                                        <AppLayout />
                                    </ProtectedRoute>
                                }
                            >
                                <Route
                                    index
                                    element={<Navigate replace to="cities" />}
                                />
                                <Route
                                    path="cities"
                                    element={
                                        <CityList />
                                        // <CityList cities={cities} isLoading={isLoading} />
                                    }
                                />
                                <Route path="cities/:id" element={<City />} />
                                <Route
                                    path="countries"
                                    element={
                                        <CountryList
                                        // cities={cities}
                                        // isLoading={isLoading}
                                        />
                                    }
                                />
                                <Route path="form" element={<Form />} />
                            </Route>
                            <Route path="*" element={<PageNotFound />} />
                        </Routes>
                    </Suspense>
                </BrowserRouter>
            </CitiesProvider>
        </AuthProvider>
    )
}

export default App
