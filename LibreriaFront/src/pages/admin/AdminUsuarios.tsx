import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import type { Usuario } from "../../types/Usuario";
import { UserCircle } from "lucide-react";
import { toast } from "react-toastify";

const AdminUsuarios = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const navigate = useNavigate();

  const cargar = async () => {
    try {
      const res = await api.get<Usuario[]>("/admin/usuarios/");
      setUsuarios(res.data);
    } catch {
      toast.error("Error al cargar usuarios");
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-blue-100 via-white to-blue-100 px-6 py-10">
      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-3xl p-8">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate(-1)}
            className="text-blue-700 hover:underline font-medium"
          >
          Volver
          </button>
          <div className="flex items-center gap-3 flex-1 justify-center">
            <UserCircle className="w-10 h-10 text-blue-600" />
            <h2 className="text-3xl font-extrabold text-blue-700">
              Gestión de Usuarios
            </h2>
          </div>
          <div className="w-20" />
        </div>

        <div className="overflow-hidden rounded-xl shadow-lg border">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left border-b">
                <th className="px-6 py-4 font-semibold text-gray-700">Nombre</th>
                <th className="px-6 py-4 font-semibold text-gray-700">Correo</th>
                <th className="px-6 py-4 font-semibold text-gray-700">Rol</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {usuarios.map((usuario) => (
                <tr 
                  key={usuario.id} 
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-900">
                      {usuario.first_name} {usuario.last_name}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {usuario.email}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium
                      ${usuario.rol === 'administrador' 
                        ? 'bg-purple-100 text-purple-700' 
                        : 'bg-blue-100 text-blue-700'}
                    `}>
                      {usuario.rol}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsuarios;
