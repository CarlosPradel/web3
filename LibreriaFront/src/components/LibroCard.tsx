import { Link } from 'react-router-dom'
import type { Libro } from '../types/Libro'

interface Props {
  libro: Libro
}

const LibroCard = ({ libro }: Props) => {
  return (
    <div className="border rounded-xl shadow hover:shadow-lg p-4 flex flex-col bg-white">
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
        <h3 className="text-lg font-bold text-blue-700 hover:underline text-center">
          {libro.titulo}
        </h3>
      </Link>
    </div>
  )
}

export default LibroCard
