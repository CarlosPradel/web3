import { useCarrito } from '../../hooks/useCarrito'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import type { CarritoItem } from '../../types/CarritoItem'
import { X } from 'lucide-react'

interface Props {
  mostrar: boolean
  onClose: () => void
}

const Carrito = ({ mostrar, onClose }: Props) => {
  const { carrito, eliminar } = useCarrito()

  const total = carrito.reduce((acc, item) => acc + Number(item.libro.precio), 0)

  const handleEliminar = (id: number) => {
    eliminar(id)
    toast.info('Libro eliminado del carrito')
  }

  if (!mostrar) return null

  const getImagenUrl = (imagen?: string) => {
    if (!imagen) return ''
    return imagen.startsWith('http')
      ? imagen
      : `http://localhost:8000/${imagen}`
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl p-6 relative">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
          onClick={onClose}
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-center text-blue-700 mb-2">
          Tu carrito de compras
        </h2>
        <div className="text-green-600 font-medium text-center mb-6">
          Producto añadido correctamente a tu carrito de compra
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          <div className="col-span-2 space-y-4 max-h-[300px] overflow-y-auto pr-2">
            {carrito.map((item: CarritoItem) => (
              <div
                key={item.id}
                className="flex items-start gap-4 border border-gray-200 rounded-lg p-4 bg-white shadow-sm"
              >
                <div className="w-20 h-28 bg-white border rounded flex items-center justify-center overflow-hidden">
                  {item.libro.imagen ? (
                    <img
                      src={getImagenUrl(item.libro.imagen)}
                      alt={item.libro.titulo}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-xs text-gray-400">Sin imagen</span>
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="text-base font-semibold text-gray-800 mb-1">
                    {item.libro.titulo}
                  </h3>
                  <p className="text-sm text-gray-600">Cantidad: 1</p>
                  <p className="text-sm font-medium text-blue-700">
                    Precio: Bs{Number(item.libro.precio).toFixed(2)}
                  </p>
                </div>

                <button
                  onClick={() => handleEliminar(item.id)}
                  className="text-sm text-red-600 border border-red-300 px-3 py-1 rounded hover:bg-red-100 transition"
                >
                  Quitar
                </button>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 shadow-sm">
            <h4 className="text-lg font-semibold text-gray-700 mb-3">Resumen del carrito</h4>
            <p className="text-sm text-gray-600">
              Total de productos: {carrito.length}
            </p>
            <p className="text-sm text-gray-600 mb-4">
              Total: <span className="font-bold">Bs{total.toFixed(2)}</span>
            </p>

            <div className="flex flex-col gap-3">
              <Link
                to="/cliente/confirmar-compra"
                className="bg-green-600 hover:bg-green-700 text-white text-center py-2 rounded-lg font-semibold transition"
              >
                Finalizar compra
              </Link>
              <button
                onClick={onClose}
                className="text-center bg-white border border-gray-300 text-gray-800 hover:bg-gray-100 py-2 rounded-lg font-semibold transition"
              >
                Continuar comprando
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Carrito
