import axios from "axios";

export const AxiosService = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT,
    timeout: 10000,
});
