import axios, { AxiosRequestConfig, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

// Definimos el tipo para las variables de entorno
interface ImportMetaEnv {
  VITE_BASE_URL?: string;
}

// Obtenemos la URL base desde las variables de entorno o usamos una por defecto
const API_URL: string = (import.meta.env as ImportMetaEnv).VITE_BASE_URL || 'http://localhost:3000/api';

// Creamos una instancia de Axios con tipos explícitos
const instance: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Interceptor de solicitud - Usando InternalAxiosRequestConfig en lugar de AxiosRequestConfig
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token: string | undefined = Cookies.get('jwt-auth', { path: '/' });
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any): Promise<never> => Promise.reject(error)
);

export default instance;