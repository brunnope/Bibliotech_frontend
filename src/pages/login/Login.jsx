import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import Logo from "../../assets/slogan_completa.png";;
import Button from "../../components/button/Button";
import InputField from "../../components/input/InputField";
import "./Login.css"

function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();

        try {
        const response = await api.get("/usuarios");
        const usuario = response.data.find(u => u.email === email && u.senha === senha);

        if (!usuario) {
            alert("Email ou senha incorretos.");
            return;
        }

        localStorage.setItem("usuario", JSON.stringify(usuario));

        console.log(usuario.roles[0].role);

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
                    <img src={Logo} alt="" />
                </div>
                <div className="login-form">
                    <h3>Login</h3>
                    <form onSubmit={handleLogin}>
                        <InputField
                            label={"Email"}
                            name={"email"}
                            type="email"
                            value={email}
                            required={true}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <InputField
                            label={"Senha"}
                            name={"senha"}
                            type="password"
                            value={senha}
                            required={true}
                            maxLength={150}
                            onChange={(e) => {setSenha(e.target.value)}}
                        />

                        <Button 
                            text="Entrar" 
                            type="submit"
                        /> 
                        
                        <a href="#">Não possui uma conta?</a>
                        <a id='redefinir' href="#">Redefenir senha</a>
                    </form>
                    
                </div>
            </div>
        </div>
    );
}

export default Login;
