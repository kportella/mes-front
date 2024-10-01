import React from "react";
import Sidebar from "./Sidebar.tsx";
import {User} from "./User.ts";
import {useNavigate} from "react-router-dom";

interface MaintenanceOrder {
    identificacao: string;
    titulo: string;
    dataAbertura: string;
    situacao: string;
}

const maintenanceOrders: MaintenanceOrder[] = [
    { identificacao: '1', titulo: 'Maintenance 1', dataAbertura: '2024-09-17', situacao: 'Aberto'},
    { identificacao: '2', titulo: 'Maintenance 2', dataAbertura: '2024-08-12', situacao: 'Fechado'},
    // More orders...
];

const ListarManutencao: React.FC = () => {

    const navigate = useNavigate();
    
    const handleButtonClick = () => {
        navigate('/manutencao/registro');
    }
    
    return (
        <div className="main-content">
            <Sidebar></Sidebar>

            <div className="header">
                <h2>Manutenção</h2>
                <button onClick={handleButtonClick}>Novo</button>
            </div>

            <h2>Lista de Usuários</h2>
            <table className="user-table">
                <thead>
                <tr>
                    <th>Identificacao</th>
                    <th>Titulo</th>
                    <th>Data de Abertura</th>
                    <th>Situacao</th>
                </tr>
                </thead>
                <tbody>
                {maintenanceOrders.map((maintenanceOrder: MaintenanceOrder) => (
                    <tr key={maintenanceOrder.identificacao}>
                        <td>{maintenanceOrder.identificacao}</td>
                        <td>{maintenanceOrder.titulo}</td>
                        <td>{maintenanceOrder.dataAbertura}</td>
                        <td>{maintenanceOrder.situacao}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>

    )
}

export default ListarManutencao;