import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import type { Libro } from "../../types/Libro";
import type { Genero } from "../../types/Genero";
import { toast } from "react-toastify";
import { Trash2, Plus, Edit2 } from "lucide-react";
import CrearLibroModal from "./CrearLibroModal";
import EditarLibroModal from "./EditarLibroModal";

const AdminLibros = () => {
  const [libros, setLibros] = useState<Libro[]>([]);
  const [generos, setGeneros] = useState<Genero[]>([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [libroEditarId, setLibroEditarId] = useState<number | null>(null);

  const navigate = useNavigate();

  const cargarDatos = async () => {
    try {
      const [resLibros, resGeneros] = await Promise.all([
        api.get<Libro[]>("/admin/libros/"),
        api.get<Genero[]>("/admin/generos/"),
      ]);
      setLibros(resLibros.data);
      setGeneros(resGeneros.data);
    } catch {
      toast.error("Error al cargar datos");
    }
  };

  const eliminar = async (id: number) => {
    const confirmar = window.confirm("¿Estás seguro de eliminar este libro?");
    if (!confirmar) return;

    try {
      await api.delete(`/admin/libros/${id}/`);
      toast.success("Libro eliminado");
      cargarDatos();
    } catch {
      toast.error("Error al eliminar libro");
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-blue-100 via-white to-blue-100 px-6 py-10">
      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-3xl p-8">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="text-blue-700 hover:underline font-medium"
          >
            Volver
          </button>

          <h2 className="text-3xl font-extrabold text-blue-700 text-center flex-1">
            Gestión de Libros
          </h2>

          <button
            onClick={() => setMostrarModal(true)}
            className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg flex items-center gap-2 transition-colors duration-200 shadow-lg"
          >
            <Plus size={20} /> Crear libro
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {libros.map((libro) => (
            <li
              key={libro.id}
              className="list-none border bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200"
            >
              <div className="flex gap-4">
                {libro.imagen && (
                  <img
                    src={libro.imagen}
                    alt={libro.titulo}
                    className="w-32 h-40 object-cover rounded-lg shadow-md"
                  />
                )}
                <div className="flex-1">
                  <h3 className="font-bold text-xl text-gray-800 mb-2">{libro.titulo}</h3>
                  <div className="space-y-1 text-gray-600">
                    <p>
                      <span className="font-medium">Autor:</span> {libro.autor}
                    </p>
                    <p>
                      <span className="font-medium">Precio:</span> Bs{libro.precio}
                    </p>
                    <p>
                      <span className="font-medium">ISBN:</span> {libro.isbn}
                    </p>
                    <p className="flex flex-wrap gap-1">
                      <span className="font-medium">Géneros:</span>
                      {libro.generos.map((g) => (
                        <span
                          key={g.id}
                          className="inline-block bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded"
                        >
                          {g.nombre}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mt-4 justify-end">
                <button
                  onClick={() => setLibroEditarId(libro.id)}
                  className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <Edit2 size={16} />
                  Editar
                </button>
                <button
                  onClick={() => eliminar(libro.id)}
                  className="flex items-center gap-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
                >
                  <Trash2 size={16} />
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </div>
      </div>

      <CrearLibroModal
        visible={mostrarModal}
        onClose={() => setMostrarModal(false)}
        onSuccess={cargarDatos}
        generos={generos}
      />

      {libroEditarId !== null && (
        <EditarLibroModal
          libroId={libroEditarId}
          visible={libroEditarId !== null}
          onClose={() => setLibroEditarId(null)}
          onSuccess={() => {
            setLibroEditarId(null);
            cargarDatos();
          }}
          generos={generos}
        />
      )}
    </div>
  );
};

export default AdminLibros;
