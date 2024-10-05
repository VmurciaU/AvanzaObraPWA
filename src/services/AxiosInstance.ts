import axios, { AxiosInstance } from 'axios';

let axiosInstance: AxiosInstance;

const getAxiosInstance = (): AxiosInstance => {
  if (!axiosInstance) {
    axiosInstance = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });

    // Interceptor para manejar errores de red
    axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        // Si no hay conexión a Internet
        if (error.message === 'Network Error' && !navigator.onLine) {
          console.warn('No tienes conexión a internet. Intentando reintentar...');
          
          // Aquí puedes manejar qué hacer si estás offline.
          // Por ejemplo, puedes usar Workbox BackgroundSync para almacenar la solicitud y reenviarla cuando haya conexión
          
          // También puedes retornar un mensaje personalizado
          return Promise.reject({
            message: 'Sin conexión a Internet, inténtalo más tarde',
            status: 503,
            offline: true
          });
        }

        return Promise.reject(error); // Para otros tipos de errores
      }
    );
  }

  return axiosInstance;
};

export { getAxiosInstance };
