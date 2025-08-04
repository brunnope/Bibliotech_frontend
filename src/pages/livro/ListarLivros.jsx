import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";
import DataTable from "../../components/table/table";


function ListarLivros() {
  const [livros, setLivros] = useState([]);
  const navigate = useNavigate();

  async function getLivros() {
    const response = await api.get("/livros");
    setLivros(response.data);
  }

   useEffect(() => {
    getLivros();
  }, []);

  return (
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
      onAdd={() => navigate("/cadastro")}
      onEdit={(id) => navigate(`/editar/${id}`)}
      onDelete={(id) => {
        if (window.confirm("Tem certeza que deseja excluir?")) {
          api.delete(`/livros/${id}`).then(() =>
            setLivros((prev) => prev.filter((l) => l.idLivro !== id))
          );
        }
      }}
    />
  );
}

export default ListarLivros;