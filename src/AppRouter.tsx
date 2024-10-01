import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./Login.tsx";
import Usuario from "./Usuario.tsx";
import PrivateRoute from "./PrivateRoute.tsx";
import ListarUsuarios from "./ListarUsuarios.tsx";

const AppRouter: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                
                <Route path="/" element={<PrivateRoute />}>
                    <Route path="/usuario" element={<Usuario />} />
                    <Route path="/listarUsuario" element={<ListarUsuarios />} />
                </Route>
                
            </Routes>
        </Router>
    );
};

export default AppRouter;
