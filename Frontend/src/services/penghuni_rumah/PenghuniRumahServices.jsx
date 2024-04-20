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

export const getAllPenghuniRumah = async () => {
  try {
    const authHeader = await getAuthHeader();
    const response = await axios.get(`${apiURL}/penghuni_rumah`, authHeader);
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};

export const getPenghuniRumahById = async (id) => {
  try {
    const authHeader = await getAuthHeader();
    const response = await axios.get(
      `${apiURL}/penghuni_rumah/${id}`,
      authHeader
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};

export const createPenghuniRumah = async (data) => {
  try {
    const authHeader = await getAuthHeader();
    const response = await axios.post(
      `${apiURL}/penghuni_rumah`,
      data,
      authHeader
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};

export const updatePenghuniRumah = async (id, data) => {
  try {
    const authHeader = await getAuthHeader();
    const response = await axios.post(
      `${apiURL}/penghuni_rumah/${id}?_method=PUT`,
      data,
      authHeader
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};

export const deletePenghuniRumah = async (id) => {
  try {
    const authHeader = await getAuthHeader();
    const response = await axios.post(
      `${apiURL}/penghuni_rumah/${id}?_method=DELETE`,
      {},
      authHeader
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};
