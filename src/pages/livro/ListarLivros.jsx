import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";
import DataTable from "../../components/table/table";
import PageTitle from "../../components/pageTitle/PageTitle.jsx";
import "./styles/ListarLivros.css";

function ListarLivros() {
  const [livros, setLivros] = useState([]);
  const [tituloOuAutor, setTituloOuAutor] = useState("");
  const [categoria, setCategoria] = useState("");
  const navigate = useNavigate();

  async function getLivros() {
      const params = {};

      if (tituloOuAutor) params.tituloOuAutor = tituloOuAutor;
      if (categoria) params.categoria = categoria;

      const response = await api.get("/livros", { params });
      setLivros(response.data);
  }

   useEffect(() => {
    getLivros();
  }, []);

  return (
      <>
        <PageTitle>Listagem de Livros</PageTitle>

         <div className="filtro-livro">
             <input
                  type="text"
                  placeholder="Título ou autor"
                  value={tituloOuAutor}
                  onChange={(e) => setTituloOuAutor(e.target.value)}
             />

             <input
                  type="text"
                  placeholder="Categoria"
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
             />

             <button onClick={getLivros}>Filtrar</button>
         </div>

        <DataTable
          title="Listagem de Livros"
          data={livros}
          columns={[
            { field: "idLivro", label: "ID" },
            { field: "titulo", label: "Título" },
            { field: "autor", label: "Autor" },
            { field: "categoria", label: "Categoria" },
            { field: "isbn", label: "ISBN" },
            { field: "dataCadastro", label: "Data de Cadastro" },
          ]}
          idField="idLivro"
          onAdd={() => navigate("/cadastro-livro")}
          onEdit={(id) => navigate(`/editar-livro/${id}`)}
          onDelete={(id) => {
            if (window.confirm("Tem certeza que deseja excluir?")) {
              api.delete(`/livros/${id}`).then(() =>
                setLivros((prev) => prev.filter((l) => l.idLivro !== id))
              );
            }
          }}
        />
      </>
  );
}

export default ListarLivros;