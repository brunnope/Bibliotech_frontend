import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api.js";
import Lixeira from "../../assets/lixeira.png";
import InputField from "../../components/input/InputField.jsx";
import Button from "../../components/button/Button.jsx";
import Mensagem from "../../components/mensagem/Mensagem.jsx";

function CadastroUsuario({ isPerfil = false, isAdmin = false }) {
    const { id } = useParams();
    const editar = !!id;

    const [usuario, setUsuario] = useState(null);
    const [role, setRole] = useState(null);
    const [nome, setNome] = useState("");
    const [matricula, setMatricula] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmacaoSenha, setConfirmacaoSenha] = useState("");
    const [mensagem, setMensagem] = useState("");

    const navigate = useNavigate();

    async function carregarUsuario() {
        try {
            const response = await api.get(`/usuarios/${id}`);
            const usuario = response.data;
            setUsuario(response.data);
            setNome(usuario.nome || "");
            setMatricula(usuario.matricula || "");
            setEmail(usuario.email || "");
            setSenha("");
            setConfirmacaoSenha("");
            setRole(usuario.role.role);
        } catch (error) {
            console.log(error);
            setMensagem(isAdmin ? "Erro ao carregar administrador." : "Erro ao carregar usuário.");
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const destino = isPerfil
            ? (role === "ADMINISTRADOR" ? "/admin/home" : "/usuario/home")
            : (isAdmin ? "/admins" : "/usuarios");

        if (senha !== confirmacaoSenha) {
            setMensagem("Erro! As senhas não coincidem!");
            return;
        }

        try {
            if (editar) {
                await api.put(`/usuarios/${id}`, {
                    nome,
                    matricula,
                    email,
                    senha: senha || undefined,
                });
                setMensagem("Usuário atualizado com sucesso!");

                setTimeout(() => {
                    navigate(destino);
                }, 1500);

            } else {
                await api.post("/usuarios", {
                    nome,
                    matricula,
                    email,
                    senha,
                    role: {
                        id: isAdmin ? 1 : 2,
                        role: isAdmin ? "ADMINISTRADOR" : "USER"
                    },
                });
                setMensagem("Usuário cadastrado com sucesso!");

                setTimeout(() => {
                    setMensagem("");
                }, 2000);

                limparCampos();
                getUltimoUsuario()
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setMensagem(error.response.data.message);
            }else{
                setMensagem(editar ? "Erro ao atualizar usuário." : "Erro ao cadastrar usuário.");
            }
        }
    }

    async function excluirUsuario(id) {

        if (isAdmin && id === 1) {
            window.alert("Não é possível excluir o último administrador.");
            return;
        }

        await api.delete(`/usuarios/${id}`);
        setUsuario(null);
        limparCampos();

        if (editar) {
            navigate("/usuarios");
        }
    }


    function limparCampos() {
        setNome("");
        setMatricula("");
        setEmail("");
        setSenha("");
        setConfirmacaoSenha("");
    }
    function cancelar() {
        const destino = isPerfil
            ? (role === "ADMINISTRADOR" ? "/admin/home" : "/usuario/home")
            : (isAdmin ? "/admins" : "/usuarios");

        navigate(destino);
    }

    async function getUltimoUsuario() {
        const response = await api.get("/usuarios/ultimo");
        if (response.data) {
            setUsuario(response.data);
        }
    }


    useEffect(() => {
        if (editar) {
            carregarUsuario();
        }
    }, []);

    return (
        <div className="cadastro-container">
            <form className="form-cadastro" onSubmit={handleSubmit}>
                <h1>
                    {isPerfil
                        ? "Editar Perfil"
                        : editar
                            ? isAdmin
                                ? "Editar Administrador"
                                : "Editar Usuário"
                            : isAdmin
                                ? "Cadastro de Administrador"
                                : "Cadastro de Usuário"}
                </h1>

                <InputField
                    label="Nome*"
                    name="nome"
                    type="text"
                    value={nome}
                    required={true}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Nome Completo"
                />

                <InputField
                    label="Matrícula*"
                    name="matricula"
                    type="text"
                    value={matricula}
                    required={true}
                    onChange={(e) => setMatricula(e.target.value.replace(/\D/g, ""))}
                    pattern="^\d{12}$"
                    maxLength={12}
                    inputMode="numeric"
                    placeholder="000000000000"
                    title="A matrícula deve conter exatamente 12 números."
                />

                <InputField
                    label="E-mail*"
                    name="email"
                    type="email"
                    value={email}
                    required={true}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="aaaa@gmail.com"
                />

                <InputField
                    label="Senha"
                    name="senha"
                    type="password"
                    value={senha}
                    minLength={8}
                    required={!editar}
                    onChange={(e) => setSenha(e.target.value)}
                    placeholder={editar ? "Deixe vazio para não alterar" : "Mínimo 8 caracteres"}
                />

                <InputField
                    label="Confirmação de Senha"
                    name="confirmacaoSenha"
                    type="password"
                    value={confirmacaoSenha}
                    minLength={8}
                    required={!editar}
                    onChange={(e) => setConfirmacaoSenha(e.target.value)}
                    placeholder="Repita a senha"
                />

                <Mensagem mensagem={mensagem} />

                <Button text="Salvar" type="submit" />
                <Button text="Cancelar" type="button" onClick={cancelar} />
            </form>

            {usuario && (
                <div key={usuario.idUsuario} className="card">
                    <div>
                        <p>
                            Nome: <span>{usuario.nome}</span>
                        </p>
                        <p>
                            Matrícula: <span>{usuario.matricula}</span>
                        </p>
                        <p>
                            Email: <span>{usuario.email}</span>
                        </p>
                        <p>
                            Role: <span>{usuario.role.role}</span>
                        </p>
                    </div>

                    <Button
                        type="button"
                        onClick={() => excluirUsuario(usuario.idUsuario)}
                        img={Lixeira}
                    />
                </div>
            )}
        </div>
    );
}

export default CadastroUsuario;