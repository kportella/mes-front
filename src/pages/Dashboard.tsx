import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { getUsers, getMaintenanceStatusCount } from '../services/dashboardService';
import PieChart from '../components/PieChart';

const Dashboard: React.FC = () => {
    const [activeUsersCount, setActiveUsersCount] = useState<number>(0);
    const [deactivateUserCount, setDeactivateUserCount] = useState<number>(0);
    const [manutencaoData, setManutencaoData] = useState<{ status: string; count: number }[]>([]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const users = await getUsers();
                const activeUsers = users.filter((user: { ativo: boolean }) => user.ativo);
                setActiveUsersCount(activeUsers.length);
                setDeactivateUserCount(users.length - activeUsers.length);
                
                const manutencaoStatusCounts = await getMaintenanceStatusCount();
                setManutencaoData(manutencaoStatusCounts);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        };

        fetchDashboardData();
    }, []);

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
                    <PieChart data={manutencaoData} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
