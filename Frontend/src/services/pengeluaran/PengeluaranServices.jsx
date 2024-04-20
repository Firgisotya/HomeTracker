import axios from "axios";
import { BaseURL } from "../BaseURL";
import { getToken } from "../storage/StorageServices";

const apiURL = BaseURL().api;
export const storageURL = BaseURL().storage;

const getAuthHeader = async () => {
  const token = await getToken();
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getAllPengeluaran = async () => {
    try {
        const response = await axios.get(`${apiURL}/pengeluaran`, await getAuthHeader());
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
}

export const getPengeluaranById = async (id) => {
    try {
        const response = await axios.get(`${apiURL}/pengeluaran/${id}`, await getAuthHeader());
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const createPengeluaran = async (data) => {
    try {
        const response = await axios.post(`${apiURL}/pengeluaran`, data, await getAuthHeader());
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const updatePengeluaran = async (id, data) => {
    try {
        const response = await axios.put(`${apiURL}/pengeluaran/${id}`, data, await getAuthHeader());
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const deletePengeluaran = async (id) => {
    try {
        const response = await axios.delete(`${apiURL}/pengeluaran/${id}`, await getAuthHeader());
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

