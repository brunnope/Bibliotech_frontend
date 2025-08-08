import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import api from "../../services/api.js";
import InputField from "../../components/input/InputField.jsx";
import Button from "../../components/button/Button.jsx";
import Mensagem from "../../components/mensagem/Mensagem.jsx";


function Perfil() {
    const [usuario, setUsuario] = useState(null);
    const [role, setRole] = useState(null);

    const navigate = useNavigate();

    const [nome, setNome] = useState("");
    const [matricula, setMatricula] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmacaoSenha, setConfirmacaoSenha] = useState("");
    const [mensagem, setMensagem] = useState("");


    async function carregarUsuario(idUsuario) {
        try {
            const response = await api.get(`/usuarios/${idUsuario}`);
            const user = response.data;
            setNome(user.nome || "");
            setMatricula(user.matricula || "");
            setEmail(user.email || "");
            setSenha("");
            setConfirmacaoSenha("");
        } catch (error) {
            console.log(error.message);
            setMensagem("Erro ao carregar usuário.");
        }
    }



    async function handleSubmit(e) {
        e.preventDefault();

        if (senha !== confirmacaoSenha) {
            setMensagem("Erro! As senhas não coincidem!");
            return;
        }

        try {
            await api.put(`/usuarios/${usuario.idUsuario}`, {
                nome,
                matricula,
                email,
                senha: senha || undefined,
            });

            setMensagem("Usuário atualizado com sucesso!");
            setTimeout(() => {
                if (role === "ADMINISTRADOR") {
                    navigate("/admin/home");
                } else {
                    navigate("/usuario/home");
                }
            }, 1500);
        } catch (error) {
            setMensagem("Erro ao atualizar usuário.");
        }
    }


    function cancelar() {
        if (role === "ADMINISTRADOR"){
            navigate("/admin/home")
        }else{
            navigate("/usuario/home")
        }
    }

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("usuario"));
        if (userData) {
            setUsuario(userData);
            setRole(userData.role.role);
            carregarUsuario(userData.idUsuario);
        }
    }, []);


    return (
        <div className="cadastro-container">
            <form className="form-cadastro" onSubmit={handleSubmit}>
                <h1>Editar Usuário</h1>

                <InputField
                    label="Nome*"
                    name="nome"
                    type="text"
                    value={nome}
                    required={true}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder={"Nome Completo"}
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
                    placeholder={"000000000000"}
                    title="A matrícula deve conter exatamente 12 números."
                />
                <InputField
                    label="E-mail*"
                    name="email"
                    type="email"
                    value={email}
                    required={true}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={"aaaa@gmail.com"}
                />
                <InputField
                    label="Senha"
                    name="senha"
                    type="password"
                    value={senha}
                    minLength={8}
                    onChange={(e) => setSenha(e.target.value)}
                    placeholder={"Mínimo 8 caracteres (deixe vazio para não alterar)"}
                />
                <InputField
                    label="Confirmação de Senha"
                    name="confirmacaoSenha"
                    type="password"
                    value={confirmacaoSenha}
                    minLength={8}
                    onChange={(e) => setConfirmacaoSenha(e.target.value)}
                    placeholder={"Repita a senha"}
                />

                <Mensagem mensagem={mensagem} />

                <Button text="Salvar" type="submit" />
                <Button text="Cancelar" type="button" onClick={cancelar} />

            </form>
        </div>
    );
}

export default Perfil;