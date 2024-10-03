import React, { useState, useEffect } from 'react';
import { getTechnicians } from '../../services/manutencaoService';

interface ManutencaoFormProps {
    initialFormData?: any;
    onSubmit: (formData: any) => void;
}

interface UserManutencao {
    id: number;
    name: string;
}

const defaultFormData = {
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


const ManutencaoForm: React.FC<ManutencaoFormProps> = ({ initialFormData = defaultFormData, onSubmit }) => {
    const [localFormData, setLocalFormData] = useState(initialFormData);
    const [users, setUsers] = useState<UserManutencao[] | null>([]);

    useEffect(() => {
        const fetchTechnicians = async () => {
            const technicians = await getTechnicians();
            setUsers(technicians);
        };
        fetchTechnicians();
    }, []);

    useEffect(() => {
        if (initialFormData) {
            setLocalFormData(initialFormData);  // Update local form data when the initial data is available
        }
    }, [initialFormData]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setLocalFormData((prevState: any) => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(localFormData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-section">
                <h3>Identificação</h3>
                <div className="form-group">
                    <label htmlFor="titulo">Título</label>
                    <input
                        type="text"
                        id="titulo"
                        value={localFormData.titulo}
                        onChange={handleInputChange}
                    />

                    <label htmlFor="descricao">Descrição</label>
                    <textarea
                        id="descricao"
                        value={localFormData.descricao}
                        onChange={handleInputChange}
                    ></textarea>
                </div>
            </div>

            <div className="form-section">
                <h3>Detalhes da Manutenção</h3>
                <div className="form-group">
                    <label htmlFor="tipoManutencao">Tipo de Manutenção</label>
                    <select id="tipoManutencao" value={localFormData.tipoManutencao} onChange={handleInputChange}>
                        <option>Selecione</option>
                        <option>Corretiva</option>
                        <option>Preventiva</option>
                    </select>

                    <label htmlFor="criticidade">Criticidade</label>
                    <select id="criticidade" value={localFormData.criticidade} onChange={handleInputChange}>
                        <option>Alta</option>
                        <option>Média</option>
                        <option>Baixa</option>
                    </select>

                    <label htmlFor="tecnico">Técnico Atribuído</label>
                    <select id="tecnico" value={localFormData.tecnico} onChange={handleInputChange}>
                        <option>Selecione</option>
                        {Array.isArray(users) && users.map((user: UserManutencao) => (
                            <option key={user.id} value={user.id}>{user.name}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group dates">
                    <div>
                        <label htmlFor="dataAbertura">Data Abertura</label>
                        <input type="date" id="dataAbertura" value={localFormData.dataAbertura}
                               onChange={handleInputChange}/>
                    </div>
                    <div>
                        <label htmlFor="dataFechamento">Data Fechamento</label>
                        <input type="date" id="dataFechamento" value={localFormData.dataFechamento}
                               onChange={handleInputChange}/>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="status">Status</label>
                    <select id="status" value={localFormData.status} onChange={handleInputChange}>
                        <option>Aberto</option>
                        <option>Fechado</option>
                    </select>
                </div>
            </div>

            <div className="form-section">
                <h3>Equipamento</h3>
                <div className="form-group">
                    <label htmlFor="equipamento">Nome</label>
                    <input type="text" id="equipamento" value={localFormData.equipamento} readOnly/>

                    <label htmlFor="localizacao">Localização</label>
                    <input type="text" id="localizacao" value={localFormData.localizacao} readOnly/>

                    <label htmlFor="modelo">Modelo</label>
                    <input type="text" id="modelo" value={localFormData.modelo} readOnly/>
                </div>
            </div>

            <div className="action-buttons">
                <button type="submit" className="save-btn">
                    {initialFormData.id ? 'Atualizar' : 'Registrar'}
                </button>
                <button type="button" className="cancel-btn" onClick={() => window.history.back()}>Cancelar</button>
            </div>
        </form>
    );
};

export default ManutencaoForm;
