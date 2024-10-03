import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import ManutencaoForm from '../../components/forms/ManutencaoForm';
import { getMaintenanceById, updateMaintenance } from '../../services/manutencaoService';
import { useNavigate, useParams } from 'react-router-dom';

const EditarManutencao: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [initialFormData, setInitialFormData] = useState<any>(null);

    useEffect(() => {
        const fetchMaintenance = async () => {
            const manutencao = await getMaintenanceById(Number(id));
            setInitialFormData({
                id: manutencao.id,
                titulo: manutencao.titulo,
                descricao: manutencao.descricao,
                tipoManutencao: manutencao.tipoManutencao,
                criticidade: manutencao.criticidade,
                tecnico: manutencao.tecnico.id,
                dataAbertura: manutencao.dataAbertura,
                dataFechamento: manutencao.dataFechamento,
                status: manutencao.status,
                equipamento: manutencao.equipamento,
                localizacao: manutencao.localizacao,
                modelo: manutencao.modelo,
            });
        };

        fetchMaintenance();
    }, [id]);

    const handleFormSubmit = async (formData: any) => {
        try {
            await updateMaintenance(formData);
            console.log('Manutenção atualizada');
            navigate('/manutencao');
        } catch (error) {
            console.error('Erro ao atualizar manutenção:', error);
        }
    };

    return (
        <div className="main-content">
            <Sidebar />
            <h2>Manutenção - Atualizar</h2>
            {initialFormData && (
                <ManutencaoForm initialFormData={initialFormData} onSubmit={handleFormSubmit} />
            )}
        </div>
    );
};

export default EditarManutencao;
