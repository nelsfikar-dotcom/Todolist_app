import axios from "axios";

console.log("BASE URL =", "http://192.168.1.52:3000");

export const api = axios.create({
    baseURL: "http://192.168.1.52:3000",
    timeout: 10000,
});