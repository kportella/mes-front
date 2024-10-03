import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import { getMaintenanceList } from '../../services/manutencaoService';
import MaintenanceTable from '../../components/MaintenanceTable';
import {MaintenanceOrder} from "../../models/MaintenanceOrder.ts";

const ListarManutencao: React.FC = () => {
    const navigate = useNavigate();
    const [manutencoes, setManutencoes] = useState<MaintenanceOrder[]>([]);

    useEffect(() => {
        const fetchManutencoes = async () => {
            try {
                const maintenances = await getMaintenanceList();
                const parsedArray: MaintenanceOrder[] = maintenances.map((data: any) => ({
                    identificacao: data.id.toString(),
                    titulo: data.titulo,
                    dataAbertura: data.dataAbertura,
                    situacao: data.status,
                }));
                setManutencoes(parsedArray);
            } catch (error) {
                console.error('Error fetching maintenances:', error);
            }
        };

        fetchManutencoes();
    }, []);

    const handleButtonClick = () => {
        navigate('/manutencao/registro');
    };

    const handleEditButtonClick = (id: number) => {
        navigate(`/manutencao/editar/${id}`);
    };

    return (
        <div className="main-content">
            <Sidebar />

            <div className="header">
                <h2>Manutenção</h2>
                <button onClick={handleButtonClick}>Novo</button>
            </div>

            <h2>Lista de Manutenções</h2>
            <MaintenanceTable manutencoes={manutencoes} onEdit={handleEditButtonClick} />
        </div>
    );
};

export default ListarManutencao;
