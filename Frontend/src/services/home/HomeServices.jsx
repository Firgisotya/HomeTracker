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

export const countAllSection = async () => {
    try {
        const response = await axios.get(`${apiURL}/count_all_section`, await getAuthHeader());
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const reportTransaction = async () => {
    try {
        const response = await axios.get(`${apiURL}/report_transaction`, await getAuthHeader());
        return response.data.data;
    } catch (error) {
        return error.response.data;
    }
}