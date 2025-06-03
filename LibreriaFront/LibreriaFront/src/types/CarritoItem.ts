import type { Libro } from './Libro'

export interface CarritoItem {
  id: number
  libro: Libro
  fecha_agregado: string
}
