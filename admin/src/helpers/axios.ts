import axios, { AxiosInstance } from "axios";

const BASE_URL = "http://3.110.133.228:7000/api";

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
