import { useState, useEffect } from 'react'
import type { ChangeEvent } from 'react'
import { useCarrito } from '../../hooks/useCarrito'
import { confirmarCompra } from '../../services/compras'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const ConfirmarCompra = () => {
  const { carrito, totalPagar, vaciar, cargando, recargar } = useCarrito()
  const [comprobante, setComprobante] = useState<File | null>(null)
  const [confirmando, setConfirmando] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (!cargando && carrito.length === 0) {
      toast.warning('No tienes libros en el carrito.')
      navigate('/carrito')
    }
  }, [carrito, cargando, navigate])

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setComprobante(e.target.files[0])
    }
  }

  const handleConfirmar = async () => {
    if (!comprobante) {
      toast.error('Debes subir un comprobante de pago.')
      return
    }

    try {
      setConfirmando(true)
      const ids = carrito.map(item => item.libro.id)

      await confirmarCompra(ids, comprobante)
      toast.success('Compra realizada correctamente')
      vaciar()
      recargar()
      navigate('/cliente/compras')
    } catch {
      toast.error('Ocurrió un error al confirmar la compra')
    } finally {
      setConfirmando(false)
    }
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-center">Confirmar Compra</h2>

      <div className="border p-4 rounded shadow-sm mb-4">
        <h3 className="text-xl font-semibold mb-2">Resumen</h3>
        <ul className="list-disc list-inside mb-2">
          {carrito.map(item => (
            <li key={item.id}>{item.libro.titulo} - Bs{item.libro.precio}</li>
          ))}
        </ul>
        <p className="font-medium text-right">Total a pagar: Bs{totalPagar.toFixed(2)}</p>
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-medium">Comprobante de pago (imagen):</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <div className="text-center">
        <button
          onClick={handleConfirmar}
          disabled={confirmando}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {confirmando ? 'Procesando...' : 'Confirmar Compra'}
        </button>
      </div>
    </div>
  )
}

export default ConfirmarCompra
