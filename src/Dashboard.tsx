import React, {useEffect, useState} from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';  // Import required components
import Sidebar from './Sidebar';

Chart.register(ArcElement, Tooltip, Legend);

const Dashboard: React.FC = () => {

    const [activeUsersCount, setActiveUsersCount] = useState<number>(0);
    const [deactivateUserCount, setdeactivateUserCount] = useState<number>(0);


    useEffect(() => {
        
        const fetchDashboard = async () => {
            try {
                const responseUsers = await fetch("http://localhost:3000/auth/getAllUsers", {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const responseManutencoes = await fetch("http://localhost:3000/auth/getAllManutencoes", {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const dataUsers = await responseUsers.json();
                const quantidadeAtivos = dataUsers.users.filter((user: { ativo: boolean }) => user.ativo);
                
                setActiveUsersCount(quantidadeAtivos.length);
                setdeactivateUserCount(dataUsers.users.length - quantidadeAtivos.length);

            } catch (error) {
                console.log(error)
            }
        }
        fetchDashboard();
    }, []);
    
    
    const data = {
        labels: ['Aberto', 'Em andamento', 'Aguardando peça', 'Fechado', 'Cancelado'],
        datasets: [
            {
                label: 'Manutenção',
                data: [4, 12, 8, 6, 7],
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                ],
            },
        ],
    };

    return (
        <div className="main-content">
            <Sidebar />
            <div className="header">
                <h2>Seja Bem-vindo!</h2>
            </div>
                <div className="widgets">
                    <div className="widget">
                        <h3>Usuários</h3>
                        <div className="equipamentos">
                            <div className="active-box">
                                <h2>{activeUsersCount}</h2>
                                <p>Ativos</p>
                            </div>
                            <div className="inactive-box">
                                <h2>{deactivateUserCount}</h2>
                                <p>Inativos</p>
                            </div>
                        </div>
                    </div>
                    <div className="widget">
                        <h3>Manutenção</h3>
                        <Pie data={data} />
                    </div>
                </div>
        </div>
    );
};

export default Dashboard;
