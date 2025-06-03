import { useEffect, useState } from 'react'
import {
  agregarAlCarrito,
  eliminarDelCarrito,
  obtenerCarrito,
} from '../services/carrito'
import type { CarritoItem } from '../types/CarritoItem'
import type { Libro } from '../types/Libro'
import { toast } from 'react-toastify'

export const useCarrito = () => {
  const [carrito, setCarrito] = useState<CarritoItem[]>([])
  const [cargando, setCargando] = useState(true)

  const cargarCarrito = async () => {
    try {
      setCargando(true)
      const data = await obtenerCarrito()
      setCarrito(data)
    } catch {
      toast.error('Error al cargar el carrito')
    } finally {
      setCargando(false)
    }
  }

  const agregar = async (libro: Libro) => {
    try {
      await agregarAlCarrito(libro.id)
      await cargarCarrito()
      toast.success('Libro agregado al carrito')
    } catch {
      toast.error('Este libro ya está en el carrito')
    }
  }

  const eliminar = async (id: number) => {
    try {
      await eliminarDelCarrito(id)
      await cargarCarrito()
      toast.success('Libro eliminado del carrito')
    } catch {
      toast.error('Error al eliminar el libro')
    }
  }

  const vaciar = () => setCarrito([])

  const total = carrito.length

  const totalPagar = carrito.reduce(
    (sum, item) => sum + Number(item.libro.precio),
    0
  )

  const estaEnCarrito = (libroId: number) => {
    return carrito.some((item) => item.libro.id === libroId)
  }

  useEffect(() => {
    cargarCarrito()
  }, [])

  return {
    carrito,
    total,
    totalPagar,
    estaEnCarrito,
    cargando,
    agregar,
    eliminar,
    vaciar,
    recargar: cargarCarrito,
  }
}
