import axios from 'axios';
import { BaseURL } from '../BaseURL';
import { getToken } from '../storage/StorageServices' 

const apiURL = BaseURL().api;
export const storageURL = BaseURL().storage;

export const getAuthHeader = async () => {
    const token = await getToken();
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
}

export const getAllRumah = async () => {
    const authHeader = await getAuthHeader()
    const response = await axios.get(`${apiURL}/rumah`, authHeader);
    return response.data.data;
}

export const getRumahById = async (id) => {
    const authHeader = await getAuthHeader()
    const response = await axios.get(`${apiURL}/rumah/${id}`, authHeader);
    return response.data;
}

export const historyRumahById = async (id) => {
    const authHeader = await getAuthHeader()
    const response = await axios.get(`${apiURL}/rumah/${id}/history`, authHeader);
    return response.data;
}

export const createRumah = async (data) => {
    const authHeader = await getAuthHeader()
    const response = await axios.post(`${apiURL}/rumah`, data, authHeader);
    return response.data.data;
}

export const updateRumah = async (id, data) => {
    const authHeader = await getAuthHeader()
    const response = await axios.post(`${apiURL}/rumah/${id}?_method=PUT`, data, authHeader);
    return response.data.data;
}

export const updateStatusRumah = async (id) => {
    const response = await axios.post(`${apiURL}/rumah/${id}/status_rumah`);
    return response.data.data;
}

export const deleteRumah = async (id) => {
    const authHeader = await getAuthHeader()
    const response = await axios.delete(`${apiURL}/rumah/${id}`, authHeader);
    return response.data.data;
}
