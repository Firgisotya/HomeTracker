import axios from 'axios';
import { BaseURL } from '../BaseURL';
import { getToken } from '../storage/StorageServices' 

const apiURL = BaseURL().api;
export const storageURL = BaseURL().storage;

const getAuthHeader = async () => {
    const token = await getToken();
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
}

export const getAllPenghuni = async () => {
    const authHeader = await getAuthHeader()
    const response = await axios.get(`${apiURL}/penghuni`, authHeader);
    return response.data.data;
}

export const getPenghuniById = async (id) => {
    const authHeader = await getAuthHeader()
    const response = await axios.get(`${apiURL}/penghuni/${id}`, authHeader);
    return response.data.data;
}

export const createPenghuni = async (data) => {
    const authHeader = await getAuthHeader()
    const response = await axios.post(`${apiURL}/penghuni`, data, authHeader);
    return response.data.data;
}

export const updatePenghuni = async (id, data) => {
    const authHeader = await getAuthHeader()
    const response = await axios.post(`${apiURL}/penghuni/${id}?_method=PUT`, data, authHeader);
    return response.data.data;
}

export const deletePenghuni = async (id) => {
    const authHeader = await getAuthHeader()
    const response = await axios.delete(`${apiURL}/penghuni/${id}`, authHeader);
    return response.data.data;
}