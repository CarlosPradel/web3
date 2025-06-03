import { useCarrito } from '../../hooks/useCarrito'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import type { CarritoItem } from '../../types/CarritoItem'

const Carrito = () => {
  const { carrito, eliminar, vaciar } = useCarrito()

  const total = carrito.reduce((acc: number, item: CarritoItem) => acc + Number(item.libro.precio), 0)

  const handleEliminar = (id: number) => {
    eliminar(id)
    toast.info('Libro eliminado del carrito')
  }

  const handleVaciar = () => {
    vaciar()
    toast.warn('Carrito vaciado')
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-center">Carrito de compras</h2>

      {carrito.length === 0 ? (
        <p className="text-center text-gray-600">Tu carrito está vacío.</p>
      ) : (
        <>
          <ul className="divide-y divide-gray-200 mb-6">
            {carrito.map((item: CarritoItem) => (
              <li key={item.id} className="flex justify-between items-center py-4">
                <div>
                  <h3 className="font-semibold">{item.libro.titulo}</h3>
                  <p className="text-sm text-gray-600">Precio: ${item.libro.precio}</p>
                </div>
                <button
                  onClick={() => handleEliminar(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Quitar
                </button>
              </li>
            ))}
          </ul>

          <div className="text-right mb-4">
            <p className="text-lg font-semibold">Total: ${total.toFixed(2)}</p>
          </div>

          <div className="flex justify-between">
            <button
              onClick={handleVaciar}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Vaciar carrito
            </button>
            <Link
              to="/cliente/confirmar-compra"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Confirmar compra
            </Link>
          </div>
        </>
      )}
    </div>
  )
}

export default Carrito
