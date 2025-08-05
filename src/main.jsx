import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Login from "./pages/login/Login.jsx";
import RedefinirSenha from "./pages/login/RedefenirSenha.jsx";
import ListarLivros from "./pages/livro/ListarLivros.jsx";
import CadastroLivro from "./pages/livro/CadastroLivro.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/redefinir-senha" element={<RedefinirSenha />} />
        <Route path="/admin/home" element={<ListarLivros />} />
        <Route path="/usuario/home" element={<ListarLivros />} />
        <Route path="/editar/:id" element={<CadastroLivro />} />
        <Route path="/cadastro" element={<CadastroLivro />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);