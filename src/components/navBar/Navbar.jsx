import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUsuarioLocalStorage, logout } from "../../services/authService";
import NavbarItem from "./NavbarItem";
import NavbarItemDropdown from "./NavbarItemDropdown";
import NavbarProfile from "./NavbarProfile";
import Logo_NavBar from "../../assets/slogan_navBar.png"
import "./styles/Navbar.css"

const Navbar = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [role, setRole] = useState(null);


  function handleNavegationImg() {
    if (role === "ADMINISTRADOR"){
      navigate("/admin/home")
    }else{
      navigate("/usuario/home")
    }
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    const userData = getUsuarioLocalStorage();
    if (userData) {
      setUsuario(userData);
      setRole(userData.role.role);
    }
  }, []);

  return (
    <nav className="container-navbar" data-bs-theme="dark">
      <div className="container-fluid">
        <img src={Logo_NavBar} alt="logo-bibliotech" onClick={handleNavegationImg} />

        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav me-auto">
            <NavbarItem to={role === "ADMINISTRADOR" ? "/admin/home" : "usuario/home"} label="Home" />

            {role === "ADMINISTRADOR" && (
              <NavbarItemDropdown label="Gerência" items={[
                { to: "/usuarios", label: "Usuários" },
                { to: "/livros", label: "Livros" },
                { to: "/emprestimos", label: "Empréstimos" },
                { to: "/admins", label: "Administradores" },
              ]} />
            )}

            <NavbarItem to="/historico" label="Histórico" />

            <li className="nav-item">
              <button onClick={handleLogout} className="btn-sair">Sair</button>
            </li>
          </ul>

          <NavbarProfile

          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;