import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Lixeira from "../../assets/lixeira.png";
import api from "../../services/api.js";
import InputField from "../../components/input/InputField.jsx";
import Button from "../../components/button/Button.jsx";
import Mensagem from "../../components/mensagem/Mensagem.jsx";

function CadastroExemplar() {
  const { id } = useParams();
  const editar = !!id;

  const [livros, setLivros] = useState([])
  const [editoras, setEditoras] = useState([])

  const [exemplar, setExemplar] = useState(null);
  const [anoPublicacao, setAnoPublicacao] = useState("");
  const [numExemplar, setNumExemplar] = useState("");
  const [quantidadeTotal, setQuantidadeTotal] = useState("");
  const [quantidadeDisponivel, setQuantidadeDisponivel] = useState("");
  const [idioma, setIdioma] = useState("");
  const [disponibilidade, setDisponibilidade] = useState("");
  const [livroId, setLivroId] = useState("");
  const [editoraId, setEditoraId] = useState("");
  const [capaImg, setCapaImg] = useState("");
  const [contracapaImg, setContracapaImg] = useState("");
  const [mensagem, setMensagem] = useState("");

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    salvarExemplar();
  }

  async function salvarExemplar() {
    const exemplarData = {
      anoPublicacao,
      numExemplar,
      quantidadeTotal,
      quantidadeDisponivel,
      idioma,
      disponibilidade,
      livro: { idLivro: livroId },
      editora: { idEditora: editoraId },
      capaImg,
      contracapaImg,
    };
    
    if (quantidadeDisponivel > quantidadeTotal){
        setMensagem("Erro! Quantidade disponível não pode ser maior que total!")
    }
    else{
        if (editar) {
          await api.put(`/exemplares/${exemplar.idExemplar}`, exemplarData);
          setMensagem("Exemplar atualizado com sucesso!");
          setTimeout(() => {
            navigate("/admin/home")
          }, 1500)

    } else {
        await api.post("/exemplares", exemplarData);

        setMensagem("Exemplar criado com sucesso!");

        setTimeout(() => {
          setMensagem("");
        }, 2000);

        limparCampos();
        getUltimoExemplar();
    }
    }
  }

  function limparCampos() {
    setAnoPublicacao("");
    setNumExemplar("");
    setQuantidadeTotal("");
    setQuantidadeDisponivel("");
    setIdioma("");
    setDisponibilidade("");
    setLivroId("");
    setEditoraId("");
    setCapaImg("");
    setContracapaImg("");
  }

  async function getUltimoExemplar() {
    const response = await api.get("/exemplares/ultimo");
    if (response.data) {
      setExemplar(response.data);
    }
  }

  async function excluirExemplar(id) {
    await api.delete(`/exemplares/${id}`);
    setExemplar(null);
    limparCampos();

    if (editar) {
      navigate("/admin/home");
    }
  }

  function cancelarCadastro() {
    navigate("/admin/home");
  }

  useEffect(() => {
    if (editar) {
      api.get(`/exemplares/${id}`).then((response) => {
        const ex = response.data;
        setExemplar(ex);
        setAnoPublicacao(ex.anoPublicacao);
        setNumExemplar(ex.numExemplar);
        setQuantidadeTotal(ex.quantidadeTotal);
        setQuantidadeDisponivel(ex.quantidadeDisponivel);
        setIdioma(ex.idioma);
        setDisponibilidade(ex.disponibilidade);
        setLivroId(ex.livro?.idLivro || "");
        setEditoraId(ex.editora?.idEditora || "");
        setCapaImg(ex.capaImg);
        setContracapaImg(ex.contracapaImg);
      });
    }

    api.get("/livros").then((res) => setLivros(res.data));
    api.get("/editoras").then((res) => setEditoras(res.data));
  }, []);

  return (
    <div className="cadastro-container">
      <form className="form-cadastro" onSubmit={handleSubmit}>
        {editar && exemplar ? (
          <h1>Editar Exemplar</h1>
        ) : (
          <h1>Cadastro de Exemplar</h1>
        )}

        <InputField
          label="Ano de Publicação*"
          name="anoPublicacao"
          type="number"
          value={anoPublicacao}
          required
          min={1900}
          max={new Date().getFullYear()}
          onChange={(e) => setAnoPublicacao(e.target.value)}
          placeholder={"Ano de publicação"}
        />

        <InputField
          label="Número do Exemplar*"
          name="numExemplar"
          type="number"
          value={numExemplar}
          required
          min={1}
          onChange={(e) => setNumExemplar(e.target.value)}
          placeholder={"número exemplar do livro"}
        />

        <InputField
          label="Quantidade Total*"
          name="quantidadeTotal"
          type="number"
          value={quantidadeTotal}
          required
          min={0}
          onChange={(e) => setQuantidadeTotal(e.target.value)}
          placeholder={"Quantidade total de exemplares"}
        />

        <InputField
          label="Quantidade Disponível*"
          name="quantidadeDisponivel"
          type="number"
          value={quantidadeDisponivel}
          required
          min={0}
          onChange={(e) => setQuantidadeDisponivel(e.target.value)}
          placeholder={"Quantidade disponível para empréstimo"}
        />

        <InputField
          label="Idioma*"
          name="idioma"
          value={idioma}
          required
          maxLength={100}
          onChange={(e) => setIdioma(e.target.value)}
          placeholder={"Idioma"}
        />

        <div >
                        <label id={"label-radio"}>Status*</label>
                        <div className="opcoes">
                            <label>
                                <input
                                    type="radio"
                                    name="status"
                                    value="DISPONIVEL"
                                    checked={disponibilidade === "DISPONIVEL"}
                                    onChange={(e) => setDisponibilidade(e.target.value)}
                                />
                                Disponível
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="status"
                                    value="INDISPONIVEL"
                                    checked={disponibilidade === "INDISPONIVEL"}
                                    onChange={(e) => setDisponibilidade(e.target.value)}
                                />
                                Indisponível
                            </label>
                        </div>
                    </div>

        <div className="input-field">
            <label htmlFor="livroId">Livro*</label>
            <select
                id="livroId"
                value={livroId}
                required
                onChange={(e) => setLivroId(e.target.value)}
            >
            <option value="">Selecione um livro</option>
            {livros.map((livro) => (
                <option key={livro.idLivro} value={livro.idLivro}>
                {livro.titulo}
                </option>
            ))}
            </select>

            <label id="editora-label" htmlFor="editoraId">Editora*</label>
            <select
                id="editoraId"
                value={editoraId}
                required
                onChange={(e) => setEditoraId(e.target.value)}
            >
            <option value="">Selecione uma Editora</option>
            {editoras.map((editora) => (
                <option key={editora.idEditora} value={editora.idEditora}>
                {editora.nome}
                </option>
            ))}
            </select>

        </div>

        <InputField
          label="Capa (URL)*"
          name="capaImg"
          type="text"
          value={capaImg}
          required
          onChange={(e) => setCapaImg(e.target.value)}
          placeholder="URL da capa"
        />

        <InputField
          label="Contracapa (URL)*"
          name="contracapaImg"
          type="text"
          value={contracapaImg}
          required
          onChange={(e) => setContracapaImg(e.target.value)}
          placeholder="URL da contracapa"
        />

        <Mensagem mensagem={mensagem} />

        <Button text="Salvar" type="submit" id="btn-salvar" />
        <Button text="Limpar" type="button" onClick={limparCampos} />
        <Button text="Cancelar" type="button" onClick={cancelarCadastro} />
      </form>

      {exemplar && (
        <div key={exemplar.idExemplar} className="card">
          <p>
            Exemplar Nº: <span>{exemplar.numExemplar}</span>
          </p>
          <p>
            Ano Publicação: <span>{exemplar.anoPublicacao}</span>
          </p>
          <p>
            Quantidade Total: <span>{exemplar.quantidadeTotal}</span>
          </p>
          <p>
            Quantidade Disponível: <span>{exemplar.quantidadeDisponivel}</span>
          </p>
          <p>
            Idioma: <span>{exemplar.idioma}</span>
          </p>
          <p>
            Disponibilidade: <span>{exemplar.disponibilidade}</span>
          </p>
          <p>
            Livro ID: <span>{exemplar.livro?.idLivro}</span>
          </p>
          <p>
            Editora ID: <span>{exemplar.editora?.idEditora}</span>
          </p>
          <p>
            Capa: <a href={exemplar.capaImg} target="_blank">Ver imagem</a>
          </p>
          <p>
            Contracapa: <a href={exemplar.contracapaImg} target="_blank">Ver imagem</a>
          </p>

          <Button
            type="button"
            onClick={() => excluirExemplar(exemplar.idExemplar)}
            img={Lixeira}
          />
        </div>
      )}
    </div>
  );
}

export default CadastroExemplar;
