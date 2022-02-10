import Home from './Page/Home';
import Login from './Page/Login';
import Register from './Page/Register';
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
import Admin from './Page/Admin';
import { useSelector } from 'react-redux';

function App() {
  const user = useSelector(state => state.auth.currentUser);
  console.log(user);

  return (
    <div>
    <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={user ? <Navigate to='/'/> : <Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/products/:brand' element={<ProductList />} />
        <Route path='/product/:id' element={<Product />} />
      </Routes>
    </div>
  );
}

export default App;