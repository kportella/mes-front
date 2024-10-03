import React from "react";
import {useAuth} from "../contexts/AuthContext.tsx";

const Sidebar: React.FC = () => {

    const { logout } = useAuth();
    
    const handleButtonClick = () => {
        logout();
    };
    
    return (
        <div className="sidebar">
            <h1>Sistema MES</h1>
            <ul>
                <li><a href="/dashboard">Home</a></li>
                <li><a href="/usuario">Usuários</a></li>
                <li><a href="/manutencao">Manutenção</a></li>
                <li><a href="/login" onClick={handleButtonClick}>Logout</a></li>
            </ul>
        </div>
    )
}

export default Sidebar;