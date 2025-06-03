import api from './api';

export const login = async (email: string, password: string) => {
  const response = await api.post('/auth/login/', { email, password });
  const { token, usuario } = response.data;

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
  const response = await api.post('/auth/registro/', datos);
  const { token, usuario } = response.data;

  localStorage.setItem('usuario', JSON.stringify(usuario));

  return { token, usuario };
};

export const logout = () => {
  localStorage.removeItem('usuario');
};

export const getUsuario = () => {
  const user = localStorage.getItem('usuario');
  return user ? JSON.parse(user) : null;
};
