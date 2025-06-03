import { useEffect, useState } from "react";
import api from "../../services/api";
import type { Compra } from "../../types/Compra";
import { Check, UserCircle, Image as ImageIcon, QrCode, X } from "lucide-react";
import { toast } from "react-toastify";

const AdminVentas = () => {
  const [ventas, setVentas] = useState<Compra[]>([]);
  const [imagenSeleccionada, setImagenSeleccionada] = useState<string | null>(null);

  const cargar = async () => {
    try {
      const res = await api.get<Compra[]>("/admin/ventas/");
      setVentas(res.data);
    } catch {
      toast.error("Error al cargar las ventas");
    }
  };

  const confirmarVenta = async (id: number) => {
    try {
      await api.post(`/admin/ventas/${id}/confirmar/`);
      toast.success("Venta confirmada exitosamente");
      cargar();
    } catch {
      toast.error("Error al confirmar la venta");
    }
  };

  const verImagen = (url: string) => {
    setImagenSeleccionada(`http://localhost:8000${url}`);
  };

  useEffect(() => {
    cargar();
  }, []);

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-blue-100 via-white to-blue-100 px-6 py-10">
      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-3xl p-8">
        <div className="flex items-center gap-4 mb-8">
          <UserCircle className="w-10 h-10 text-blue-600" />
          <h2 className="text-3xl font-extrabold text-blue-700">Ventas realizadas</h2>
        </div>

        <div className="grid gap-6">
          {ventas.map((venta) => (
            <div key={venta.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Venta #{venta.id}</h3>
                  <p className="text-gray-600">{new Date(venta.fecha).toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">
                    ${Number(venta.total).toFixed(2)}
                  </div>
                  <div className="mt-2">
                    <span className={`px-4 py-1 rounded-full text-sm font-medium
                      ${venta.confirmada 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'}`}
                    >
                      {venta.confirmada ? "Confirmada" : "Pendiente"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mt-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-700 flex items-center gap-2">
                    <ImageIcon size={18} />
                    Libros comprados:
                  </h4>
                  <ul className="space-y-2">
                    {venta.detalles?.map((detalle) => (
                      <li key={detalle.id} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                        <span className="text-gray-700">{detalle.libro.titulo}</span>
                        <span className="font-medium">${detalle.precio_unitario}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-700 flex items-center gap-2">
                    <QrCode size={18} />
                    Código QR:
                  </h4>
                  {venta.qr_generado ? (
                    <div className="relative group">
                      <button 
                        onClick={() => verImagen(venta.qr_generado)}
                        className="w-32 h-32 bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-shadow flex items-center justify-center"
                      >
                        <img
                          src={`http://localhost:8000${venta.qr_generado}`}
                          alt="Código QR"
                          className="max-w-full max-h-full object-contain p-2"
                        />
                      </button>
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity rounded-lg" />
                    </div>
                  ) : (
                    <div className="w-32 h-32 border rounded-lg flex items-center justify-center bg-gray-50">
                      <p className="text-gray-500 italic text-sm text-center px-2">QR no generado</p>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-700 flex items-center gap-2">
                    <ImageIcon size={18} />
                    Comprobante de pago:
                  </h4>
                  {venta.comprobante_pago ? (
                    <div className="relative group">
                      <button 
                        onClick={() => verImagen(venta.comprobante_pago!)}
                        className="w-32 h-32 bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-shadow flex items-center justify-center"
                      >
                        <img
                          src={`http://localhost:8000${venta.comprobante_pago}`}
                          alt="Comprobante"
                          className="max-w-full max-h-full object-contain p-2"
                        />
                      </button>
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity rounded-lg" />
                    </div>
                  ) : (
                    <div className="w-32 h-32 border rounded-lg flex items-center justify-center bg-gray-50">
                      <p className="text-gray-500 italic text-sm text-center px-2">Sin comprobante</p>
                    </div>
                  )}
                </div>
              </div>

              {!venta.confirmada && (
                <div className="mt-6 flex justify-end gap-4">
                  <button
                    onClick={() => confirmarVenta(venta.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Check size={18} />
                    Confirmar venta
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modal para ver imagen */}
      {imagenSeleccionada && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setImagenSeleccionada(null)}
        >
          <div 
            className="relative max-w-4xl max-h-[90vh] bg-white rounded-lg p-4"
            onClick={e => e.stopPropagation()}
          >
            <img
              src={imagenSeleccionada}
              alt="Imagen ampliada"
              className="max-w-full max-h-[85vh] object-contain rounded bg-white"
            />
            <button 
              className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 shadow-lg"
              onClick={() => setImagenSeleccionada(null)}
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminVentas;