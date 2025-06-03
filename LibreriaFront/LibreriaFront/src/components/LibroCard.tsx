import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCarrito } from '../hooks/useCarrito'
import CarritoModal from './CarritoModal'
import type { Libro } from '../types/Libro'

interface Props {
  libro: Libro
  mostrarBoton?: boolean
}

const LibroCard = ({ libro, mostrarBoton = true }: Props) => {
  const { estaEnCarrito, agregar } = useCarrito()
  const [mostrarModal, setMostrarModal] = useState(false)

  const enCarrito = estaEnCarrito(libro.id)

  const handleAgregar = async () => {
    await agregar(libro)
    setMostrarModal(true)
  }

  return (
    <div className="border rounded-xl shadow hover:shadow-lg p-5 flex flex-col bg-white">
      <Link to={`/libros/${libro.id}`}>
        {libro.imagen ? (
          <img
            src={libro.imagen}
            alt={libro.titulo}
            className="w-full h-56 object-cover rounded-lg mb-4"
          />
        ) : (
          <div className="w-full h-56 bg-gray-200 flex items-center justify-center rounded-lg mb-4 text-gray-500">
            Sin imagen
          </div>
        )}
        <h3 className="text-xl font-bold text-blue-700 mb-1 hover:underline">{libro.titulo}</h3>
      </Link>

      <p className="text-sm text-gray-700 mb-1"><span className="font-semibold">Autor:</span> {libro.autor}</p>
      <p className="text-sm text-gray-600 mb-2"><span className="font-semibold">ISBN:</span> {libro.isbn}</p>
      <p className="text-sm text-gray-800 mb-3 line-clamp-4">{libro.descripcion}</p>

      {libro.generos?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {libro.generos.map((genero) => (
            <span key={genero.id} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
              {genero.nombre}
            </span>
          ))}
        </div>
      )}

      <p className="text-lg font-bold text-green-700 mb-3">Bs {libro.precio}</p>

      {mostrarBoton && (
        <>
          {!enCarrito ? (
            <button
              onClick={handleAgregar}
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
            >
              Agregar al carrito
            </button>
          ) : (
            <button
              onClick={() => setMostrarModal(true)}
              className="w-full text-blue-600 hover:text-blue-800 underline text-sm"
            >
              Ver carrito
            </button>
          )}
        </>
      )}

      <CarritoModal
        mostrar={mostrarModal}
        onClose={() => setMostrarModal(false)}
      />
    </div>
  )
}

export default LibroCard
