import React, { useState } from 'react';
import Sidebar from "./Sidebar.tsx";
import {useNavigate} from "react-router-dom";

const Usuario: React.FC = () => {
    
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        perfil: 'Técnico de Manutenção',
        ativo: ''
    });
    
    const [errors, setErrors] = useState({
        nome: '',
        email: '',
    });

    const roles = ['Técnico de Manutenção', 'Administrador', 'Financeiro', 'Backoffice'];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const validateForm = () => {
        const newErrors = { nome: '', email: '', matricula: '', congelar: '' };

        if (!formData.nome) newErrors.nome = 'Nome é obrigatório.';
        if (!formData.email) newErrors.email = 'Email é obrigatório.';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email é inválido.';
        
        setErrors(newErrors);
        return Object.values(newErrors).every(error => !error);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Usuário Cadastrado:', formData);
            // Add registration logic here (e.g., API call)
        }
        
        navigate('/usuario')
    };

    return (
        
        <div>
        <Sidebar />
        <div className="register-container">
            <h2>Registro de Usuario</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="nome">Nome</label>
                    <input
                        type="text"
                        id="nome"
                        name="nome"
                        value={formData.nome}
                        onChange={handleInputChange}
                    />
                    {errors.nome && <p className="error">{errors.nome}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="perfil">Perfil</label>
                    <select
                        id="perfil"
                        name="perfil"
                        value={formData.perfil}
                        onChange={handleInputChange}
                    >
                        {roles.map((role, index) => (
                            <option key={index} value={role}>
                                {role}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="ativo">Ativo</label>
                    <select 
                        id="ativo"
                        name="ativo"
                        value={formData.ativo}
                        onChange={handleInputChange}>
                        <option value="" disabled selected>Selecione</option>
                        <option value="true">Sim</option>
                        <option value="false">Não</option>
                    </select>
                </div>

                <div className="form-actions">
                    <button type="submit" className="save-btn">Registrar</button>
                </div>
            </form>
        </div>
        </div>
    );
};

export default Usuario;
