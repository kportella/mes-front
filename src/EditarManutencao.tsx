import React, {useEffect, useState} from 'react';
import Sidebar from "./Sidebar.tsx";
import {useNavigate, useParams} from "react-router-dom";

interface UserManutencao {
    id: number;
    name: string;
}

const EditarManutencao: React.FC = () => {

    const navigate = useNavigate();
    
    const id = useParams()

    const [formData, setFormData] = useState({
        id: id, 
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
    });

    const [users, setUsers] = useState<UserManutencao[] | null>([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const responseUsuarios = await fetch("http://localhost:3000/auth/getUsersManutencao", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                const data = await responseUsuarios.json();
                console.log(data)
                setUsers([{id: 1, name: 'Kaue'}, {id: 2, name: 'Guilherme'}]);

                const responseManutencao = await fetch(`http://localhost:3000/auth/getManutencao/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                const dataManutencao = await responseManutencao.json();
                const manutencao = dataManutencao.manutencao;
                console.log(dataManutencao)
                setFormData({
                    id : id, 
                    titulo: manutencao.titulo,
                    descricao: manutencao.descricao,
                    tipoManutencao: manutencao.tipoManutencao,
                    criticidade: manutencao.criticidade,
                    tecnico: data.select(x => x.id == manutencao.tecnico).name,
                    dataAbertura: manutencao.dataAbertura,
                    dataFechamento: manutencao.dataFechamento,
                    status: manutencao.status,
                    equipamento: manutencao.equipamento,
                    localizacao: manutencao.localizacao,
                    modelo: manutencao.modelo
                })
            }
            catch (error) {
                console.log(error);
            }
        };
        fetchUserData();
    }, [id]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };


    const handleButtonSalvarClick = async (e: React.FormEvent) => {
        e.preventDefault();

        try{
            const response = await fetch("http://localhost:3000/atualizarManutencao", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            console.log(data)
        }
        catch (error) {console.log(error)}

        console.log('Form Data:', formData);
        navigate('/manutencao');
    }

    const handleButtonCancelarClick = () => {
        navigate('/manutencao');
    }

    return (
        <div className="main-content">
            <Sidebar/>
            <div className="header">
                <h2>Manutenção - Atualizar</h2>
                <div className="action-buttons">
                    <button className="save-btn" onClick={handleButtonSalvarClick}>Atualizar</button>
                    <button className="cancel-btn" onClick={handleButtonCancelarClick}>Cancelar</button>
                </div>
            </div>

            <div className="form-section">
                <h3>Identificação</h3>
                <div className="form-group">
                    <label htmlFor="titulo">Título</label>
                    <input type="text" id="titulo" value={formData.titulo} onChange={handleInputChange}/>

                    <label htmlFor="descricao">Descrição</label>
                    <textarea id="descricao" value={formData.descricao} onChange={handleInputChange}></textarea>
                </div>
            </div>

            <div className="form-section">
                <h3>Detalhes da Manutenção</h3>
                <div className="form-group">
                    <div style={{flex: 1}}>
                        <label htmlFor="tipoManutencao">Tipo de Manutenção</label>
                        <select id="tipoManutencao" value={formData.tipoManutencao} onChange={handleInputChange}>
                            <option>Selecione</option>
                            <option>Corretiva</option>
                            <option>Preventiva</option>
                        </select>
                    </div>
                    <div style={{flex: 1}}>
                        <label htmlFor="criticidade">Criticidade</label>
                        <select id="criticidade" value={formData.criticidade} onChange={handleInputChange}>
                            <option>Alta</option>
                            <option>Média</option>
                            <option>Baixa</option>
                        </select>
                    </div>
                    <div style={{flex: 1}}>
                        <label htmlFor="tecnico">Técnico Atribuído</label>
                        <select id="tecnico" value={formData.tecnico} onChange={handleInputChange}>
                            <option>Selecione</option>
                            {Array.isArray(users) && users.map((user: UserManutencao) => (
                                <option key={user.id} value={user.id}>{user.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="form-group dates">
                    <div>
                        <label htmlFor="dataAbertura">Data Abertura</label>
                        <input type="date" id="dataAbertura" value={formData.dataAbertura}
                               onChange={handleInputChange}/>
                    </div>
                    <div>
                        <label htmlFor="dataFechamento">Data Fechamento</label>
                        <input type="date" id="dataFechamento" value={formData.dataFechamento}
                               onChange={handleInputChange}/>
                    </div>
                </div>

                <div className="form-group">
                    <div style={{flex: 1}}>
                        <label htmlFor="status">Status</label>
                        <select id="status" value={formData.status} onChange={handleInputChange}>
                            <option>Aberto</option>
                            <option>Fechado</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="form-section">
                <h3>Equipamento</h3>
                <div className="form-group">
                    <div style={{flex: 1}}>
                        <label htmlFor="equipamento">Nome</label>
                        <input type="text" id="equipamento" value={formData.equipamento} readOnly/>
                    </div>
                    <div style={{flex: 1}}>
                        <label htmlFor="localizacao">Localização</label>
                        <input type="text" id="localizacao" value={formData.localizacao} readOnly/>
                    </div>
                    <div style={{flex: 1}}>
                        <label htmlFor="modelo">Modelo</label>
                        <input type="text" id="modelo" value={formData.modelo} readOnly/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditarManutencao;
