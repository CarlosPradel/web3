import api from '../services/api';
import { Cuenta } from '../models/Cuenta';
import { AxiosError } from 'axios';

// Obtener la lista de cuentas
export const getCuentas = async (): Promise<Cuenta[]> => {
  try {
    const response = await api.get('cuentas/');
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      console.error('Error al obtener las cuentas:', axiosError.response.data);
    }
    throw new Error('Hubo un error al obtener las cuentas');
  }
};

// Crear una nueva cuenta
export const createCuenta = async (data: { usuario: number; saldo?: number }): Promise<void> => {
  try {
    const response = await api.post('cuentas/', data);
    return response.data;
  } catch (error) {
    console.error('Error al crear cuenta:', error);
    throw new Error('Hubo un error al crear la cuenta');
  }
};



// Actualizar una cuenta existente
export const updateCuenta = async (id: string, cuentaData: Cuenta): Promise<Cuenta> => {
  try {
    const response = await api.put(`cuentas/${id}/`, cuentaData);
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      console.error('Error al actualizar cuenta:', axiosError.response.data);
    }
    throw new Error('Hubo un error al actualizar la cuenta');
  }
};

// Eliminar una cuenta
export const deleteCuenta = async (id: string): Promise<void> => {
  try {
    await api.delete(`cuentas/${id}/`);
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      console.error('Error al eliminar cuenta:', axiosError.response.data);
    }
    throw new Error('Hubo un error al eliminar la cuenta');
  }
};

export const getCuentasUsuario = async (userId: string) => {
  try {
    const response = await api.get(`/cuentas/?usuario_id=${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener cuentas del usuario:', error);
    throw new Error('No se pudieron obtener las cuentas del usuario');
  }
};
