import React from 'react';
import { User } from '../models/User';

interface UserTableProps {
    users: User[];
    onEdit: (id: number) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onEdit }) => {
    return (
        <table className="user-table">
            <thead>
            <tr>
                <th>Nome</th>
                <th>Matricula</th>
                <th>Email</th>
                <th>Perfil</th>
                <th>Status</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {Array.isArray(users) &&
                users.map((user: User) => (
                    <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.id}</td>
                        <td>{user.email}</td>
                        <td>{user.perfil}</td>
                        <td>{user.ativo ? 'Ativo' : 'Desativado'}</td>
                        <td>
                            <button className="edit-button" onClick={() => onEdit(user.id)}>
                                Atualizar
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default UserTable;
