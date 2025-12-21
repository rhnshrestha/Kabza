import axios from "axios";
const API = axios.create({
    baseURL: "http://localhost:8808/api",
});

export const userLogin = (data) => API.post("/user/login",data);
export const userRegister = (data) => API.post("/user/register",data);
export const adminLogin = (data) => API.post("/admin/login",data);