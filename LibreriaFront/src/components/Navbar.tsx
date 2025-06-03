import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useCarrito } from "../hooks/useCarrito";
import { useState } from "react";
import CarritoModal from "./CarritoModal";

const Navbar = () => {
  const { usuario, logout } = useAuth();
  const { total } = useCarrito();
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  const irAPanel = () => {
    if (!usuario) {
      navigate("/auth/login");
    } else if (usuario.rol === "administrador") {
      navigate("/admin");
    } else {
      navigate("/client");
    }
  };

  return (
    <>
      <nav className="bg-blue-600 text-white p-4 flex justify-between items-center shadow">
        <h1 className="text-xl font-bold cursor-pointer" onClick={irAPanel}>
          Librería
        </h1>

        <div className="flex items-center gap-4">
          {usuario?.rol === "cliente" && (
            <button
              onClick={() => setMostrarCarrito(true)}
              className="relative text-white hover:text-gray-200"
              title="Ver carrito"
            >
              
              {total > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {total}
                </span>
              )}
            </button>
          )}

          {usuario && (
            <div className="text-sm text-right">
              <p>
                {usuario.first_name} {usuario.last_name}
              </p>
              <p className="text-xs italic capitalize">{usuario.rol}</p>
            </div>
          )}

          {usuario ? (
            <button
              onClick={handleLogout}
              className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100"
            >
              Cerrar sesión
            </button>
          ) : (
            <button
              onClick={() => navigate("/auth/login")}
              className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100"
            >
              Iniciar sesión
            </button>
          )}
        </div>
      </nav>
      <CarritoModal mostrar={mostrarCarrito} onClose={() => setMostrarCarrito(false)} />
    </>
  );
};

export default Navbar;
