import React from 'react';
import {MaintenanceOrder} from "../models/MaintenanceOrder.ts";

interface MaintenanceTableProps {
    manutencoes: MaintenanceOrder[];
    onEdit: (id: number) => void;
}

const MaintenanceTable: React.FC<MaintenanceTableProps> = ({ manutencoes, onEdit }) => {
    return (
        <table className="user-table">
            <thead>
            <tr>
                <th>Identificação</th>
                <th>Título</th>
                <th>Data de Abertura</th>
                <th>Situação</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {manutencoes.map((manutencao: MaintenanceOrder) => (
                <tr key={manutencao.identificacao}>
                    <td>{manutencao.identificacao}</td>
                    <td>{manutencao.titulo}</td>
                    <td>{manutencao.dataAbertura}</td>
                    <td>{manutencao.situacao}</td>
                    <td>
                        <button
                            className="edit-button"
                            onClick={() => onEdit(Number(manutencao.identificacao))}
                        >
                            Atualizar
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default MaintenanceTable;
