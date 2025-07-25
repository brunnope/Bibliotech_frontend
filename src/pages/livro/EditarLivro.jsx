import { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./CadastroLivro.css";

function EditarLivro() {
    const { id } = useParams();
    const navigate = useNavigate();

    const titulo = useRef();
    const autor = useRef();
    const categoria = useRef();
    const ISBN = useRef();
    const dataCadastro = useRef();

    const hoje = new Date();
    const dataMax = hoje.toLocaleDateString('en-CA');

    useEffect(() => {
        async function fetchLivro() {
            const response = await api.get(`/livros/${id}`);
            const livro = response.data;

            titulo.current.value = livro.titulo;
            autor.current.value = livro.autor;
            categoria.current.value = livro.categoria;
            ISBN.current.value = livro.isbn;
            dataCadastro.current.value = livro.dataCadastro;
        }

        fetchLivro();
    }, [id]);

    async function atualizarLivro() {
        await api.put(`/livros/${id}`, {
            titulo: titulo.current.value,
            autor: autor.current.value,
            categoria: categoria.current.value,
            isbn: ISBN.current.value,
            dataCadastro: dataCadastro.current.value,
        });

        navigate("/");
    }

    function cancelarEdicao() {
        navigate("/");
    }

    return (
        <div className="container">
            <form>
                <h1>Editar Livro</h1>
                <input placeholder="Título" type="text" ref={titulo} />
                <input placeholder="Autor" type="text" ref={autor} />
                <input placeholder="Categoria" type="text" ref={categoria} />
                <input placeholder="ISBN" type="text" ref={ISBN} />
                <input placeholder="Data de Cadastro" type="date" ref={dataCadastro}  max={dataMax}/>

                <button type="button" onClick={atualizarLivro}>
                    Atualizar
                </button>
                <button type="button" onClick={cancelarEdicao}>
                    Cancelar
                </button>
            </form>
        </div>
    );
}

export default EditarLivro;
