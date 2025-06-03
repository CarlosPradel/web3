import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import type { Genero } from "../../types/Genero";
import { toast } from "react-toastify";
import { BookOpenCheck, Pencil, Trash2, Check, X } from "lucide-react";

const AdminGeneros = () => {
  const [generos, setGeneros] = useState<Genero[]>([]);
  const [nombre, setNombre] = useState("");
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [nombreEditado, setNombreEditado] = useState("");

  const navigate = useNavigate();

  const cargar = async () => {
    try {
      const res = await api.get<Genero[]>("/admin/generos/");
      setGeneros(res.data);
    } catch {
      toast.error("Error al cargar géneros");
    }
  };

  const crear = async () => {
    if (nombre.trim()) {
      try {
        await api.post("/admin/generos/", { nombre });
        setNombre("");
        toast.success("Género creado");
        cargar();
      } catch {
        toast.error("Error al crear género");
      }
    }
  };

  const eliminar = async (id: number) => {
    const confirmar = window.confirm("¿Estás seguro de eliminar este género?");
    if (!confirmar) return;

    try {
      await api.delete(`/admin/generos/${id}/`);
      toast.success("Género eliminado");
      cargar();
    } catch {
      toast.error("Error al eliminar género");
    }
  };

  const comenzarEdicion = (genero: Genero) => {
    setEditandoId(genero.id);
    setNombreEditado(genero.nombre);
  };

  const cancelarEdicion = () => {
    setEditandoId(null);
    setNombreEditado("");
  };

  const guardarEdicion = async (id: number) => {
    try {
      await api.put(`/admin/generos/${id}/`, { nombre: nombreEditado });
      toast.success("Género actualizado");
      cancelarEdicion();
      cargar();
    } catch {
      toast.error("Error al actualizar género");
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-blue-100 via-white to-blue-100 flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-3xl bg-white shadow-2xl rounded-3xl p-8">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="text-blue-700 hover:underline font-medium"
          >
          Volver
          </button>
          <div className="flex flex-col items-center flex-1">
            <BookOpenCheck className="w-12 h-12 text-blue-600 mb-2" />
            <h2 className="text-3xl font-extrabold text-blue-700">Gestión de Géneros</h2>
          </div>
          <div className="w-20" />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center mb-6">
          <input
            type="text"
            placeholder="Nuevo género"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={crear}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-base font-medium"
          >
            Crear
          </button>
        </div>

        {generos.length === 0 ? (
          <p className="text-center text-gray-500">No hay géneros registrados.</p>
        ) : (
          <ul className="space-y-3">
            {generos.map((g) => (
              <li
                key={g.id}
                className="flex justify-between items-center bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 shadow-sm"
              >
                {editandoId === g.id ? (
                  <input
                    value={nombreEditado}
                    onChange={(e) => setNombreEditado(e.target.value)}
                    className="flex-1 mr-3 px-3 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <span className="text-gray-800 font-medium flex-1">{g.nombre}</span>
                )}

                <div className="flex gap-2 items-center">
                  {editandoId === g.id ? (
                    <>
                      <button
                        onClick={() => guardarEdicion(g.id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded"
                      >
                        <Check size={16} />
                      </button>
                      <button
                        onClick={cancelarEdicion}
                        className="bg-gray-400 hover:bg-gray-500 text-white px-2 py-1 rounded"
                      >
                        <X size={16} />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => comenzarEdicion(g)}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => eliminar(g.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                      >
                        <Trash2 size={16} />
                      </button>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminGeneros;
