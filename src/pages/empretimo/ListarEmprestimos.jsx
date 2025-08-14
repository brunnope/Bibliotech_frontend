import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";
import DataTable from "../../components/table/table";
import PageTitle from "../../components/pageTitle/PageTitle.jsx";
import "./styles/ListarEmprestimos.css";

function ListarEmprestimos( { isAdmin } ) {
    const [emprestimos, setEmprestimos] = useState([]);
    const [nomeOuMatricula, setNomeOuMatricula] = useState("");
    const [status, setStatus] = useState("");
    const navigate = useNavigate();

    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const usuarioId = usuario?.idUsuario

    async function getEmprestimos() {
        const params = {};

        if (status) params.status = status;
        if (nomeOuMatricula) params.busca = nomeOuMatricula;

        try {
            let response;
            if (isAdmin) {
                response = await api.get("/emprestimos", { params });
            } else {
                response = await api.get(`/emprestimos/usuario/${usuarioId}`, { params });
            }
            setEmprestimos(response.data);
        } catch (error) {
            console.error("Erro ao buscar empréstimos", error);
        }
    }

    async function onExportar() {
        
        const params = {};

        if (status) params.status = status;
        if (nomeOuMatricula) params.busca = nomeOuMatricula;

        try {
            const response = await api.get("/emprestimos/exportar", {
                params,
                responseType: "arraybuffer",
            });

            if (!response.data || response.data.byteLength === 0) {
                console.warn("Nenhum empréstimo encontrado para exportação.");
                return;
            }

            const blob = new Blob([response.data], { type: "application/pdf" });
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.download = "emprestimos.pdf";

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Erro ao exportar empréstimos", error);
        }
    }

    useEffect(() => {
        getEmprestimos();
    }, []);

    return (
        <>
            <PageTitle>Listagem de Empréstimos</PageTitle>

            {/* FILTROS */}
            <div className={"filtro-emprestimo"}>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="">Todas os status</option>
                    <option value="PENDENTE">Pendente</option>
                    <option value="DEVOLVIDO">Devolvido</option>
                    <option value="ATRASADO">Atrasado</option>
                </select>

                {isAdmin && (
                    <input
                        type="text"
                        placeholder="Nome ou matrícula"
                        value={nomeOuMatricula}
                        onChange={(e) => setNomeOuMatricula(e.target.value)}
                    />
                )}

                <button onClick={getEmprestimos}>Filtrar</button>
            </div>

            {isAdmin && (
                <button id="btn-exportar" onClick={onExportar}>Exportar</button>
            )
            }


            <DataTable
                data={emprestimos.map(e => ({
                    ...e,
                    nome: e.usuario?.nome || "",
                    email: e.usuario?.email || "",
                    matricula: e.usuario?.matricula || "",
                    nomeLivro: e.exemplar?.livro?.titulo || "",
                    numExemplar: e.exemplar?.numExemplar || "",
                    editora: e.exemplar?.editora?.nome || "",
                    dataEmprestimo: e.dataEmprestimo || "",
                    dataPrevistaDevolucao: e.dataPrevistaDevolucao || "",
                    dataDevolucao: e.dataDevolucao || "",
                    status: e.status || ""
                }))}
                columns={[
                    { field: "nome", label: "Nome" },
                    { field: "email", label: "Email" },
                    { field: "matricula", label: "Matrícula" },
                    { field: "nomeLivro", label: "Livro" },
                    { field: "numExemplar", label: "Nº Exemplar" },
                    { field: "editora", label: "Editora" },
                    { field: "dataEmprestimo", label: "Data Empréstimo" },
                    { field: "dataPrevistaDevolucao", label: "Data Prevista Devolução" },
                    { field: "dataDevolucao", label: "Data Devolução" },
                    { field: "status", label: "Status" }
                ]}
                idField="idEmprestimo"
                onEdit={isAdmin ? (id) => navigate(`/editar-emprestimo/${id}`) : undefined}
                onDelete={
                    isAdmin
                        ? (id) => {
                            if (window.confirm("Tem certeza que deseja excluir?")) {
                                api.delete(`/emprestimos/${id}`).then(() =>
                                    setEmprestimos((prev) =>
                                        prev.filter((emp) => emp.idEmprestimo !== id)
                                    )
                                );
                            }
                        }
                    : undefined
                }
            />
        </>
    );
}

export default ListarEmprestimos;
