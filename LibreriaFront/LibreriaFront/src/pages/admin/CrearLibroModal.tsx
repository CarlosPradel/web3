import { useState } from "react";
import type { Genero } from "../../types/Genero";
import { toast } from "react-toastify";
import api from "../../services/api";

interface Props {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
  generos: Genero[];
}

const CrearLibroModal = ({ visible, onClose, onSuccess, generos }: Props) => {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [isbn, setIsbn] = useState("");
  const [imagen, setImagen] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [generosSeleccionados, setGenerosSeleccionados] = useState<number[]>([]);

  const handleImagenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImagen(file || null);
    if (file) setPreview(URL.createObjectURL(file));
    else setPreview("");
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("autor", autor);
    formData.append("descripcion", descripcion);
    formData.append("precio", precio);
    formData.append("isbn", isbn);
    if (imagen) formData.append("imagen", imagen);
    generosSeleccionados.forEach((id) => formData.append("generos", id.toString()));

    try {
      await api.post("/admin/libros/", formData);
      toast.success("Libro creado correctamente");
      onClose();
      onSuccess();
      resetForm();
    } catch {
      toast.error("Error al crear el libro");
    }
  };

  const resetForm = () => {
    setTitulo("");
    setAutor("");
    setDescripcion("");
    setPrecio("");
    setIsbn("");
    setImagen(null);
    setPreview("");
    setGenerosSeleccionados([]);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-xl w-full">
        <h2 className="text-2xl font-bold text-blue-700 mb-4">Crear Nuevo Libro</h2>
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            placeholder="Título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="border px-4 py-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Autor"
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
            className="border px-4 py-2 rounded w-full"
          />
          <textarea
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="border px-4 py-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Precio"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            className="border px-4 py-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="ISBN"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            className="border px-4 py-2 rounded w-full"
          />
          <select
            multiple
            value={generosSeleccionados.map(String)}
            onChange={(e) => {
              const values = Array.from(e.target.selectedOptions, (opt) => parseInt(opt.value));
              setGenerosSeleccionados(values);
            }}
            className="border px-4 py-2 rounded w-full h-32"
          >
            {generos.map((g) => (
              <option key={g.id} value={g.id}>
                {g.nombre}
              </option>
            ))}
          </select>
          <input
            type="file"
            accept="image/*"
            onChange={handleImagenChange}
            className="border px-4 py-2 rounded w-full"
          />
          {preview && (
            <img
              src={preview}
              alt="Vista previa"
              className="w-32 h-40 object-cover rounded shadow mx-auto"
            />
          )}
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CrearLibroModal;
