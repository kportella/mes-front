import React, {useEffect, useState} from 'react';
import Sidebar from "./Sidebar.tsx";
import {useNavigate, useParams} from "react-router-dom";
import * as axios from "axios";
import {User} from "./User.ts";

const EditarUsuario: React.FC = () => {

    const { id } = useParams<{ id: number }>(); // Get the user ID from the URL
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null); // Initialize user state
    const [loading, setLoading] = useState<boolean>(true); // To handle loading state
    const [error, setError] = useState<string | null>(null); // To handle error state
    const [formData, setFormData] = useState({
        id: 0,
        name: '',
        email: '',
        perfil: 'Técnico de Manutenção',
        ativo: false
    });
    const [errors, setErrors] = useState({
        name: '',
        email: '',
    });

    useEffect(() => {
        const fetchUserData = async () => {
                try {
                    const response = await fetch('http://localhost:3000/auth/getAllUsers', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    });
                    const data = await response.json();
                    const user = data.users.find(user => user.id == id);
                    console.log(user)
                    setUser(user);
                    setFormData({
                        id: id,
                        name: user.name,
                        email: user.email,
                        perfil: user.perfil || '',
                        ativo: user.ativo,
                    });
                    setLoading(false);
                }
                    catch(error) {
                        setError('Failed to fetch user data.' + error);
                        setLoading(false);
                    }
            };
        fetchUserData()
    }, [id]);
    
    const roles = ['Técnico de Manutenção', 'Administrador', 'Financeiro', 'Backoffice'];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        
        if (name === 'ativo') 
            setFormData({...formData, [name]: value === "true"});
        else
            setFormData({ ...formData, [name]: value });
    };

    if (loading) {
        return <div>Loading users...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const validateForm = () => {
        const newErrors = { name: '', email: '', matricula: '', congelar: '' };

        if (!formData.name) newErrors.name = 'Nome é obrigatório.';
        if (!formData.email) newErrors.email = 'Email é obrigatório.';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email é inválido.';

        setErrors(newErrors);
        return Object.values(newErrors).every(error => !error);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            console.log(formData);
            axios.default.post('http://localhost:3000/auth/updateUser', formData)
                .then(response => {
                    console.log('Usuário Atualizado:', response.data);
                    navigate('/usuario')
                })
                .catch((error) => {console.error('Erro ao cadastrar usuário:', error);});
        }
    };

    return (

        <div>
            <Sidebar />
            <div className="register-container">
                <h2>Registro de Usuario</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Nome</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                        {errors.name && <p className="error">{errors.name}</p>}
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
                            value={formData.ativo.toString()}
                            onChange={handleInputChange}>
                            <option value="" disabled selected>Selecione</option>
                            <option value="true">Sim</option>
                            <option value="false">Não</option>
                        </select>
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="save-btn">Atualizar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditarUsuario;
