import api from './api'
import type { CarritoItem } from '../types/CarritoItem'

export const obtenerCarrito = async (): Promise<CarritoItem[]> => {
  const { data } = await api.get('/carrito/')
  return data
}

export const agregarAlCarrito = async (libro_id: number): Promise<CarritoItem> => {
  const { data } = await api.post('/carrito/', { libro: libro_id })
  return data
}

export const eliminarDelCarrito = async (id: number): Promise<void> => {
  await api.delete(`/carrito/${id}/`)
}
