import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import Logo from "../../assets/slogan_completa.png";
import Button from "../../components/button/Button";
import InputField from "../../components/input/InputField";
import "./Auth.css";

function CadastroUsuarioLogin() {
  const [nome, setNome] = useState("");
  const [matricula, setMatricula] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmacaoSenha, setConfirmacaoSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [primeiroAcesso, setPrimeiroAcesso] = useState(true);
  const navigate = useNavigate();
  const [id, setId] = useState(0);
  const [role, setRole] = useState("");

  async function handleCadastro(e) {
    e.preventDefault();

      if (senha !== confirmacaoSenha) {
        setMensagem("As senhas não coincidem!");
        return;
    }

    try {
        await api.post("/usuarios", {
            nome,
            matricula,
            email,
            senha,
            role: {
                id: id,
                role: role
            }
        });

        setMensagem("Usuário cadastrado com sucesso!");
        setTimeout(() => {
        navigate("/");
        }, 2000);
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
            setMensagem(error.response.data.message);
        }else{
            setMensagem("Erro ao cadastrar usuário.");
        }
    }
  }

    async function obterPrimeiroUser() {
        try {
            await api.get("/usuarios/1");

            setPrimeiroAcesso(false);
            setRole("USER");
            setId(2);
        } catch (error) {

            setPrimeiroAcesso(true);
            setRole("ADMINISTRADOR");
            setId(1);
        }
    }


    useEffect(() => {
        obterPrimeiroUser();
    }, []);

  return (
    <div className="login-vertical-center">
      <div className="login-container">
        <div className="login-info">
          <h2>Bem-vindo à Bibliotech!</h2>
          <img src={Logo} alt="Logo Bibliotech" />
        </div>
        <div className="login-form">
          <h3>
            {primeiroAcesso ? "Cadastro de Administrador" : "Cadastro de Usuário"}
          </h3>
          <form onSubmit={handleCadastro}>
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
              label="Senha*"
              name="senha"
              type="password"
              value={senha}
              required={true}
              onChange={(e) => setSenha(e.target.value)}
              minLength={8}
              placeholder={"Mínimo 8 caracteres"}
            />
            <InputField
              label="Confirmação de Senha*"
              name="confirmacaoSenha"
              type="password"
              value={confirmacaoSenha}
              required={true}
              onChange={(e) => setConfirmacaoSenha(e.target.value)}
              minLength={8}
              placeholder={"Repita a senha"}
            />

            {mensagem && (
              <p
                id="mensagem-login"
                style={mensagem.includes('sucesso') ? { color: "#2ecc40" } : {}}
              >
                {mensagem}
              </p>
            )}

            <Button
              text="Cadastrar"
              type="submit"
            />

            <a
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
              }}
            >
              Já possui uma conta?
            </a>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CadastroUsuarioLogin;