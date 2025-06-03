import api from './api'
import type { Compra } from '../types/Compra'

export const confirmarCompra = async (libros: number[], comprobante: File): Promise<Compra> => {
  const formData = new FormData()
  formData.append('libros', JSON.stringify(libros))
  formData.append('comprobante_pago', comprobante)

  const { data } = await api.post('/comprar/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  return data
}

export const obtenerMisCompras = async (): Promise<Compra[]> => {
  const { data } = await api.get('/mis-compras/')
  return data
}


export const obtenerCompra = async (id: number): Promise<Compra> => {
  const { data } = await api.get(`/comprar/${id}/`)
  return data
}

export const obtenerVentas = async (): Promise<Compra[]> => {
  const { data } = await api.get('/admin/ventas/')
  return data
}

