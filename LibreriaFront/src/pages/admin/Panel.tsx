import { useNavigate } from "react-router-dom";
import { LayoutDashboard, LogOut } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

const Panel = () => {
  const navigate = useNavigate();
  const { logout, usuario } = useAuth();

  const secciones = [
    { nombre: "Géneros", ruta: "/admin/generos" },
    { nombre: "Libros", ruta: "/admin/libros" },
    { nombre: "Ventas", ruta: "/admin/ventas" },
    { nombre: "Usuarios", ruta: "/admin/usuarios" },
  ];

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-blue-100 via-white to-blue-100 px-6 py-10 flex items-center justify-center">
      <div className="w-full max-w-5xl bg-white shadow-2xl rounded-3xl p-10 relative">


        <button
          onClick={logout}
          className="absolute top-6 right-6 flex items-center gap-2 text-red-600 hover:text-red-800 font-medium transition"
        >
          <LogOut className="w-5 h-5" />
          Cerrar sesión
        </button>


        <div className="flex flex-col items-center justify-center text-center mb-10">
          <LayoutDashboard className="w-16 h-16 text-blue-600 mb-4" />
          <h1 className="text-4xl font-extrabold text-blue-700">Panel de Administración</h1>
          <p className="text-gray-600 mt-2 text-lg">
            {usuario?.first_name ? `Hola, ${usuario.first_name}. ` : ''}
            Gestiona el sistema de la librería
          </p>
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
          {secciones.map((sec) => (
            <button
              key={sec.ruta}
              onClick={() => navigate(sec.ruta)}
              className="bg-blue-600 text-white py-4 px-6 rounded-xl shadow-md hover:bg-blue-700 text-xl font-semibold transition"
            >
              {sec.nombre}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Panel;
