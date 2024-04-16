import axios from 'axios';
import { BaseURL } from '../BaseURL';

const apiURL = BaseURL().api;

export const login = async (data) => {
    const response = await axios.post(`${apiURL}/auth/login`, data);
    return response.data;
}

export const logout = async () => {
    localStorage.removeItem('token');

    window.location.reload()
}
