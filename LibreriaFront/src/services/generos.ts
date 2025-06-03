import api from './api'
import type { Genero } from '../types/Genero'

export const obtenerGeneros = async (): Promise<Genero[]> => {
  const { data } = await api.get('/generos/')
  return data
}

export const crearGenero = async (nombre: string): Promise<Genero> => {
  const { data } = await api.post('/generos/', { nombre })
  return data
}

export const editarGenero = async (id: number, nombre: string): Promise<Genero> => {
  const { data } = await api.put(`/generos/${id}/`, { nombre })
  return data
}

export const eliminarGenero = async (id: number): Promise<void> => {
  await api.delete(`/generos/${id}/`)
}
