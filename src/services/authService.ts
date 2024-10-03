import axios from 'axios';

interface AuthResponse {
    accessToken: string;
    expiresIn: string;
    username: string;
}

const API_URL = 'http://localhost:3000';

export const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
    const response = await axios.post<AuthResponse>(`${API_URL}/auth/login`, { email, password });
    return response.data;
};
