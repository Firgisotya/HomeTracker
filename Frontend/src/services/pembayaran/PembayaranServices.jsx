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

export const getAllPembayaran = async () => {
  try {
    const response = await axios.get(
      `${apiURL}/pembayaran`,
      await getAuthHeader()
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const getPembayaranById = async (id) => {
  try {
    const response = await axios.get(
      `${apiURL}/pembayaran/${id}`,
      await getAuthHeader()
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const createPembayaran = async (data) => {
  try {
    const response = await axios.post(
      `${apiURL}/pembayaran`,
      data,
      await getAuthHeader()
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const deletePembayaran = async (id) => {
  try {
    const response = await axios.delete(
      `${apiURL}/pembayaran/${id}`,
      await getAuthHeader()
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
}
