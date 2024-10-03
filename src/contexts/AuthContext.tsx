import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
    login: (token : string) => void;
    logout: () => void;
    accessToken: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));

    const login = (token: string) =>{
        console.log(token);
        localStorage.setItem("accessToken", JSON.stringify(token));
        setAccessToken(JSON.stringify(token));
    } 
    const logout = () => {
        setAccessToken(null)
        localStorage.removeItem("accessToken");
    };

    return (
        <AuthContext.Provider value={{ accessToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
