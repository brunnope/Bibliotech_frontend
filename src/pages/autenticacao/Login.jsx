import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import Logo from "../../assets/slogan_completa.png";;
import Button from "../../components/button/Button";
import InputField from "../../components/input/InputField";
import "./Auth.css"

function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [mensagem, setMensagem] = useState('');
    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();

        try {
        const response = await api.get("/usuarios");
        const usuario = response.data.find(u => u.email === email && u.senha === senha);

        if (!usuario) {
            setMensagem("E-mail ou senha incorretos!");
            return;
        }

        localStorage.setItem("usuario", JSON.stringify(usuario));


        if (usuario.roles[0].role === "ADMINISTRADOR") {
            navigate("/admin/home");
        } else if (usuario.roles[0].role === "USER") {
            navigate("/usuario/home");
        }
        } catch (error) {
        console.error("Erro ao simular login:", error);
        alert("Erro ao realizar login.");
        }
    };

    return (
        <div className="login-vertical-center">
            <div className="login-container">
                <div className="login-info">
                    <h2>Bem-vindo à Bibliotech!</h2>
                    <img src={Logo} alt="Logo Bibliotech" />
                </div>
                <div className="login-form">
                    <h3>Login</h3>
                    <form onSubmit={handleLogin}>
                        <InputField
                            label={"E-mail"}
                            name={"email"}
                            type="email"
                            value={email}
                            required={true}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="E-mail"
                        />

                        <InputField
                            label={"Senha"}
                            name={"senha"}
                            type="password"
                            value={senha}
                            required={true}
                            maxLength={150}
                            onChange={(e) => {setSenha(e.target.value)}}
                            placeholder={"Senha"}
                        />

                        {mensagem && (
                            <p id='mensagem-login'>
                                {mensagem}
                            </p>
                        )}

                        <Button 
                            text="Entrar" 
                            type="submit"
                        /> 
                        
                        <a onClick={() => navigate('/cadastro-usuario')}>Não possui uma conta?</a>
                        <a onClick={() => navigate('/redefinir-senha')}>Redefenir senha</a>
                    </form>
                    
                </div>
            </div>
        </div>
    );
}

export default Login;
