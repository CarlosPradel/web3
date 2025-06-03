import { useState, useEffect } from 'react'
import type { ChangeEvent } from 'react'
import { useCarrito } from '../../hooks/useCarrito'
import { confirmarCompra } from '../../services/compras'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ArrowLeftCircle } from 'lucide-react'

const ConfirmarCompra = () => {
  const { carrito, totalPagar, vaciar, cargando, recargar } = useCarrito()
  const [comprobante, setComprobante] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [confirmando, setConfirmando] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (!cargando && carrito.length === 0) {
      toast.warning('No tienes libros en el carrito.')
      navigate('/libros')
    }
  }, [carrito, cargando, navigate])

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setComprobante(file)
      setPreview(URL.createObjectURL(file))
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
    <div className="min-h-screen w-screen bg-gradient-to-br from-blue-100 via-white to-blue-100 px-6 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl p-8 relative">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 text-blue-600 hover:text-blue-800 flex items-center gap-2"
        >
          <ArrowLeftCircle className="w-6 h-6" />
          <span className="font-medium">Volver</span>
        </button>

        <h2 className="text-3xl font-extrabold text-blue-700 mb-6 text-center">
          Confirmar Compra
        </h2>

        <div className="mb-8 border border-gray-200 rounded-xl p-6 bg-gray-50 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Resumen de tu pedido</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-700 mb-4">
            {carrito.map(item => (
              <li key={item.id}>
                <span className="font-medium">{item.libro.titulo}</span> - Bs{item.libro.precio}
              </li>
            ))}
          </ul>
          <p className="text-right text-lg font-bold text-blue-700">
            Total a pagar: Bs{totalPagar.toFixed(2)}
          </p>
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-gray-700 font-medium">
            Comprobante de pago (imagen):
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          {preview && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-1">Vista previa:</p>
              <img
                src={preview}
                alt="Comprobante"
                className="w-52 rounded border shadow"
              />
            </div>
          )}
        </div>

        <div className="text-center">
          <button
            onClick={handleConfirmar}
            disabled={confirmando}
            className={`w-full md:w-auto px-8 py-3 rounded-xl font-semibold text-white transition ${
              confirmando
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {confirmando ? 'Procesando...' : 'Confirmar Compra'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmarCompra
