import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Logo from '../../assets/slogan_completa.png'; 
import api from '../../services/api';
import Button from '../../components/button/Button';
import InputField from '../../components/input/InputField';

function RedefinirSenha() {
  const [identificador, setIdentificador] = useState('');
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const resposta = await api.post('/emails/enviar', {
            identificador
      });

        setMensagem(resposta.data);
        
    } catch (erro) {
    if (erro.response && erro.response.data) {
        setMensagem(erro.response.data);
    } else {
        setMensagem("Erro ao redefinir senha.");
    }
    };
}
  return (
    <div className="login-vertical-center">
        <div className="login-container">
            <div className="login-info">
                <h2>Bem-vindo à Bibliotech!</h2>
                <img src={Logo} alt="Logo Biblitech" />
            </div>

            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Redefinir Senha</h2>

                <p id="explicacao" >Para redefinir sua senha, por favor digite o endereço de e-mail ou matrícula da sua conta</p>   

                <InputField
                    label="Email ou Matrícula"
                    type="text"
                    id="identificador"
                    value={identificador}
                    onChange={(e) => setIdentificador(e.target.value)}
                    required
                />

                {console.log(mensagem)}

                <p className={`mensagem ${mensagem.includes('sucesso') ? 'sucesso' : 'erro'}`}>
                {mensagem}
                </p>

                <Button
                    id="redefinir-senha-button"
                    type="submit" 
                    text="Redefinir Senha" 
                />

                <Button
                    type="button" 
                    text="Voltar"
                    onClick={() => navigate('/')}
                />
            </form>
        </div>
    </div>
  );
}
export default RedefinirSenha;