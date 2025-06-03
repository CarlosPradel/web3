import api from './api'
import type { Libro } from '../types/Libro'

export const obtenerLibros = async (): Promise<Libro[]> => {
  const { data } = await api.get('/libros/')
  return data
}

export const crearLibro = async (data: FormData) => {
  return await api.post("http://localhost:8000/api/admin/libros/", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

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


export const obtenerLibroPorId = async (id: number) => {
  const res = await api.get(`http://localhost:8000/api/admin/libros/${id}/`);
  return res.data;
};

export const editarLibro = async (id: number, data: FormData) => {
  return await api.patch(`http://localhost:8000/api/admin/libros/${id}/`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const obtenerTopLibros = async (): Promise<Libro[]> => {
  const response = await api.get('/libros/top/');
  return response.data;
};