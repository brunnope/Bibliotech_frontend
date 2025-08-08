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
import ListarExemplares from "./pages/exemplar/ListarExemplares.jsx";
import CadastroExemplar from "./pages/exemplar/CadastroExemplar.jsx";
import ListarUsuarios from "./pages/usuario/ListarUsuarios.jsx";
import ListarEmprestimos from "./pages/empretimo/ListarEmprestimos.jsx";
import ListarAdministradores from "./pages/administrador/ListarAdministrador.jsx";
import ListarHistoricos from "./pages/historico/ListarHistorico.jsx";
import Perfil from "./pages/perfil/Perfil.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Login />} />
        <Route path="/redefinir-senha" element={<RedefinirSenha />} />
        <Route path="/cadastro-usuario" element={<CadastroUsuario />} />

        
        <Route element={<ProtectedLayout />}>
          <Route path="/admin/home" element={<ListarExemplares isAdmin={true}/>} />
          <Route path="/usuario/home" element={<ListarExemplares />} />
          <Route path="/cadastro-exemplar" element={<CadastroExemplar />} />
          <Route path="/editar-exemplar/:id" element={<CadastroExemplar />} />
          <Route path="/cadastro-livro" element={<CadastroLivro />} />
          <Route path="/editar-livro/:id" element={<CadastroLivro />} />
          <Route path="/livros" element={<ListarLivros />} />
          <Route path="/usuarios" element={<ListarUsuarios />} />
          <Route path="/emprestimos" element={<ListarEmprestimos />} />
          <Route path="/admins" element={<ListarAdministradores />} />
          <Route path="/historico" element={<ListarHistoricos />} />
          <Route path="/perfil" element={<Perfil />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);