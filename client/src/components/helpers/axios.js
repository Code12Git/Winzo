import axios from "axios";

const BASE_URL = "http://localhost:7000/api";

let token = localStorage.getItem("token");

export const publicRequest = axios.create({
	baseURL: BASE_URL,
});

export const privateRequest = axios.create({
	baseURL: BASE_URL,
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token?.replace(/"/g, "")}`,
	},
});
