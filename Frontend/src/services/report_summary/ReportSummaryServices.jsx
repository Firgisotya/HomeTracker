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

export const getAllReportSummary = async () => {
    try {
        const response = await axios.get(`${apiURL}/report_summary`, await getAuthHeader());
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
}
