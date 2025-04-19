import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../utils/auth";

const Navbar = ({ cartCount, role }) => {
  return (
    <nav style={{ display: "flex", justifyContent: "space-between" }}>
      {role === "user" && (
        <>
          <Link to="/products">Products</Link>

          <Link to="/cart">{`Cart (${cartCount})`}</Link>
        </>
      )}

      <Link to="/" onClick={logout}>
        Logout
      </Link>
    </nav>
  );
};

export default Navbar;
