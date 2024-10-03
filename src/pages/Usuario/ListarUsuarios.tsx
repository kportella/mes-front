import React, { useEffect, useState } from 'react';
import { User } from '../../models/User.ts';
import Sidebar from '../../components/Sidebar.tsx';
import { useNavigate } from 'react-router-dom';
import { getAllUsers } from '../../services/userService.ts';
import UserTable from '../../components/UserTable.tsx';

const ListarUsuarios: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            const token = localStorage.getItem('token');
            

            try {
                const data = await getAllUsers();
                setUsers(data.users);
                setLoading(false);
            } catch (error) {
                setError('Error fetching users');
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleButtonClick = () => {
        navigate('/usuario/registro');
    };

    const handleEditButtonClick = (id: number) => {
        navigate(`/usuario/editar/${id}`);
    };

    if (loading) {
        return <div>Loading users...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="main-content">
            <Sidebar />
            <div className="header">
                <h2>Usuários</h2>
                <button onClick={handleButtonClick}>Novo</button>
            </div>

            <h2>Lista de Usuários</h2>
            <UserTable users={users} onEdit={handleEditButtonClick} />  {/* Pass props */}
        </div>
    );
};

export default ListarUsuarios;
