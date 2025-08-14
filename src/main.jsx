import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Login from "./pages/autenticacao/Login.jsx";
import RedefinirSenha from "./pages/autenticacao/RedefenirSenha.jsx";
import CadastroUsuarioLogin from "./pages/autenticacao/CadastroUsuarioLogin.jsx";
import ListarLivros from "./pages/livro/ListarLivros.jsx";
import CadastroLivro from "./pages/livro/CadastroLivro.jsx";
import ProtectedLayout from "./components/ProtectedLayout.jsx";
import ListarExemplares from "./pages/exemplar/ListarExemplares.jsx";
import CadastroExemplar from "./pages/exemplar/CadastroExemplar.jsx";
import ListarUsuarios from "./pages/usuario/ListarUsuarios.jsx";
import ListarEmprestimos from "./pages/empretimo/ListarEmprestimos.jsx";
import CadastroUsuario from "./pages/usuario/CadastroUsuario.jsx";
import EditarEmprestimo from "./pages/empretimo/EditarEmprestimo.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Login />} />
        <Route path="/redefinir-senha" element={<RedefinirSenha />} />
        <Route path="/cadastro-usuario-login" element={<CadastroUsuarioLogin />} />

        
        <Route element={<ProtectedLayout />}>
          <Route path="/admin/home" element={<ListarExemplares isAdmin={true}/>} />
          <Route path="/usuario/home" element={<ListarExemplares />} />
          <Route path="/cadastro-exemplar" element={<CadastroExemplar />} />
          <Route path="/editar-exemplar/:id" element={<CadastroExemplar />} />
          <Route path="/cadastro-livro" element={<CadastroLivro />} />
          <Route path="/editar-livro/:id" element={<CadastroLivro />} />
          <Route path="/livros" element={<ListarLivros />} />
          <Route path="/usuarios" element={<ListarUsuarios />} />
          <Route path="/admins" element={<ListarUsuarios isAdmin={true} />} />
          <Route path="/cadastro-usuario" element={<CadastroUsuario />} />
          <Route path="/editar-usuario/:id" element={<CadastroUsuario />} />
          <Route path="/cadastro-admin" element={<CadastroUsuario isAdmin={true}/>} />
          <Route path="/editar-admin/:id" element={<CadastroUsuario isAdmin={true}/>} />
          <Route path="/emprestimos" element={<ListarEmprestimos isAdmin={true} />} />
          <Route path="/editar-emprestimo/:id" element={<EditarEmprestimo />} />
          <Route path="/historico" element={<ListarEmprestimos />} />
          <Route path="/perfil/:id" element={<CadastroUsuario isPerfil={true} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);