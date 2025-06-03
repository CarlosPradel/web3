import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useEffect, useState } from 'react'
import { obtenerGeneros } from '../../services/generos'
import type { Genero } from '../../types/Genero'


const Home = () => {
  const { usuario, token } = useAuth()
  const isAuthenticated = !!token
  const isAdmin = usuario?.rol === 'administrador'

  const [generos, setGeneros] = useState<Genero[]>([])

  useEffect(() => {
    const fetchGeneros = async () => {
      try {
        const data = await obtenerGeneros()
        setGeneros(data)
      } catch (err) {
        console.error('Error cargando géneros:', err)
      }
    }
    fetchGeneros()
  }, [])

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-100 px-6">
      <div className="flex flex-col items-center justify-center text-center w-full max-w-[1200px]">
        <h1 className="text-6xl font-extrabold text-blue-700 mb-6">
          Bienvenido a la Librería
        </h1>
        <p className="text-xl text-gray-700 mb-10 px-4 max-w-4xl">
          Descubre tu próximo libro favorito entre cientos de títulos seleccionados con pasión y dedicación.
          ¡Explora, compra y disfruta de la lectura!
        </p>

        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {!isAuthenticated ? (
            <>
              <Link
                to="/auth/login"
                className="px-8 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 text-lg"
              >
                Iniciar sesión
              </Link>
              <Link
                to="/auth/register"
                className="px-8 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 text-lg"
              >
                Registrarse
              </Link>
            </>
          ) : isAdmin ? (
            <Link
              to="/admin/panel"
              className="px-8 py-3 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 text-lg"
            >
              Ir al Panel Admin
            </Link>
          ) : (
            <>
              <Link
                to="/libros"
                className="px-8 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 text-lg"
              >
                Ver libros
              </Link>
              <Link
                to="/cliente/compras"
                className="px-8 py-3 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 text-lg"
              >
                Mis compras
              </Link>
            </>
          )}
        </div>

        {generos.length > 0 && (
          <div className="w-full mt-10">
            <h3 className="text-2xl font-bold text-blue-700 mb-4">Explora por género</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {generos.map((genero) => (
                <Link
                  key={genero.id}
                  to={`/genero/${genero.id}`}
                  className="px-5 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition text-base shadow"
                >
                  {genero.nombre}
                </Link>
              ))}
            </div>
          </div>
        )}

        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
          alt="Libros"
          className="w-64 h-64 object-contain opacity-90 mt-12"
        />
      </div>
    </div>
  )
}

export default Home
