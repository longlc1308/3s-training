import Home from './Page/Home';
import Login from './Page/Auth/Login';
import Register from './Page/Auth/Register';
import Cart from './Page/Cart';
import './App.css';
import ScrollToTop from "./ScrollToTop";
import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import ProductList from './Page/ProductList';
import Product from './Page/Product';
import Admin from './Page/Admin/Admin';
import ForgotPassword from './Page/Auth/ForgotPassword';
import { useSelector } from 'react-redux';
import ResetPassword from './Page/Auth/ResetPassword';

function App() {
  const user = useSelector(state => state.auth.currentUser);

  return (
    <div>
    <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={user ? <Admin /> : <Navigate to='/'/>} />
        <Route path="/login" element={user ? <Navigate to='/'/> : <Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/register" element={<Register />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/products/:brand' element={<ProductList />} />
        <Route path='/product/:id' element={<Product />} />
      </Routes>
    </div>
  );
}

export default App;