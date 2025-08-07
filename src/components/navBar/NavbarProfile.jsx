import React from "react";
import { useNavigate } from "react-router-dom";
import logo_perfil from "../../assets/perfil-preto.png"

 function NavbarProfile() {
  const navigate = useNavigate();

  const goToPerfil = () => {
    navigate("/perfil");
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