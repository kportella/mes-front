import React from 'react';
import Sidebar from "./Sidebar.tsx";
import {useNavigate} from "react-router-dom";

const Manutencao: React.FC = () => {

    const navigate = useNavigate();
    
    const handleButtonSalvarClick = () => {
        // Salvar no back
        
        navigate('/manutencao');
    }

    const handleButtonCancelarClick = () => {
        navigate('/manutencao');
    }
    
    return (
        <div className="main-content">
            
            <Sidebar />
            <div className="header">
                <h2>Manutenção - Cadastrar</h2>
                <div className="action-buttons">
                    <button className="save-btn" onClick={handleButtonSalvarClick}>Salvar</button>
                    <button className="cancel-btn" onClick={handleButtonCancelarClick}>Cancelar</button>
                </div>
            </div>

            <div className="form-section">
                <h3>Identificação</h3>
                <div className="form-group">
                        <label htmlFor="titulo">Título</label>
                        <input type="text" id="titulo" />
                    
                        <label htmlFor="descricao">Descrição</label>
                        <textarea id="descricao"></textarea>
                </div>
            </div>

            <div className="form-section">
                <h3>Detalhes da Manutenção</h3>
                <div className="form-group">
                    <div style={{ flex: 1 }}>
                        <label htmlFor="tipo-manutencao">Tipo de Manutenção</label>
                        <select id="tipo-manutencao">
                            <option>Selecione</option>
                            <option>Corretiva</option>
                            <option>Preventiva</option>
                        </select>
                    </div>
                    <div style={{ flex: 1 }}>
                        <label htmlFor="criticidade">Criticidade</label>
                        <select id="criticidade">
                            <option>Alta</option>
                            <option>Média</option>
                            <option>Baixa</option>
                        </select>
                    </div>
                    <div style={{ flex: 1 }}>
                        <label htmlFor="tecnico">Técnico Atribuído</label>
                        <select id="tecnico">
                            <option>Selecione</option>
                        </select>
                    </div>
                </div>

                <div className="form-group dates">
                    <div>
                        <label htmlFor="data-abertura">Data Abertura</label>
                        <input type="date" id="data-abertura" />
                    </div>
                    <div>
                        <label htmlFor="data-fechamento">Data Fechamento</label>
                        <input type="date" id="data-fechamento" />
                    </div>
                </div>

                <div className="form-group">
                    <div style={{ flex: 1 }}>
                        <label htmlFor="status">Status</label>
                        <select id="status">
                            <option>Aberto</option>
                            <option>Fechado</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="form-section">
                <h3>Equipamento</h3>
                <div className="equipment-section">
                    <div>
                        <label htmlFor="equipamento">Nome</label>
                        <input type="text" id="equipamento" value="Equipamento Cópias" readOnly />
                    </div>
                    <div>
                        <label htmlFor="localizacao">Localização</label>
                        <input type="text" id="localizacao" value="Setor ABC" readOnly />
                    </div>
                    <div>
                        <label htmlFor="modelo">Modelo</label>
                        <input type="text" id="modelo" value="Premium" readOnly />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Manutencao;
