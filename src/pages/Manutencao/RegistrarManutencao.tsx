// pages/RegistrarManutencao.tsx
import React from 'react';
import Sidebar from '../../components/Sidebar';
import ManutencaoForm from '../../components/forms/ManutencaoForm';
import { createMaintenance } from '../../services/manutencaoService.ts';
import { useNavigate } from 'react-router-dom';

const RegistrarManutencao: React.FC = () => {
    const navigate = useNavigate();

    const initialFormData = {
        titulo: '',
        descricao: '',
        tipoManutencao: 'Selecione',
        criticidade: 'Alta',
        tecnico: 'Selecione',
        dataAbertura: '',
        dataFechamento: '',
        status: 'Aberto',
        equipamento: 'Equipamento Cópias',
        localizacao: 'Setor ABC',
        modelo: 'Premium'
    };

    const handleFormSubmit = async (formData: any) => {
        try {
            await createMaintenance(formData);
            console.log('Maintenance created:', formData);
            navigate('/manutencao'); // Navigate back to maintenance list
        } catch (error) {
            console.error('Error creating maintenance:', error);
        }
    };

    return (
        <div className="main-content">
            <Sidebar />
            <h2>Manutenção - Cadastrar</h2>
            <ManutencaoForm formData={initialFormData} onSubmit={handleFormSubmit} />
        </div>
    );
};

export default RegistrarManutencao;
