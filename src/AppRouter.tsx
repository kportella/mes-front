import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from "./Login.tsx";
import Usuario from "./Usuario.tsx";

const AppRouter: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/usuario" element={<Usuario />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
