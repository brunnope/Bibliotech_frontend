import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api.js";
import InputField from "../../components/input/InputField.jsx";
import Button from "../../components/button/Button.jsx";
import "./styles/EditarEmprestimo.css";
import Mensagem from "../../components/mensagem/Mensagem.jsx";

function EditarEmprestimo() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [emprestimo, setEmprestimo] = useState(null);

    const [dataEmprestimo, setDataEmprestimo] = useState("");
    const [dataPrevistaDevolucao, setDataPrevistaDevolucao] = useState("");
    const [dataDevolucao, setDataDevolucao] = useState("");
    const [status, setStatus] = useState("");
    const [exemplarId, setExemplarId] = useState("");
    const [usuarioId, setUsuarioId] = useState("");
    const [mensagem, setMensagem] = useState("");


    const hoje = new Date().toLocaleDateString("en-CA");

    async function carregarEmprestimo() {
        const response = await api.get(`/emprestimos/${id}`);
        const emp = response.data;
        setEmprestimo(emp);
        setDataEmprestimo(emp.dataEmprestimo || "");
        setDataPrevistaDevolucao(emp.dataPrevistaDevolucao || "");
        setDataDevolucao(emp.dataDevolucao || "");
        setStatus(emp.status || "");
        setExemplarId(emp.exemplar?.idExemplar || "");
        setUsuarioId(emp.usuario?.idUsuario || "");
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (dataPrevistaDevolucao <= dataEmprestimo){
            setMensagem("Erro! Data de previsão deve ser maior que data de empréstimo!")
        } else if (dataDevolucao <= dataEmprestimo && status === "DEVOLVIDO" || dataDevolucao <= dataEmprestimo ){
            setMensagem("Erro! Data de devolução deve ser maior que data de empréstimo!")
        }else{
            await api.put(`/emprestimos/${id}`, {
                dataEmprestimo,
                dataPrevistaDevolucao,
                dataDevolucao,
                status,
                exemplar: { idExemplar: exemplarId },
                usuario: { idUsuario: usuarioId }
            });

            setMensagem("Empréstimo atualizado com sucesso!");
            setTimeout(() => {
                navigate("/emprestimos")
            }, 1500);
        }

    }

    function cancelar() {
        navigate("/emprestimos");
    }

    useEffect(() => {
        carregarEmprestimo();
    }, []);

    return (
        <div className="cadastro-container">
            {emprestimo && (
                <form className="form-cadastro" onSubmit={handleSubmit}>
                    <h1>Editar Empréstimo</h1>

                    <InputField
                        label="Data do Empréstimo*"
                        name="dataEmprestimo"
                        type="date"
                        value={dataEmprestimo}
                        max={hoje}
                        required={true}
                        onChange={(e) => setDataEmprestimo(e.target.value)}
                    />

                    <InputField
                        label="Data Prevista de Devolução*"
                        name="dataPrevistaDevolucao"
                        type="date"
                        value={dataPrevistaDevolucao}
                        required={true}
                        onChange={(e) => setDataPrevistaDevolucao(e.target.value)}
                    />

                    <InputField
                        label="Data de Devolução*"
                        name="dataDevolucao"
                        type="date"
                        value={dataDevolucao}
                        onChange={(e) => setDataDevolucao(e.target.value)}
                    />

                    <div className={"radio-group"}>
                        <label id={"label-radio"}>Status*</label>
                        <div className="opcoes">
                            <label>
                                <input
                                    type="radio"
                                    name="status"
                                    value="PENDENTE"
                                    checked={status === "PENDENTE"}
                                    onChange={(e) => setStatus(e.target.value)}
                                />
                                Pendente
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="status"
                                    value="DEVOLVIDO"
                                    checked={status === "DEVOLVIDO"}
                                    onChange={(e) => setStatus(e.target.value)}
                                />
                                Devolvido
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="status"
                                    value="ATRASADO"
                                    checked={status === "ATRASADO"}
                                    onChange={(e) => setStatus(e.target.value)}
                                />
                                Atrasado
                            </label>
                        </div>
                    </div>


                    <InputField
                        label="Número Exemplar*"
                        name="exemplar"
                        placeholder="Número do exemplar"
                        type={"Number"}
                        value={exemplarId}
                        required={true}
                        min={1}
                        onChange={(e) => setExemplarId(e.target.value)}
                    />

                    <InputField
                        label="Id Usuário*"
                        name="usuario"
                        type={"Number"}
                        placeholder="Id do usuário"
                        value={usuarioId}
                        required={true}
                        min={1}
                        onChange={(e) => setUsuarioId(e.target.value)}
                    />

                    <Mensagem mensagem={mensagem} />

                    <Button text="Salvar" type="submit" />
                    <Button text="Cancelar" type="button" onClick={cancelar} />
                </form>
            )}
        </div>
    );
}

export default EditarEmprestimo;
