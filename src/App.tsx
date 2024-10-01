import React from 'react';
import './App.css';  // Optional: Include any global styles
import Login from './Login.tsx';
import Usuario from "./Usuario.tsx";
import Sidebar from "./Sidebar.tsx";

const App: React.FC = () => {
    return (

        <div className="App">
            <Usuario/>
        </div>
    );
}

export default App;