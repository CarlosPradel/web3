import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { obtenerMisCompras } from '../../services/compras'
import type { Compra, DetalleCompra } from '../../types/Compra'
import { toast } from 'react-toastify'
import { ArrowLeftCircle } from 'lucide-react'
import { QRCodeCanvas } from 'qrcode.react'

const Compras = () => {
  const [compras, setCompras] = useState<Compra[]>([])
  const [cargando, setCargando] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const cargarCompras = async () => {
      try {
        const data = await obtenerMisCompras()
        setCompras(data)
      } catch (error) {
        console.error(error)
        toast.error('Error al obtener las compras.')
      } finally {
        setCargando(false)
      }
    }

    cargarCompras()
  }, [])

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-blue-100 via-white to-blue-100 px-6 py-10">
      <div className="max-w-5xl mx-auto relative">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-0 left-0 text-blue-600 hover:text-blue-800 flex items-center gap-2 mb-6"
        >
          <ArrowLeftCircle className="w-6 h-6" />
          <span className="font-medium">Volver</span>
        </button>

        <h2 className="text-3xl font-extrabold text-blue-700 text-center mb-12">
          Mis Compras
        </h2>

        {cargando ? (
          <p className="text-center text-gray-600">Cargando...</p>
        ) : compras.length === 0 ? (
          <p className="text-center text-gray-500">No has realizado compras aún.</p>
        ) : (
          <div className="space-y-6">
            {compras.map((compra) => (
              <div
                key={compra.id}
                className="bg-white border border-gray-200 rounded-xl shadow-md p-6"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                  <h3 className="text-xl font-semibold text-blue-700">
                    Compra #{compra.id}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Fecha: {new Date(compra.fecha).toLocaleDateString()}
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-1 text-sm text-gray-700">
                    <p><strong>Total:</strong> Bs{Number(compra.total).toFixed(2)}</p>
                    <p>
                      <strong>Estado:</strong>{' '}
                      <span className={compra.confirmada ? 'text-green-600 font-semibold' : 'text-yellow-600 font-semibold'}>
                        {compra.confirmada ? 'Confirmada' : 'Pendiente'}
                      </span>
                    </p>
                  </div>

                  {compra.comprobante_pago && (
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">Comprobante:</p>
                      <img
                        src={compra.comprobante_pago}
                        alt="Comprobante"
                        className="w-40 h-auto border rounded shadow-sm"
                      />
                    </div>
                  )}

                  {compra.qr_generado && (
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">Código QR:</p>
                      <QRCodeCanvas
                        value={compra.qr_generado}
                        size={100}
                        level="H"
                        includeMargin
                        className="border rounded shadow p-2 bg-white"
                      />
                    </div>
                  )}
                </div>

                <div className="mt-4">
                  <p className="font-semibold text-gray-800 mb-2">Detalle de libros:</p>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    {compra.detalles.map((detalle: DetalleCompra) => (
                      <li key={detalle.id}>
                        {detalle.libro.titulo} - Bs{Number(detalle.precio_unitario).toFixed(2)}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Compras
