
import axios from 'axios';
import api from '../services/api';


export const loginUser = async (username: string, password: string) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/auth/login/', {
      username,
      password,
    });
    const token = response.data.token;
    localStorage.setItem('token', token);
    return response.data;
  } catch (error) {
    console.error('Error de login:', error);
    throw new Error('Credenciales inválidas');
  }
};

export const getUsuarioActual = async () => {
  const response = await api.get('/usuarios/me/');
  return response.data;
};


export const registerUser = async (username: string, password: string) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/usuarios/', {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    throw new Error('Hubo un error al registrar el usuario');
  }
};


export const logoutUser = () => {
  localStorage.removeItem('token');
};

export const getUsuariosDisponibles = async () => {
  try {
    const response = await api.get('/usuarios/');
    return response.data;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw new Error('No se pudieron obtener los usuarios');
  }
};
