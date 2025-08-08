import React from "react";

function Mensagem({ mensagem}) {
    if (!mensagem) return null;

    const isErro = mensagem.toLowerCase().includes("erro");

    return (
        <p
            style={{
                color: isErro ? "red" : "green",
                fontWeight: "bold",
                margin: "auto",
            }}
        >
            {mensagem}
        </p>
    );
}

export default Mensagem;
