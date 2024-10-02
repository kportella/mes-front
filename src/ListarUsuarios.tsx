import React, {useEffect, useState} from 'react';
import { User } from '../src/User';
import Sidebar from "./Sidebar.tsx";
import {useNavigate} from "react-router-dom";

const ListarUsuarios: React.FC = () => {

    const [users, setUsers] = useState<User[]>([]); // Initialize as an empty array
    const [loading, setLoading] = useState<boolean>(true); // To handle loading state
    const [error, setError] = useState<string | null>(null); // To handle error state
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            const token = localStorage.getItem('token');

            try {
                const response = await fetch('http://localhost:3000/auth/getAllUsers', {
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
                setUsers(data.users); // The users array is inside 'data.users'
                setLoading(false);
            } catch (error) {
                setError('Error fetching users');
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);


        const handleStatusToggle = (id: number) => {
        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user.id === id ? { ...user, ativo: !user.ativo } : user
            )
        );
    };
    
    const handleButtonClick = () => {
        navigate('/usuario/registro');
    }

    if (loading) {
        return <div>Loading users...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }


    return (
        <div className="main-content">
            <Sidebar></Sidebar>

            <div className="header">
                <h2>Usuários</h2>
                <button onClick={handleButtonClick}>Novo</button>
            </div>

            <h2>Lista de Usuários</h2>
            <table className="user-table">
                <thead>
                <tr>
                    <th>Nome</th>
                    <th>Matricula</th>
                    <th>Email</th>
                    <th>Perfil</th>
                    <th>Ativo</th>
                </tr>
                </thead>
                <tbody>
                {Array.isArray(users) && users.map((user: User) => (
                    <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.id}</td>
                        <td>{user.email}</td>
                        <td>{user.perfil}</td>
                        <td>
                        <label className="switch">
                            <input
                                type="checkbox"
                                checked={user.ativo}
                                onChange={() => handleStatusToggle(user.id)}
                            />
                            <span className="slider"></span>
                        </label>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListarUsuarios;
