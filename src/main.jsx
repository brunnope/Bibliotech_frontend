import { AuthProvider } from "./context/AuthContext.jsx";
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
import PrivateRoute from "./routes/PrivateRoute.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
      <AuthProvider>
            <BrowserRouter>
              <Routes>

                <Route path="/" element={<Login />} />
                <Route path="/redefinir-senha" element={<RedefinirSenha />} />
                <Route path="/cadastro-usuario-login" element={<CadastroUsuarioLogin />} />

                  <Route element={<PrivateRoute />}>
                        <Route element={<ProtectedLayout />}>

                            {/* Rotas apenas para admin */}
                            <Route
                                path="/admin/home"
                                element={
                                    <ProtectedRoute roles={['ADMINISTRADOR']}>
                                        <ListarExemplares isAdmin={true} />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/cadastro-exemplar"
                                element={
                                    <ProtectedRoute roles={['ADMINISTRADOR']}>
                                        <CadastroExemplar />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/editar-exemplar/:id"
                                element={
                                    <ProtectedRoute roles={['ADMINISTRADOR']}>
                                        <CadastroExemplar />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/cadastro-livro"
                                element={
                                    <ProtectedRoute roles={['ADMINISTRADOR']}>
                                        <CadastroLivro />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/editar-livro/:id"
                                element={
                                    <ProtectedRoute roles={['ADMINISTRADOR']}>
                                        <CadastroLivro />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/livros"
                                element={
                                    <ProtectedRoute roles={['ADMINISTRADOR']}>
                                        <ListarLivros />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/usuarios"
                                element={
                                    <ProtectedRoute roles={['ADMINISTRADOR']}>
                                        <ListarUsuarios />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/admins"
                                element={
                                    <ProtectedRoute roles={['ADMINISTRADOR']}>
                                        <ListarUsuarios isAdmin={true} />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/cadastro-usuario"
                                element={
                                    <ProtectedRoute roles={['ADMINISTRADOR']}>
                                        <CadastroUsuario />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/editar-usuario/:id"
                                element={
                                    <ProtectedRoute roles={['ADMINISTRADOR']}>
                                        <CadastroUsuario />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/cadastro-admin"
                                element={
                                    <ProtectedRoute roles={['ADMINISTRADOR']}>
                                        <CadastroUsuario isAdmin={true} />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/editar-admin/:id"
                                element={
                                    <ProtectedRoute roles={['ADMINISTRADOR']}>
                                        <CadastroUsuario isAdmin={true} />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/emprestimos"
                                element={
                                    <ProtectedRoute roles={['ADMINISTRADOR']}>
                                        <ListarEmprestimos isAdmin={true} />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/editar-emprestimo/:id"
                                element={
                                    <ProtectedRoute roles={['ADMINISTRADOR']}>
                                        <EditarEmprestimo />
                                    </ProtectedRoute>
                                }
                            />

                            {/* Rotas apenas para usuario */}
                            <Route
                                path="/usuario/home"
                                element={
                                    <ProtectedRoute roles={['USER']}>
                                        <ListarExemplares />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/historico"
                                element={
                                    <ProtectedRoute roles={['USER']}>
                                        <ListarEmprestimos />
                                    </ProtectedRoute>
                                }
                            />

                            {/* Rotas para ambos: admin e usuário */}
                            <Route
                                path="/perfil/:id"
                                element={
                                    <ProtectedRoute roles={['USER', 'ADMINISTRADOR']}>
                                        <CadastroUsuario isPerfil={true} />
                                    </ProtectedRoute>
                                }
                            />
                        </Route>
                  </Route>
              </Routes>
            </BrowserRouter>
      </AuthProvider>
  </StrictMode>
);