import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";
import DataTable from "../../components/table/table";
import PageTitle from "../../components/pageTitle/pageTitle";
import "./styles/ListarExemplares.css";
import {getUsuarioLocalStorage} from "../../services/authService.js";

function ListarExemplares({ isAdmin }) {
  const [exemplares, setExemplares] = useState([]);
  const [disponibilidade, setDisponibilidade] = useState("");
  const [titulo, setTitulo] = useState("");
  const [modalImage, setModalImage] = useState(null);
  const navigate = useNavigate();

  const carregarExemplares = async () => {
        try {
            const response = await api.get("/exemplares", {
                params: { disponibilidade, titulo }
            });
            setExemplares(response.data);
        } catch (error) {
            console.error("Erro ao buscar exemplares:", error);
        }
    };

    const handleViewImage = (imageUrl) => {
        setModalImage(imageUrl);
    };

    const closeModal = () => {
        setModalImage(null);
    };

    async function criarEmprestimo(idExemplar) {
    try {
        const userData = getUsuarioLocalStorage();

        const exemplarResponse = await api.get(`/exemplares/${idExemplar}`);
        const exemplar = exemplarResponse.data;

        if (exemplar.quantidadeDisponivel <= 0 || exemplar.disponibilidade === "INDISPONIVEL") {
            alert("O exemplar selecionado está indisponível no momento.");
            return;
        }

        const dataAtual = new Date();
        const dataEmprestimo = dataAtual.toISOString().split("T")[0];

        const dataPrevista = new Date(dataAtual.getTime() + 15 * 24 * 60 * 60 * 1000);
        const dataPrevistaDevolucao = dataPrevista.toISOString().split("T")[0];

        const emprestimo = {
            usuario: {
                idUsuario: userData.idUsuario
            },
            exemplar: {
                idExemplar: exemplar.idExemplar
            },
            dataEmprestimo: dataEmprestimo,
            dataPrevistaDevolucao: dataPrevistaDevolucao,
            status: "PENDENTE"
        };

        await api.post("/emprestimos", emprestimo);

        alert("Empréstimo criado com sucesso!");
        carregarExemplares();
        } catch (error) {
            console.error(error);
            alert("Erro ao criar empréstimo. Tente novamente.");
        }
    }


    const handleFiltrar = () => {
        carregarExemplares();
    };


    useEffect(() => {
        carregarExemplares();
    }, []);


    return (
    <>
        <PageTitle>Lista de Exemplares</PageTitle>

        {/* FILTROS */}
        <div className={"filtro"}>
            <select
                value={disponibilidade}
                onChange={(e) => setDisponibilidade(e.target.value)}
            >
                <option value="">Todas as disponibilidades</option>
                <option value="DISPONIVEL">Disponível</option>
                <option value="INDISPONIVEL">Indisponível</option>
            </select>

            <input
                type="text"
                placeholder="Nome do livro"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
            />

            <button onClick={handleFiltrar}>Filtrar</button>
        </div>

      {/* TABELA */}
      <DataTable
        data={exemplares}
        columns={
          isAdmin ? [
          { field: "idExemplar", label: "ID" },
          { field: "numExemplar", label: "Número" },
          { field: "anoPublicacao", label: "Ano de Publicação" },
          { field: "disponibilidade", label: "Disponibilidade" },
          { field: "quantidadeTotal", label: "Total" },
          { field: "quantidadeDisponivel", label: "Disponível" },
          { field: "idioma", label: "Idioma" },
          { field: "livro.titulo", label: "Livro" },
          { field: "livro.autor", label: "Autor" },
          { field: "editora.nome", label: "Editora" },
        ] :
        [{ field: "numExemplar", label: "Número" },
          { field: "anoPublicacao", label: "Ano de Publicação" },
          { field: "disponibilidade", label: "Disponibilidade" },
          { field: "quantidadeDisponivel", label: "Quantidade" },
          { field: "idioma", label: "Idioma" },
          { field: "livro.titulo", label: "Livro" },
          { field: "livro.autor", label: "Autor" },
          { field: "editora.nome", label: "Editora" }
        ]}
        actions={[
          {
            field: "capaImg",
            label: "Ver Capa",
            action: (row) => handleViewImage(row.capaImg),
          },
          {
            field: "contracapaImg",
            label: "Ver Contracapa",
            action: (row) => handleViewImage(row.contracapaImg),
          },
        ]}
        idField="idExemplar"
        onAdd={isAdmin ? () => navigate("/cadastro-exemplar") : undefined}
        onEdit={isAdmin ? (id) => navigate(`/editar-exemplar/${id}`) : undefined}
        onDelete={
          isAdmin
            ? (id) => {
                if (window.confirm("Tem certeza que deseja excluir?")) {
                  api.delete(`/exemplares/${id}`).then(() =>
                    setExemplares((prev) =>
                      prev.filter((e) => e.idExemplar !== id)
                    )
                  );
                }
              }
            : undefined
        }
        onEmprestimo={
          !isAdmin ? (id) => criarEmprestimo(id) : undefined
        }
      />

      {/* Modal Overlay */}
      {modalImage && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={modalImage} alt="Exemplar" className="modal-image" />
          </div>
        </div>
      )}
    </>
  );
}

export default ListarExemplares;