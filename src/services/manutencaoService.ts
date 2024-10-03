import axios from 'axios';

const API_URL = 'http://localhost:3000';

const getToken = () => {
    return localStorage.getItem('accessToken');
};

export const getTechnicians = async () => {
    const response = await axios.get(`${API_URL}/users/getAllUsers`, {
        headers: {'Authorization': `Bearer ${getToken()!.replace(/['"]+/g, '')}`}
    });
    return response.data.users.filter((user: any) => user.perfil === 'Técnico de Manutenção');
};

export const createMaintenance = async (formData: any) => {
    return axios.post(`${API_URL}/maintenance/create`, formData, {
        headers: {'Authorization': `Bearer ${getToken()!.replace(/['"]+/g, '')}`}
    });
};

export const getMaintenanceById = async (id: number) => {
    const response = await axios.get(`${API_URL}/maintenance/findAll`, {
        headers: {'Authorization': `Bearer ${getToken()!.replace(/['"]+/g, '')}`}
    });
    return response.data.maintenances.find((manutencao: any) => manutencao.id === id);
};

export const updateMaintenance = async (formData: any) => {
    return axios.post(`${API_URL}/maintenance/updateMaintenance`, formData, {
        headers: {'Authorization': `Bearer ${getToken()!.replace(/['"]+/g, '')}`}
    });
};

export const getMaintenanceList = async () => {
    const response = await axios.get(`${API_URL}/maintenance/findAll`, {
        headers: {'Authorization': `Bearer ${getToken()!.replace(/['"]+/g, '')}`}
    });

    return response.data.maintenances;
};

