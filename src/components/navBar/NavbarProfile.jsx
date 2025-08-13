import React from "react";
import { useNavigate } from "react-router-dom";
import logo_perfil from "../../assets/perfil-preto.png"
import {getUsuarioLocalStorage} from "../../services/authService.js";

 function NavbarProfile() {
  const navigate = useNavigate();

  const goToPerfil = () => {
    const userData = getUsuarioLocalStorage();
    if (userData) {
        navigate(`/perfil/${userData.idUsuario}`);
    }
  };



  return (
    <div className="container-perfil">
        <img
            src={logo_perfil}
            alt="Avatar"
            className="logo-perfil"
            style={{ width: "40px", height: "40px", cursor: "pointer" }}
            onClick={goToPerfil}
        />
    </div>

  )
};

export default NavbarProfile;