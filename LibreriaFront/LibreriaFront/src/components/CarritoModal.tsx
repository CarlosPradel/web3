import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { useCarrito } from "../hooks/useCarrito";
import type { CarritoItem } from "../types/CarritoItem";

interface Props {
  mostrar: boolean;
  onClose: () => void;
}

const CarritoModal = ({ mostrar, onClose }: Props) => {
  const { carrito, eliminar, vaciar, totalPagar, recargar } = useCarrito();
  const navigate = useNavigate();

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        recargar();
        onClose();
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose, recargar]);

  if (!mostrar) return null;

  const handleVaciar = async () => {
    await vaciar();
    await recargar();
    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-end z-50">
      <div className="bg-white w-full max-w-md h-full p-4 shadow-lg overflow-y-auto">
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-xl font-semibold">🛒 Carrito</h2>
          <button
            onClick={() => {
              recargar();
              onClose();
            }}
            className="text-gray-600 hover:text-black text-2xl"
          >
            &times;
          </button>
        </div>

        {carrito.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">Tu carrito está vacío.</p>
        ) : (
          <div className="space-y-4">
            {carrito.map((item: CarritoItem) => (
              <div key={item.id} className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{item.libro.titulo}</p>
                  <p className="text-sm text-gray-500">Bs{item.libro.precio}</p>
                </div>
                <button
                  onClick={() => eliminar(item.id)}
                  className="text-red-500 text-sm hover:underline"
                >
                  Quitar
                </button>
              </div>
            ))}

            <hr />

            <div className="text-right font-semibold">
              Total: Bs{totalPagar.toFixed(2)}
            </div>

            <button
              onClick={() => {
                recargar();
                navigate("/cliente/confirmar-compra");
                onClose();
              }}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mt-2"
            >
              Confirmar compra
            </button>

            <button
              onClick={handleVaciar}
              className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 mt-2"
            >
              Vaciar carrito
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default CarritoModal;
