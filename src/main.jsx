import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import ListarLivro from "./pages/livro/ListarLivro.jsx";
import CadastroLivro from "./pages/livro/CadastroLivro.jsx";
import EditarLivro from "./pages/livro/EditarLivro.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListarLivro />} />
        <Route path="/editar/:id" element={<EditarLivro />} />
        <Route path="/cadastro" element={<CadastroLivro />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);