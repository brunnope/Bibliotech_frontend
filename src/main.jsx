import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import ListarLivros from "./pages/livro/ListarLivros.jsx";
import CadastroLivro from "./pages/livro/CadastroLivro.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListarLivros />} />
        <Route path="/editar/:id" element={<CadastroLivro />} />
        <Route path="/cadastro" element={<CadastroLivro />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);