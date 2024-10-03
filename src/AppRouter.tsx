import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./pages/Login.tsx";
import RegistrarUsuario from "./pages/Usuario/RegistrarUsuario.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";
import ListarUsuarios from "./pages/Usuario/ListarUsuarios.tsx";
import ListarManutencao from "./pages/Manutencao/ListarManutencao.tsx";
import RegistrarManutencao from "./pages/Manutencao/RegistrarManutencao.tsx";
import EditarUsuario from "./pages/Usuario/EditarUsuario.tsx";
import EditarManutencao from "./pages/Manutencao/EditarManutencao.tsx";
import Dashboard from "./pages/Dashboard.tsx";

const AppRouter: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                
                <Route path="/" element={<PrivateRoute />}>
                    <Route path="/usuario" element={<ListarUsuarios />} />
                    <Route path="/usuario/registro" element={<RegistrarUsuario />} />
                    <Route path="/usuario/editar/:id" element={<EditarUsuario />} />
                    <Route path="/manutencao" element={<ListarManutencao />} />
                    <Route path="/manutencao/registro" element={<RegistrarManutencao />} />
                    <Route path="/manutencao/editar/:id" element={<EditarManutencao />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default AppRouter;
