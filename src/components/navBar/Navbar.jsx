import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import NavbarItem from "./NavbarItem";
import NavbarItemDropdown from "./NavbarItemDropdown";
import NavbarProfile from "./NavbarProfile";
import Logo_NavBar from "../../assets/slogan_navBar.png"
import "./styles/Navbar.css"

const Navbar = () => {
    const { user } = useAuth();
    const { logout } = useAuth();
    const navigate = useNavigate();
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
        if (user) {
            setRole(user.role.role);
        }
    }, [user]);
    return (
    <nav className="container-navbar" data-bs-theme="dark">
      <div className="container-fluid">
        <img id={'logo-bibliotech'} src={Logo_NavBar} alt="logo-bibliotech" onClick={handleNavegationImg} />

        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav me-auto">
            <NavbarItem to={role === "ADMINISTRADOR" ? "/admin/home" : "usuario/home"} label="Home" />

            {role === "ADMINISTRADOR" && (
              <NavbarItemDropdown label="Gerência" items={[
                { to: "/livros", label: "Livros" },
                { to: "/emprestimos", label: "Empréstimos" },
                { to: "/usuarios", label: "Usuários" },
                { to: "/admins", label: "Administradores" },
              ]} />
            )}

            {role === "USER" && (
              <NavbarItem to="/historico" label="Histórico" />
              )
            }

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