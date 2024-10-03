import React, { useState, useEffect } from 'react';

interface UserFormProps {
    onSubmit: (formData: any) => void;
    initialFormData?: {      // Optional prop to handle edit case
        name: string;
        email: string;
        password: string;
        perfil: string;
        ativo: string;
    };
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit, initialFormData }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: 'password',
        perfil: 'Técnico de Manutenção',
        ativo: '',
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
    });

    const roles = ['Técnico de Manutenção', 'Administrador', 'Financeiro', 'Backoffice'];

    useEffect(() => {
        // Populate the form with initial values if it's in edit mode
        if (initialFormData) {
            setFormData(initialFormData);
        }
    }, [initialFormData]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const newErrors = { name: '', email: '' };

        if (!formData.name) newErrors.name = 'Nome é obrigatório.';
        if (!formData.email) newErrors.email = 'Email é obrigatório.';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email é inválido.';

        setErrors(newErrors);
        return Object.values(newErrors).every((error) => !error);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit(formData); // Call the onSubmit function passed as a prop
        }
    };

    return (
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
                <select id="perfil" name="perfil" value={formData.perfil} onChange={handleInputChange}>
                    {roles.map((role, index) => (
                        <option key={index} value={role}>
                            {role}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="ativo">Ativo</label>
                <select id="ativo" name="ativo" value={formData.ativo} onChange={handleInputChange}>
                    <option value="" disabled>
                        Selecione
                    </option>
                    <option value="true">Sim</option>
                    <option value="false">Não</option>
                </select>
            </div>

            <div className="form-actions">
                <button type="submit" className="save-btn">
                    {initialFormData ? 'Atualizar' : 'Registrar'} {/* Change button text based on mode */}
                </button>
            </div>
        </form>
    );
};

export default UserForm;
