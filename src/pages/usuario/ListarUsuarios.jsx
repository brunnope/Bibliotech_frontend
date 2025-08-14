import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";
import DataTable from "../../components/table/table";
import PageTitle from "../../components/pageTitle/PageTitle.jsx";

function ListarUsuarios({ isAdmin = false }) {
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();

  async function getUsuarios() {
    const endpoint = isAdmin ? "/usuarios/admins" : "/usuarios/alunos";
    const response = await api.get(endpoint);
    setUsuarios(response.data);
  }

  async function excluirUsuario(id) {
    if (isAdmin && usuarios.length === 1) {
        window.alert("Não é possível excluir o último administrador.");
        return;
    }

    if (window.confirm("Tem certeza que deseja excluir?")) {
        try {
            await api.delete(`/usuarios/${id}`);
            setUsuarios((prev) => prev.filter((u) => u.idUsuario !== id));
        } catch (error) {
            console.error("Erro ao excluir o usuário", error);
            window.alert("Erro ao excluir o usuário.");
        }
    }
  }

  useEffect(() => {
    getUsuarios();
  }, [isAdmin]);

  return (
      <>
        <PageTitle>{isAdmin ? "Listagem de Administradores" : "Listagem de Usuários"}</PageTitle>

        <DataTable
          data={usuarios}
          columns={[
            { field: "idUsuario", label: "ID" },
            { field: "nome", label: "Nome" },
            { field: "email", label: "Email" },
            { field: "matricula", label: "Matrícula" },
          ]}
          idField="idUsuario"
          onAdd={() => navigate(isAdmin ? "/cadastro-admin" : "/cadastro-usuario")}
          onEdit={(id) => navigate(isAdmin ? `/editar-admin/${id}` : `/editar-usuario/${id}`)}
          onDelete={(id) => excluirUsuario(id)}
        />
      </>
  );
}

export default ListarUsuarios;