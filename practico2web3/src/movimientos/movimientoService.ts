import api from '../services/api';
import { Movimiento } from '../models/Movimiento';
import { AxiosError } from 'axios';

// Obtener todos los movimientos
export const getMovimientos = async (): Promise<Movimiento[]> => {
  try {
    const response = await api.get('movimientos/');
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      console.error('Error al obtener los movimientos:', axiosError.response.data);
    }
    throw new Error('Hubo un error al obtener los movimientos');
  }
};

export const getMovimientosPorCuenta = async (cuentaId: string): Promise<Movimiento[]> => {
    try {
      const response = await api.get(`movimientos/?cuenta_id=${cuentaId}`);
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        console.error('Error al obtener movimientos por cuenta:', axiosError.response.data);
      }
      throw new Error('Hubo un error al obtener los movimientos de la cuenta');
    }
  };
  

// Crear un nuevo movimiento
export const createMovimiento = async (movimientoData: Movimiento): Promise<Movimiento> => {
  try {
    const response = await api.post('movimientos/', movimientoData);
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      console.error('Error al crear movimiento:', axiosError.response.data);
    }
    throw new Error('Hubo un error al crear el movimiento');
  }
};

// Eliminar un movimiento
export const deleteMovimiento = async (id: string): Promise<void> => {
  try {
    await api.delete(`movimientos/${id}/`);
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      console.error('Error al eliminar movimiento:', axiosError.response.data);
    }
    throw new Error('Hubo un error al eliminar el movimiento');
  }
};
