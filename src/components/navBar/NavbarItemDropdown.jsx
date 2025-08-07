import React, { useState } from "react";
import { Link } from "react-router-dom";

const NavbarItemDropdown = ({ label, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li
      className="nav-item dropdown"
      onMouseEnter={() => setIsOpen(true)} // Abre ao passar o mouse
      onMouseLeave={() => setIsOpen(false)} // Fecha ao sair com o mouse
    >
      <span className="nav-link dropdown-toggle" role="button">
        {label}
      </span>
      {isOpen && (
        <ul className="dropdown-menu show">
          {items.map((item, index) => (
            <li key={index}>
              <Link className="dropdown-item" to={item.to}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default NavbarItemDropdown;