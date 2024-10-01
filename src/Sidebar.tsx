import React from "react";

const Sidebar: React.FC = () => {
    return (
        <div className="sidebar">
            <h1>Sistema MES</h1>
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="/usuario">Usuários</a></li>
                <li><a href="#">Manutenção</a></li>
                <li><a href="/login">Logout</a></li>
            </ul>
        </div>
    )
}

export default Sidebar;