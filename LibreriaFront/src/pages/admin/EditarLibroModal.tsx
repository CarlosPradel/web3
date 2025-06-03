import { useEffect, useState } from "react";
import type { Genero } from "../../types/Genero";
import { toast } from "react-toastify";
import { editarLibro, obtenerLibroPorId } from "../../services/libros";

interface Props {
  libroId: number;
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
  generos: Genero[];
}

const EditarLibroModal = ({ libroId, visible, onClose, onSuccess, generos }: Props) => {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [isbn, setIsbn] = useState("");
  const [imagen, setImagen] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [generosSeleccionados, setGenerosSeleccionados] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (libroId && visible) {
      const cargarLibro = async () => {
        try {
          const libro = await obtenerLibroPorId(libroId);
          setTitulo(libro.titulo);
          setAutor(libro.autor);
          setDescripcion(libro.descripcion);
          setPrecio(libro.precio.toString());
          setIsbn(libro.isbn);
          setGenerosSeleccionados(libro.generos.map((g: Genero) => g.id));
          setPreview(libro.imagen);
        } catch {
          toast.error("Error al cargar el libro");
        }
      };
      cargarLibro();
    }
  }, [libroId, visible]);

  const handleImagenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImagen(file);
    setPreview(file ? URL.createObjectURL(file) : "");
  };

  const handleSubmit = async () => {
    if (!titulo || !autor || !precio || !isbn || generosSeleccionados.length === 0) {
      toast.error("Por favor, completa todos los campos obligatorios.");
      return;
    }

    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("autor", autor);
    formData.append("descripcion", descripcion);
    formData.append("precio", precio);
    formData.append("isbn", isbn);
    if (imagen) formData.append("imagen", imagen); // solo si se subió una nueva
    generosSeleccionados.forEach((id) => formData.append("generos_ids", id.toString()));

    try {
      setLoading(true);
      await editarLibro(libroId, formData);
      toast.success("Libro editado correctamente");
      onClose();
      onSuccess();
    } catch {
      toast.error("Error al editar el libro");
    } finally {
      setLoading(false);
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-2xl w-full">
        <h2 className="text-2xl font-bold text-blue-700 mb-4">Editar Libro</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <textarea
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="border px-4 py-2 rounded col-span-2"
            rows={3}
          />
          <select
            multiple
            value={generosSeleccionados.map(String)}
            onChange={(e) =>
              setGenerosSeleccionados(Array.from(e.target.selectedOptions, (opt) => parseInt(opt.value)))
            }
            className="border px-4 py-2 rounded w-full col-span-2 h-32"
          >
            {generos.map((g) => (
              <option key={g.id} value={g.id}>
                {g.nombre}
              </option>
            ))}
          </select>

          <div className="col-span-2">
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
                className="w-32 h-40 object-cover rounded shadow mt-2"
              />
            )}
          </div>
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
            disabled={loading}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            {loading ? "Guardando..." : "Guardar Cambios"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditarLibroModal;
