// pages/ListarUsuarios.tsx
import React, { useEffect, useState } from 'react';
import { User } from '../../models/User.ts';
import Sidebar from '../../components/Sidebar.tsx';
import { useNavigate } from 'react-router-dom';
import { getAllUsers } from '../../services/userService.ts';
import UserTable from '../../components/UserTable.tsx';  // Import the new UserTable component

const ListarUsuarios: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]); // Initialize as an empty array
    const [loading, setLoading] = useState<boolean>(true); // To handle loading state
    const [error, setError] = useState<string | null>(null); // To handle error state
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            const token = localStorage.getItem('token');

            // if (!token) {
            //     setError('No authentication token found');
            //     setLoading(false);
            //     return;
            // }

            try {
                const data = await getAllUsers(); // Use service to get data
                setUsers(data.users); // The users array is inside 'data.users'
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
