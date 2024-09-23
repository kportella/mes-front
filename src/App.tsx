import React from 'react';
import './App.css';  // Optional: Include any global styles
import Login from './Login.tsx';

const App: React.FC = () => {
    return (
        <div className="App">
            <Login />
        </div>
    );
}

export default App;