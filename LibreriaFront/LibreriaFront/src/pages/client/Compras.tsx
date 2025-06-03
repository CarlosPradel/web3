import { useEffect, useState } from 'react'
import { obtenerMisCompras } from '../../services/compras'
import type { Compra, DetalleCompra } from '../../types/Compra'
import { toast } from 'react-toastify'

const Compras = () => {
  const [compras, setCompras] = useState<Compra[]>([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const cargarCompras = async () => {
      try {
        const data = await obtenerMisCompras()
        setCompras(data)
      } catch (error) {
        console.error(error);
        toast.error('Error al obtener las compras.')
      } finally {
        setCargando(false)
      }
    }

    cargarCompras()
  }, [])

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Mis Compras</h2>

      {cargando ? (
        <p className="text-center">Cargando...</p>
      ) : compras.length === 0 ? (
        <p className="text-center text-gray-600">No has realizado compras aún.</p>
      ) : (
        <div className="space-y-6">
          {compras.map((compra) => (
            <div key={compra.id} className="border p-4 rounded shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Compra #{compra.id}</h3>
              <p className="text-sm text-gray-500">Fecha: {new Date(compra.fecha).toLocaleDateString()}</p>
              <p className="text-sm">Total: Bs{Number(compra.total).toFixed(2)}</p>
              <p className="text-sm">Estado: {compra.confirmada ? 'Confirmada' : 'Pendiente'}</p>

              {compra.comprobante_pago && (
                <div className="mt-2">
                  <p className="text-sm font-medium">Comprobante:</p>
                  <img
                    src={compra.comprobante_pago}
                    alt="Comprobante"
                    className="w-48 mt-1 border rounded"
                  />
                </div>
              )}

              <div className="mt-4">
                <p className="font-medium">Detalle:</p>
                <ul className="list-disc list-inside text-sm">
                  {compra.detalles.map((detalle: DetalleCompra) => (
                    <li key={detalle.id}>
                      {detalle.libro.titulo} - ${detalle.precio_unitario}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Compras

