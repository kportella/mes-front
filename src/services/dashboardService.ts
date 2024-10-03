import axios from 'axios';

const API_URL = 'http://localhost:3000';

const getToken = () => {
    return localStorage.getItem('accessToken');
};

export const getUsers = async () => {
    const response = await axios.get(`${API_URL}/users/getAllUsers`, {
        headers: {'Authorization': `Bearer ${getToken()!.replace(/['"]+/g, '')}`}
    });
    return response.data.users;
};

export const getMaintenanceStatusCount = async () => {
    const response = await axios.get(`${API_URL}/maintenance/countStatus`, {
        headers: {'Authorization': `Bearer ${getToken()!.replace(/['"]+/g, '')}`}
    });
    return response.data;
};
