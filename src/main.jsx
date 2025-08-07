import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Login from "./pages/autenticacao/Login.jsx";
import RedefinirSenha from "./pages/autenticacao/RedefenirSenha.jsx";
import CadastroUsuario from "./pages/autenticacao/CadastroUsuario.jsx";
import ListarLivros from "./pages/livro/ListarLivros.jsx";
import CadastroLivro from "./pages/livro/CadastroLivro.jsx";
import ProtectedLayout from "./components/ProtectedLayout.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Login />} />
        <Route path="/redefinir-senha" element={<RedefinirSenha />} />
        <Route path="/cadastro-usuario" element={<CadastroUsuario />} />

        
        <Route element={<ProtectedLayout />}>
          <Route path="/admin/home" element={<ListarLivros />} />
          <Route path="/usuario/home" element={<ListarLivros />} />
          <Route path="/editar/:id" element={<CadastroLivro />} />
          <Route path="/cadastro" element={<CadastroLivro />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);