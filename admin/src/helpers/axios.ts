import axios, { AxiosInstance } from "axios";

const BASE_URL = "https://winzo.onrender.com/api";

interface Token {
    token: string;
}

let token = localStorage.getItem('token');

export const publicRequest: AxiosInstance = axios.create({
    baseURL: BASE_URL,
});

export const privateRequest: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token?.replace(/"/g, '')}`,
    },
});
