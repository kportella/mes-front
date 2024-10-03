import React from 'react';
import './App.css';  // Optional: Include any global styles
import AppRouter from "./AppRouter.tsx";
import {AuthProvider} from "./contexts/AuthContext.tsx";

const App: React.FC = () => {
    return (
        <AuthProvider>
            <div className="App">
                <AppRouter />
            </div>
        </AuthProvider>
    );
}

export default App;