import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getLibroPorId } from "../../services/libros"
import type { Libro } from "../../types/Libro"
import { useCarrito } from "../../hooks/useCarrito"
import { useAuth } from "../../hooks/useAuth"
import { toast } from "react-toastify"
import { ArrowLeftCircle } from "lucide-react"

const LibroDetalle = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [libro, setLibro] = useState<Libro | null>(null)
  const { agregar, estaEnCarrito, recargar } = useCarrito()
  const { usuario } = useAuth()
  const [agregando, setAgregando] = useState(false)

  useEffect(() => {
    if (id) {
      getLibroPorId(parseInt(id))
        .then(data => setLibro(data))
        .catch(() => toast.error("Error al cargar el libro"))
    }
  }, [id])

  const handleAgregar = async () => {
    if (!usuario || usuario.rol !== 'cliente') {
      toast.error("Debes iniciar sesión como cliente para agregar al carrito")
      return
    }

    if (libro) {
      setAgregando(true)
      await agregar(libro)
      await recargar()
      setAgregando(false)
    }
  }

  if (!libro) return <p className="text-center mt-10 text-gray-600">Cargando libro...</p>

  const enCarrito = estaEnCarrito(libro.id)

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-blue-100 via-white to-blue-100 px-6 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl p-8 relative">

        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 text-blue-600 hover:text-blue-800 flex items-center gap-2"
        >
          <ArrowLeftCircle className="w-6 h-6" />
          <span className="font-medium">Volver</span>
        </button>

        <div className="flex flex-col md:flex-row gap-8 mt-8">
          <img
            src={libro.imagen ?? ""}
            alt={libro.titulo}
            className="w-full md:w-64 h-auto object-cover rounded shadow"
          />
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-extrabold text-blue-700 mb-2">
                {libro.titulo}
              </h2>
              <p className="text-gray-700 mb-1"><strong>Autor:</strong> {libro.autor}</p>
              <p className="text-gray-700 mb-1"><strong>Precio:</strong> Bs{libro.precio}</p>
              <p className="text-gray-700 mb-1"><strong>ISBN:</strong> {libro.isbn}</p>

              <div className="flex flex-wrap gap-2 mt-4 mb-4">
                {libro.generos.map((g) => (
                  <span
                    key={g.id}
                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold"
                  >
                    {g.nombre}
                  </span>
                ))}
              </div>

              <p className="text-gray-800">{libro.descripcion}</p>
            </div>

            <button
              onClick={handleAgregar}
              disabled={enCarrito || agregando}
              className={`mt-6 px-6 py-3 rounded-lg text-lg font-semibold transition ${
                enCarrito || agregando
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {enCarrito
                ? "Ya en carrito"
                : agregando
                ? "Agregando..."
                : "Agregar al carrito"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LibroDetalle
