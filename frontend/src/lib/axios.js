import axios from 'axios';
//it creeate a creadentiols of axios instance
export const axiosInstance=axios.create({
    baseURL:import.meta.env.MODE ==="development" ? "http://localhost:8080/api/v1":"/api/v1",
    withCredentials:true
})