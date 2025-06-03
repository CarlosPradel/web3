import api from './api'
import type { Usuario } from '../types/Usuario'

export const obtenerUsuarios = async (): Promise<Usuario[]> => {
  const { data } = await api.get('/admin/usuarios/')
  return data
}

