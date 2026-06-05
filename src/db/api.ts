import axios from "axios";

export const api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_BASE_URL || "http://192.168.1.38:3000"
})