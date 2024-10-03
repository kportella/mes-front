import React from 'react';
import Sidebar from '../../components/Sidebar.tsx';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/userService.ts';
import UserForm from '../../components/forms/UserForm.tsx';

const RegistrarUsuario: React.FC = () => {
    const navigate = useNavigate();

    const handleUserSubmit = async (formData: any) => {
        try {
            const response = await registerUser(formData);
            console.log('Usuário Cadastrado:', response.data);
            navigate('/usuario'); // Redirect after successful registration
        } catch (error) {
            console.error('Erro ao registrar usuário:', error);
        }
    };

    return (
        <div>
            <Sidebar />
            <div className="register-container">
                <h2>Registro de Usuario</h2>
                <UserForm onSubmit={handleUserSubmit} />
            </div>
        </div>
    );
};

export default RegistrarUsuario;
