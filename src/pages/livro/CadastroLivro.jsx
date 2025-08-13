import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./styles/CadastroLivro.css";
import Lixeira from "../../assets/lixeira.png";
import api from "../../services/api.js";
import InputField from "../../components/input/InputField.jsx";
import Button from "../../components/button/Button.jsx";
import Mensagem from "../../components/mensagem/Mensagem.jsx";

function CadastroLivro() {
  const { id } = useParams();
  const editar = !!id; 

  const [livro, setLivro] = useState(null);
  const [categoriaOptions, setCategoriaOptions] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [categoria, setCategoria] = useState("");
  const [isbn, setIsbn] = useState("");
  const [dataCadastro, setDataCadastro] = useState("");
  const [mensagem, setMensagem] = useState("");


  const navigate = useNavigate();

  const hoje = new Date();
  const dataMax = hoje.toLocaleDateString("en-CA");

  function handleSubmit(e) {
    e.preventDefault();
    criarLivro();
  }

  async function criarLivro() {
    if (editar){
      await api.put(`/livros/${livro.idLivro}`, {
        titulo,
        autor,
        categoria,
        isbn,
        dataCadastro,
      });

      setMensagem("Livro atualizado com sucesso!");
      setTimeout(() => {
        navigate("/livros")
      }, 1500);

    }else {
      await api.post("/livros", {
      titulo,
      autor,
      categoria,
      isbn,
      dataCadastro,
    });

    setMensagem("Livro criado com sucesso!");

    setTimeout(() => {
      setMensagem("");
    }, 2000);

    limparCampos();
    getLivro();
    carregarCategorias();
    }
  }

  function limparCampos() {
    setTitulo("");
    setAutor("");
    setCategoria("");
    setIsbn("");
    setDataCadastro("");
  }

  async function getLivro() {
    const response = await api.get("/livros/ultimo");
    if (response.data) {
      setLivro(response.data);
    }
  }

  async function carregarCategorias() {
    const response = await api.get("livros/categorias");
    setCategoriaOptions(response.data);
  }

  async function excluirLivro(id) {
    await api.delete(`/livros/${id}`);
    setLivro(null);
    limparCampos();
    carregarCategorias();

    if (editar) {
      navigate("/livros");
    }
  }

  function cancelarCadastro() {
    navigate("/livros");
  }

  useEffect(() => {
    carregarCategorias();
    if (editar) {

      api.get(`/livros/${id}`).then(response => {
        const livro = response.data;
        setLivro(livro);
        setTitulo(livro.titulo);
        setAutor(livro.autor);
        setCategoria(livro.categoria);
        setIsbn(livro.isbn);
        setDataCadastro(livro.dataCadastro);
      });
    }
  }, [editar, id]);

  return (
    <div className="cadastro-container">
      <form className="form-cadastro" onSubmit={handleSubmit}>

        {editar && livro ? (
          <h1>Editar Livro: <br></br>
            <span id="span_editar">{livro.titulo}</span></h1>
        ) : (
          <h1>Cadastro de Livro</h1>
        )}
        
        <InputField
          label="Título*"
          name="titulo"
          placeholder="Título"
          value={titulo}
          required={true}
          maxLength={255}
          onChange={(e) => setTitulo(e.target.value)}
        />

        <InputField
          label="Autor*"
          name="autor"
          placeholder="Autor"
          value={autor}
          required={true}
          maxLength={255}
          onChange={(e) => setAutor(e.target.value)}
        />

        <InputField
          label="Categoria*"
          name="categoria"
          placeholder="Categoria"
          datalistOptions={categoriaOptions}
          value={categoria}
          required={true}
          maxLength={100}
          onChange={(e) => setCategoria(e.target.value)}
        />

        <InputField
          label="ISBN*"
          name="isbn"
          type="number"
          placeholder="ISBN"
          value={isbn}
          required={true}
          maxLength={13}
          min={0}
          onChange={(e) => setIsbn(e.target.value)}
        />

        <InputField
          label="Data de Cadastro*"
          name="dataCadastro"
          type="date"
          value={dataCadastro}
          required={true}
          onChange={(e) => setDataCadastro(e.target.value)}
          min="2020-01-01"
          max={dataMax}
        />

        <Mensagem mensagem={mensagem} />

        <Button
          text="Salvar"
          type="submit"
          id="btn-salvar"
        />
        
        <Button
          text="Limpar"
          type="button"
          onClick={limparCampos}
        />

        <Button
          text="Cancelar"
          type="button"
          onClick={cancelarCadastro}
        />
      </form>

      {livro && (
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

          <Button
            type="button"
            onClick={() => excluirLivro(livro.idLivro)}
            img={Lixeira}
          />
        </div>
      )}
    </div>
  );
}

export default CadastroLivro;
