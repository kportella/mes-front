import React, {useEffect, useState} from "react";
import Sidebar from "./Sidebar.tsx";
import {useNavigate} from "react-router-dom";

interface MaintenanceOrder {
    identificacao: string;
    titulo: string;
    dataAbertura: string;
    situacao: string;
}

const ListarManutencao: React.FC = () => {

    const navigate = useNavigate();
    const [manutencoes, setManutencoes] = useState<MaintenanceOrder[]>([]);

    useEffect(() => {
        const fetchManutencao = async () => {
            const token = localStorage.getItem('token');

            try {
                const response = await fetch('http://localhost:3000/auth/getAllManutencao', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, // Send token in Authorization header
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }

                const data = await response.json();
                setManutencoes(data.users); // The users array is inside 'data.users'
            } catch (error) {
                console.log(error)
            }
        };

        fetchManutencao();
    }, []);



    const handleButtonClick = () => {
        navigate('/manutencao/registro');
    }

    const handleEditButtonClick = (id: number) => {
        navigate(`/manutencao/editar/${id}`);
    };
    
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
                            <button className="edit-button" onClick={() => handleEditButtonClick(manutencao.identificacao)}>Atualizar
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>

    )
}

export default ListarManutencao;