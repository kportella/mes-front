import axios from 'axios';

const API_URL = 'http://localhost:3000';

const getToken = () => {
    return localStorage.getItem('accessToken'); // Assuming you store your JWT token in local storage
};

export const registerUser = async (formData: any) => {
    return axios.post(`${API_URL}/auth/register`, formData);
};

export const getAllUsers = async () => {
    const response = await axios.get(`${API_URL}/users/getAllUsers`, {
    });
    return response.data;
};

export const getUserById = async (id: number) => {
    const response = await axios.get(`${API_URL}/users/getAllUsers`);
    return response.data.users.find((user: any) => user.id === id);
};

export const updateUser = async (formData: any) => {
    return axios.post(`${API_URL}/users/updateUser`, formData, {
        headers: {'Authorization': `Bearer ${getToken()!.replace(/['"]+/g, '')}`}
    });
};