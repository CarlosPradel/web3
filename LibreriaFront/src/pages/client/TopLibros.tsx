import { useEffect, useState } from 'react';
import { obtenerTopLibros } from '../../services/libros';
import type { Libro } from '../../types/Libro';

const TopLibros = () => {
  const [libros, setLibros] = useState<Libro[]>([]);

  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await obtenerTopLibros();
        setLibros(data);
      } catch (error) {
        console.error('Error al cargar el top de libros:', error);
      }
    };

    cargar();
  }, []);

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-blue-100 via-white to-blue-100 px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-700 text-center mb-10">
          Top 10 Libros Más Vendidos
        </h1>

        {libros.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No hay libros disponibles.</p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {libros.map((libro) => (
              <div
                key={libro.id}
                className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition p-4"
              >
                <img
                  src={libro.imagen}
                  alt={libro.titulo}
                  className="h-48 w-full object-cover rounded mb-3"
                />
                <h2 className="text-lg font-semibold text-gray-800">{libro.titulo}</h2>
                <p className="text-sm text-gray-600">Autor: {libro.autor}</p>
                <p className="text-sm text-gray-600">Precio: Bs {Number(libro.precio).toFixed(2)}</p>
                <p className="text-sm text-green-600 font-medium">Vendidos: {libro.total_vendidos}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TopLibros;
