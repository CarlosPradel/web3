export interface Libro {
  id: number
  titulo: string
  autor: string
  descripcion: string
  precio: number | string
  isbn: string
  imagen: string
  generos: { id: number; nombre: string }[]
}
