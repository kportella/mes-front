import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const getTechnicians = async () => {
    const response = await axios.get(`${API_URL}/users/getAllUsers`);
    return response.data.users.filter((user: any) => user.perfil === 'Técnico de Manutenção');
};

export const createMaintenance = async (formData: any) => {
    return axios.post(`${API_URL}/maintenance/create`, formData);
};

export const getMaintenanceById = async (id: number) => {
    const response = await axios.get(`${API_URL}/maintenance/findAll`);
    return response.data.maintenances.find((manutencao: any) => manutencao.id === id);
};

export const updateMaintenance = async (formData: any) => {
    return axios.post(`${API_URL}/maintenance/updateMaintenance`, formData);
};
