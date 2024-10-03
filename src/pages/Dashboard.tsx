import React, {useEffect, useState} from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';  // Import required components
import ChartDataLabels from 'chartjs-plugin-datalabels';  // Import the DataLabels plugin
import Sidebar from '../components/Sidebar.tsx';

Chart.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const Dashboard: React.FC = () => {

    const [activeUsersCount, setActiveUsersCount] = useState<number>(0);
    const [deactivateUserCount, setdeactivateUserCount] = useState<number>(0);
    const [manutencaoData, setManutencaoData] = useState<{ status: string; count: number }[]>([]);


    useEffect(() => {
        
        const fetchDashboard = async () => {
            try {
                const responseUsers = await fetch("http://localhost:3000/auth/getAllUsers", {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const responseManutencoes = await fetch("http://localhost:3000/maintenance/countStatus", {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const dataManutencoes = await responseManutencoes.json();
                setManutencaoData(dataManutencoes);

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
    
    
    // const data = {
    //     labels: manutencaoData.map(item => item.status),
    //     datasets: [
    //         {
    //             label: 'Manutenção',
    //             data: manutencaoData.map(item => item.count),
    //             backgroundColor: [
    //                 '#FF6384',
    //                 '#36A2EB',
    //                 '#FFCE56',
    //                 '#4BC0C0',
    //                 '#9966FF',
    //             ],
    //             hoverBackgroundColor: [
    //                 '#FF6384',
    //                 '#36A2EB',
    //                 '#FFCE56',
    //                 '#4BC0C0',
    //                 '#9966FF',
    //             ],
    //         },
    //     ],
    // };

    const pieChartData = {
        labels: manutencaoData.map(item => item.status),  // Extract status labels
        datasets: [
            {
                label: 'Manutenção Status',
                data: manutencaoData.map(item => item.count),  // Extract counts for each status
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
            },
        ],
    };

    // Chart options with DataLabels to show counts inside the pie chart
    const pieChartOptions = {
        plugins: {
            datalabels: {
                color: '#000', // Text color
                font: {
                    size: 36, // Font size for the labels
                    weight: 'bold'
                },
                formatter: (value: number) => value,  // Show the count value
            },
        },
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
                        <Pie data={pieChartData} options={pieChartOptions} />
                    </div>
                </div>
        </div>
    );
};

export default Dashboard;
