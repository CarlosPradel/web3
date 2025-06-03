import { ShoppingCart } from 'lucide-react'
import { useState } from 'react'
import { useCarrito } from '../hooks/useCarrito'
import Carrito from '../pages/client/Carrito'

const CarritoIcono = () => {
  const { carrito } = useCarrito()
  const [mostrarModal, setMostrarModal] = useState(false)

  return (
    <>
      <button
        onClick={() => setMostrarModal(true)}
        className="fixed bottom-6 right-6 bg-white shadow-lg border border-gray-200 p-3 rounded-full text-blue-700 hover:text-blue-900 transition z-50"
        title="Ver carrito"
      >
        <div className="relative">
          <ShoppingCart size={28} />
          {carrito.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-2">
              {carrito.length}
            </span>
          )}
        </div>
      </button>

      <Carrito mostrar={mostrarModal} onClose={() => setMostrarModal(false)} />
    </>
  )
}

export default CarritoIcono
