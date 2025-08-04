import "./table.css";
import Editar from "../../assets/editar.png";
import Lixeira from "../../assets/lixeira.png";

function DataTable({ title, columns, data, onEdit, onDelete, onAdd, idField = "id" }) {
  return (
    <div className="container">
      {title && <h1>{title}</h1>}
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
                    <th>Editar</th>
                    <th>Excluir</th>
                </tr>
                </thead>

                <tbody>
                {data.map((row, index) => (
                    <tr key={row.id || index}>
                    {columns.map((col, i) => (
                        <td key={i}>{row[col.field]}</td>
                    ))}
                    {(onEdit || onDelete) && (
                        <>
                            <td>
                            {onEdit && (
                                <button
                                className="editar-btn"
                                onClick={() => onEdit(row[idField])}
                                >
                                <img src={Editar} alt="Editar" />
                                </button>
                            )}
                            </td>
                            <td>
                            {onDelete && (
                                <button
                                className="excluir-btn"
                                onClick={() => onDelete(row[idField])}
                                >
                                <img src={Lixeira} alt="Excluir" />
                                </button>
                            )}
                            </td>
                        </>
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
