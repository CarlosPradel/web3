import { useEffect, useState } from 'react'
import { obtenerLibros } from '../../services/libros'
import { obtenerGeneros } from '../../services/generos'
import type { Libro } from '../../types/Libro'
import type { Genero } from '../../types/Genero'
import LibroCard from '../../components/LibroCard'
import { toast } from 'react-toastify'

const Libros = () => {
  const [libros, setLibros] = useState<Libro[]>([])
  const [todosLibros, setTodosLibros] = useState<Libro[]>([])
  const [generos, setGeneros] = useState<Genero[]>([])
  const [generoSeleccionado, setGeneroSeleccionado] = useState<number | null>(null)

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [librosData, generosData] = await Promise.all([
          obtenerLibros(),
          obtenerGeneros()
        ])
        setTodosLibros(librosData)
        setLibros(librosData)
        setGeneros(generosData)
      } catch {
        toast.error('Error al cargar los libros o géneros')
      }
    }

    cargarDatos()
  }, [])

  const filtrarPorGenero = (idGenero: number | null) => {
    setGeneroSeleccionado(idGenero)
    if (!idGenero) {
      setLibros(todosLibros)
    } else {
      setLibros(
        todosLibros.filter(libro =>
          libro.generos.some(g => g.id === idGenero)
        )
      )
    }
  }

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-blue-100 via-white to-blue-100 px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center text-blue-700 mb-8">
          Libros disponibles
        </h2>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <button
            onClick={() => filtrarPorGenero(null)}
            className={`px-6 py-2 rounded-full transition font-semibold ${
              generoSeleccionado === null
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-gray-800 border border-gray-300 hover:bg-gray-100'
            }`}
          >
            Todos
          </button>
          {generos.map((genero) => (
            <button
              key={genero.id}
              onClick={() => filtrarPorGenero(genero.id)}
              className={`px-6 py-2 rounded-full transition font-semibold ${
                generoSeleccionado === genero.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-800 border border-gray-300 hover:bg-gray-100'
              }`}
            >
              {genero.nombre}
            </button>
          ))}
        </div>

        {libros.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">
            No hay libros disponibles para este género.
          </p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {libros.map((libro) => (
              <LibroCard
                key={libro.id}
                libro={libro}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Libros
