import api from './api'
import type { Libro } from '../types/Libro'

export const obtenerLibros = async (): Promise<Libro[]> => {
  const { data } = await api.get('/libros/')
  return data
}

export const crearLibro = async (formData: FormData): Promise<Libro> => {
  const { data } = await api.post('/libros/', formData)
  return data
}

export const editarLibro = async (id: number, formData: FormData): Promise<Libro> => {
  const { data } = await api.put(`/libros/${id}/`, formData)
  return data
}

export const eliminarLibro = async (id: number): Promise<void> => {
  await api.delete(`/libros/${id}/`)
}

export const getLibroPorId = async (id: number): Promise<Libro> => {
  const { data } = await api.get(`/libros/${id}/`)
  return data
}

export const actualizarLibro = async (id: number, formData: FormData): Promise<Libro> => {
  const { data } = await api.put(`/libros/${id}/`, formData)
  return data
}
