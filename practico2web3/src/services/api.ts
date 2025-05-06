import axios from 'axios';

// Crear instancia de Axios
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
    (config) => {
      const excludedPaths = ['auth/login/', 'usuarios/'];
      const shouldSkip = excludedPaths.some(path => config.url?.includes(path));
  
      if (!shouldSkip) {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Token ${token}`;
        }
      }
  
      return config;
    },
    (error) => Promise.reject(error)
  );
  

export default api;
