import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";
import DataTable from "../../components/table/table";

function ListarEmprestimos( { isAdmin } ) {
    const [emprestimos, setEmprestimos] = useState([]);
    const navigate = useNavigate();

    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const usuarioId = usuario?.idUsuario

    async function getEmprestimos() {
        try {
            let response;
            if (isAdmin) {
                response = await api.get("/emprestimos");
            } else {
                response = await api.get(`/emprestimos/usuario/${usuarioId}`);
            }
            setEmprestimos(response.data);
        } catch (error) {
            console.error("Erro ao buscar empréstimos", error);
        }
    }

    useEffect(() => {
        getEmprestimos();
    }, []);

    return (
        <DataTable
            title="Listagem de Empréstimos"
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
    );
}

export default ListarEmprestimos;
