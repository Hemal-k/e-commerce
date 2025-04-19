import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./componets/Login";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import UserManagement from "./componets/UserManagement";
import ProductManagement from "./componets/ProductManagement";
import Navbar from "./componets/Navbar";
import { useEffect, useState } from "react";
import Cart from "./componets/Cart";

function App() {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartData") || "[]")
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoutes role="admin">
              <UserManagement />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoutes role="user">
              <ProductManagement
                setCartItems={setCartItems}
                cartItems={cartItems}
              />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoutes role="user">
              <Cart cartItems={cartItems} />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
