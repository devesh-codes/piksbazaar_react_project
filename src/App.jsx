import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import Banner from './components/Banner';
import ProductDetail from './components/ProductDetail';
import { CartProvider } from './context/CartContext';
import Cart from './context/Cart';
import { ToastContainer } from 'react-toastify';
import Login from './components/Login';
import Register from './components/Register';
import Contributor from './components/Contributor';

const App = () => {
  const location = useLocation();

  // Pages where layout (Navbar, Footer, Banner) should be hidden
  const layoutHiddenRoutes = ['/cart', '/login','/register','/contributor'];
  const isProductPage = location.pathname.startsWith('/product/');
  const hideLayout = layoutHiddenRoutes.includes(location.pathname) || isProductPage;

  return (
    <CartProvider>
      {!hideLayout && <Navbar />}

      <Routes>
        <Route path="/" element={<Gallery />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contributor" element={<Contributor />} />
      </Routes>

      <ToastContainer />
      
      {!hideLayout && <Banner />}
      {!hideLayout && <Footer />}
    </CartProvider>
  );
};

export default App;
