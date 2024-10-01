import React from 'react';
import './App.css';  // Optional: Include any global styles
import AppRouter from "./AppRouter.tsx";

const App: React.FC = () => {
    return (

        <div className="App">
            <AppRouter />
        </div>
    );
}

export default App;