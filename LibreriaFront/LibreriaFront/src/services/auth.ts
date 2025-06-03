import axios from 'axios';

const API_URL = 'http://localhost:8000/api/auth/';

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}login/`, { email, password });
  const { token, usuario } = response.data;

  // Guardar en localStorage
  localStorage.setItem('token', token);
  localStorage.setItem('usuario', JSON.stringify(usuario));

  return { token, usuario };
};


export const registrarUsuario = async (datos: {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  rol: 'cliente' | 'administrador';
}) => {
  const response = await axios.post(`${API_URL}registro/`, datos);
  const { token, usuario } = response.data;

  // Guardar en localStorage
  localStorage.setItem('token', token);
  localStorage.setItem('usuario', JSON.stringify(usuario));

  return { token, usuario };
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('usuario');
};

export const getUsuario = () => {
  const user = localStorage.getItem('usuario');
  return user ? JSON.parse(user) : null;
};

export const getToken = () => {
  return localStorage.getItem('token');
};
