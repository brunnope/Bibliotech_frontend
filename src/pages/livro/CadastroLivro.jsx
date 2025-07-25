import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./CadastroLivro.css";
import Lixeira from "../../assets/lixeira.png";
import api from "../../services/api";

function CadastroLivro() {
  const [livros, setLivros] = useState([]);
  const titulo = useRef();
  const autor = useRef();
  const categoria = useRef();
  const ISBN = useRef();
  const dataCadastro = useRef();
  const navigate = useNavigate();

  const hoje = new Date();
  const dataMax = hoje.toLocaleDateString('en-CA');

    // Função para criar um livro
  async function criarLivro() {
    await api.post("/livros", {
      titulo: titulo.current.value,
      autor: autor.current.value,
      categoria: categoria.current.value,
      isbn: ISBN.current.value,
      dataCadastro: dataCadastro.current.value,
    });

    document.getElementById("btnLimpar").click();
    getLivros();
  }

  // Função para buscar livros
  async function getLivros() {
    const response = await api.get("/livros");
    setLivros(response.data);
  }

    async function excluirLivro(id) {
        await api.delete(`/livros/${id}`);
        getLivros();
    }

  // Redirecionar para listagem
  function cancelarCadastro() {
    navigate("/");
  }

  useEffect(() => {
    getLivros();
  }, []);

  return (
    <div className="container">
      <form>
        <h1>Cadastro de Livros</h1>
        <input placeholder="Título" name="Título" type="text" ref={titulo} />
        <input placeholder="Autor" name="Autor" type="text" ref={autor} />
        <input placeholder="Categoria" name="Categoria" type="text" ref={categoria} />
        <input placeholder="ISBN" name="ISBN" type="text" ref={ISBN} />
        <input placeholder="Data de Cadastro" name="DataCadastro" type="date" ref={dataCadastro}  min="2000-01-01"
               max={dataMax}/>
        <button type="button" onClick={criarLivro}>
          Salvar
        </button>
        <button id="btnLimpar" type="reset">
          Limpar
        </button>
        <button type="button" onClick={cancelarCadastro}>
          Cancelar
        </button>
      </form>

      {livros.map((livro) => (
        <div key={livro.idLivro} className="card">
          <div>
            <p>
              Título: <span>{livro.titulo}</span>
            </p>
            <p>
              Autor: <span>{livro.autor}</span>
            </p>
            <p>
              Categoria: <span>{livro.categoria}</span>
            </p>
            <p>
              ISBN: <span>{livro.isbn}</span>
            </p>
            <p>
              Data de Cadastro: <span>{livro.dataCadastro}</span>
            </p>
          </div>

          <button type="button" onClick={() => excluirLivro(livro.idLivro)}>
            <img src={Lixeira} alt="Excluir" />
          </button>
        </div>
      ))}
    </div>
  );
}

export default CadastroLivro;