import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/ListarLivros.css";
import Lixeira from "../../assets/lixeira.png";
import Editar from "../../assets/editar.png";
import api from "../../services/api";

function ListarLivros() {
  const [livros, setLivros] = useState([]);
  const navigate = useNavigate();

  async function getLivros() {
    const response = await api.get("/livros");
    setLivros(response.data);
  }

  async function excluirLivro(id) {
    if (window.confirm("Tem certeza de que deseja excluir este livro?")) {
      await api.delete(`/livros/${id}`);
      getLivros();
    }
  }

  function redirecionarParaCadastro() {
    navigate("/cadastro");
  }

  function redirecionarParaEditar(id) {
    navigate(`/editar/${id}`);
  }

  useEffect(() => {
    getLivros();
  }, []);

  return (
    <div className="container">
      <h1>Listagem de Livros</h1>
      <button className="cadastro-btn" onClick={redirecionarParaCadastro}>
        Cadastro
      </button>
      <table className="livros-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Autor</th>
            <th>Categoria</th>
            <th>ISBN</th>
            <th>Data de Cadastro</th>
            <th>Editar</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          {livros.map((livro) => (
            <tr key={livro.idLivro}>
              <td>{livro.idLivro}</td>
              <td>{livro.titulo}</td>
              <td>{livro.autor}</td>
              <td>{livro.categoria}</td>
              <td>{livro.isbn}</td>
              <td>{livro.dataCadastro}</td>
              <td>
                <button
                  className="editar-btn"
                  onClick={() => redirecionarParaEditar(livro.idLivro)}
                >
                  <img src={Editar} alt="Editar" />
                </button>
              </td>
              <td>
                <button
                  className="excluir-btn"
                  onClick={() => excluirLivro(livro.idLivro)}
                >
                  <img src={Lixeira} alt="Excluir" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListarLivros;