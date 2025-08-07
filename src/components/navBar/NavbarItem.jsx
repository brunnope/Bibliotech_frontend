import React from "react";
import { Link } from "react-router-dom";

const NavbarItem = ({ to, label }) => {
  return (
    <li className="nav-item">
      <Link className="nav-link" to={to}>{label}</Link>
    </li>
  );
};

export default NavbarItem;