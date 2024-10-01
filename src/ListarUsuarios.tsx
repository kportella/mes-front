import React, {useState} from 'react';
import { User } from '../src/User';
import {prevUsers} from '../src/MockData.ts';
import Sidebar from "./Sidebar.tsx";

const ListarUsuarios: React.FC = () => {

    const [users, setUsers] = useState(prevUsers);


    const handleStatusToggle = (matricula: string) => {
        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user.matricula === matricula ? { ...user, ativo: !user.ativo } : user
            )
        );
    };

    return (
        <div className="main-content">
            <Sidebar></Sidebar>

            <div className="header">
                <h2>Usuários</h2>
                <button>Novo</button>
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
                {users.map((user: User) => (
                    <tr key={user.matricula}>
                        <td>{user.nome}</td>
                        <td>{user.matricula}</td>
                        <td>{user.email}</td>
                        <td>{user.perfil}</td>
                        <label className="switch">
                            <input
                                type="checkbox"
                                checked={user.ativo}
                                onChange={() => handleStatusToggle(user.matricula)}
                            />
                            <span className="slider"></span>
                        </label>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListarUsuarios;
