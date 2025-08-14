import "./table.css";
import Editar from "../../assets/editar.png";
import Lixeira from "../../assets/lixeira.png";
import Visualizar from "../../assets/visualizar.png";
import Emprestimo from "../../assets/emprestimo.png";

function DataTable({columns, data, onEdit, onDelete, onAdd, onEmprestimo,actions, idField = "id" }) {
    return (
        <div className="container-table">
            {onAdd && (
                <button className="cadastro-btn" onClick={onAdd}>
                    Cadastrar
                </button>
            )}
            <div className="table-responsive">
                <table className="data-table">
                    <thead>
                    <tr>
                        {columns.map((col, index) => (
                            <th key={index}>{col.label}</th>
                        ))}
                        {actions && (
                          <>
                            <th>Capa</th>
                            <th>Contracapa</th>
                          </>
                        )}
                        {onEdit && <th>Editar</th>}
                        {onDelete && <th>Excluir</th>}
                        {onEmprestimo && <th>Ler</th>}
                    </tr>
                    </thead>

                    <tbody>
                    {data.map((row, index) => (
                        <tr key={row.id || index}>
                            {columns.map((col, i) => {
                                const value = col.field.split(".").reduce((obj, field) => obj?.[field], row);

                                if (col.field === "disponibilidade") {
                                    return (
                                        <td
                                            key={i}
                                            style={{
                                                color: value === "DISPONIVEL" ? "green" : "red",
                                                fontWeight: "bold"
                                            }}
                                        >
                                            {value}
                                        </td>
                                    );
                                }

                                if (col.field === "status"){
                                    return (
                                        <td
                                            key={i} 
                                            style={{
                                                color: value === "DEVOLVIDO" ? "green" :
                                                        value === "PENDENTE" ? "black" :
                                                        "red",
                                                fontWeight: "bold"
                                                }}
                                        >
                                            {value}
                                        </td>
                                    );
                                }

                                return <td key={i}>{value}</td>;
                            })}
                            {actions && (
                                actions.map((action, idx) => (
                                    <td>
                                    <button
                                        key={idx}
                                        className="visualizar-btn"
                                        onClick={() => action.action(row)}
                                    >
                                        <img src={Visualizar} alt={action.label} title={action.label} />
                                    </button>
                                    </td>
                                ))
                            )}
                            {onEdit && (
                                <td>
                                    <button
                                        className="editar-btn"
                                        onClick={() => onEdit(row[idField])}
                                    >
                                        <img src={Editar} alt="Editar" />
                                    </button>
                                </td>
                            )}
                            {onDelete && (
                                <td>
                                    <button
                                        className="excluir-btn"
                                        onClick={() => onDelete(row[idField])}
                                    >
                                        <img src={Lixeira} alt="Excluir" />
                                    </button>
                                </td>
                            )}

                            {onEmprestimo && (
                                <td>
                                    <button
                                        className="emprestar-btn"
                                        onClick={() => onEmprestimo(row[idField])}
                                    >
                                        <img src={Emprestimo} alt="Emprestar" />
                                    </button>
                                </td>
                            )}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default DataTable;