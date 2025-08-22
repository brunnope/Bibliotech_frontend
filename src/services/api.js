import axios from 'axios';
import { logoutLocalStorage } from "./authService";

const api = axios.create({
    baseURL: 'http://localhost:8080'
})


api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Token expirado ou inválido. Redirecionando para login...");
      logoutLocalStorage();
      window.location.href = "/";
    }

    if (error.response?.status === 403) {
      console.warn("Acesso negado. Permissão insuficiente.");
      window.location.href = "/acesso-negado";
    }

    return Promise.reject(error);
  }
);

export default api;