import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { obtenerLibros } from '../../services/libros';
import { obtenerGeneros } from '../../services/generos';
import LibroCard from '../../components/LibroCard';
import type { Libro } from '../../types/Libro';
import type { Genero } from '../../types/Genero';
import { toast } from 'react-toastify';

const Home = () => {
  const { usuario, logout } = useAuth();
  const [libros, setLibros] = useState<Libro[]>([]);
  const [todosLibros, setTodosLibros] = useState<Libro[]>([]);
  const [generos, setGeneros] = useState<Genero[]>([]);
  const [generoSeleccionado, setGeneroSeleccionado] = useState<number | null>(null);

  useEffect(() => {
    const cargar = async () => {
      try {
        const [librosData, generosData] = await Promise.all([
          obtenerLibros(),
          obtenerGeneros()
        ]);
        setTodosLibros(librosData);
        setLibros(librosData);
        setGeneros(generosData);
      } catch {
        toast.error('Error al cargar los libros o géneros');
      }
    };

    cargar();
  }, []);

  const filtrarPorGenero = (idGenero: number | null) => {
    setGeneroSeleccionado(idGenero);
    if (!idGenero) {
      setLibros(todosLibros);
    } else {
      setLibros(
        todosLibros.filter(libro =>
          libro.generos.some(g => g.id === idGenero)
        )
      );
    }
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-blue-100 via-white to-blue-100 px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-center sm:text-left mb-10">
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-700 mb-2">
              ¡Bienvenido, {usuario?.first_name || 'Usuario'}!
            </h1>
            <p className="text-lg text-gray-700">
              Explora los libros disponibles, revisa tus compras o descubre los más vendidos.
            </p>
          </div>
          <button
            onClick={logout}
            className="mt-4 sm:mt-0 px-5 py-2 bg-red-600 text-white rounded shadow hover:bg-red-700 transition"
          >
            Cerrar sesión
          </button>
        </div>


        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <Link
            to="/cliente/compras"
            className="px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition text-lg"
          >
            Mis compras
          </Link>
          <Link
            to="/libros/top"
            className="px-6 py-3 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition text-lg"
          >
            Top vendidos
          </Link>
        </div>


        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <button
            onClick={() => filtrarPorGenero(null)}
            className={`px-6 py-2 rounded-full transition font-semibold shadow-sm ${
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
              className={`px-6 py-2 rounded-full transition font-semibold shadow-sm ${
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
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {libros.map((libro) => (
              <LibroCard key={libro.id} libro={libro} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
