import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { obtenerTopLibros } from '../../services/libros';
import type { Libro } from '../../types/Libro';

const Homepage = () => {
  const { token } = useAuth();
  const [topLibros, setTopLibros] = useState<Libro[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataTop = await obtenerTopLibros();
        setTopLibros(dataTop);
      } catch (err) {
        console.error('Error al cargar los libros más vendidos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-blue-100 via-white to-blue-100 px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-blue-700 mb-6">
            Bienvenido a la Librería
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto">
            Descubre tu próximo libro favorito entre cientos de títulos seleccionados con pasión y dedicación.
          </p>

          {!token && (
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Link
                to="/auth/login"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 text-lg transition"
              >
                Iniciar sesión
              </Link>
              <Link
                to="/auth/register"
                className="px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 text-lg transition"
              >
                Registrarse
              </Link>
            </div>
          )}
        </div>

        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">
          Top 10 Libros Más Vendidos
        </h2>

        {loading ? (
          <p className="text-center text-gray-500">Cargando libros más vendidos...</p>
        ) : topLibros.length > 0 ? (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {topLibros.map((libro) => (
              <div
                key={libro.id}
                className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition p-4"
              >
                <img
                  src={libro.imagen}
                  alt={libro.titulo}
                  className="h-48 w-full object-cover rounded mb-3"
                />
                <h3 className="text-lg font-semibold text-gray-800">{libro.titulo}</h3>
                <p className="text-sm text-gray-600">Autor: {libro.autor}</p>
                <p className="text-sm text-blue-700 font-medium">Vendidos: {libro.total_vendidos}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No hay libros más vendidos por ahora.</p>
        )}

        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
          alt="Libros"
          className="w-52 h-52 sm:w-64 sm:h-64 object-contain opacity-90 mx-auto mt-12"
        />
      </div>
    </div>
  );
};

export default Homepage;
