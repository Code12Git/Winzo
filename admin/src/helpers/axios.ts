import axios, { AxiosInstance } from "axios";

const BASE_URL = "https://winzo.onrender.com/api";

interface Token {
    token: string;
}

const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

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

export const formRequest: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token?.replace(/"/g, '')}`,

    },
})