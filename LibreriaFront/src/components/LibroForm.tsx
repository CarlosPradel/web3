import { useEffect, useState } from 'react'
import { obtenerGeneros } from '../services/generos'
import type { Genero } from '../types/Genero'
import type { Libro } from '../types/Libro'

interface Props {
  initial?: Libro | null
  onSubmit: (formData: FormData) => void
  loading?: boolean
}

const LibroForm = ({ initial = null, onSubmit, loading }: Props) => {
  const [titulo, setTitulo] = useState(initial?.titulo || '')
  const [autor, setAutor] = useState(initial?.autor || '')
  const [precio, setPrecio] = useState(initial?.precio?.toString() || '')
  const [isbn, setIsbn] = useState(initial?.isbn || '')
  const [descripcion, setDescripcion] = useState(initial?.descripcion || '')
  const [generosIds, setGenerosIds] = useState<number[]>(initial?.generos?.map(g => g.id) || [])
  const [imagen, setImagen] = useState<File | null>(null)
  const [generos, setGeneros] = useState<Genero[]>([])

  useEffect(() => {
    const fetchGeneros = async () => {
      const data = await obtenerGeneros()
      setGeneros(data)
    }
    fetchGeneros()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('titulo', titulo)
    formData.append('autor', autor)
    formData.append('precio', precio)
    formData.append('isbn', isbn)
    formData.append('descripcion', descripcion)
    generosIds.forEach(id => formData.append('generos_ids', id.toString()))
    if (imagen) formData.append('imagen', imagen)

    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={e => setTitulo(e.target.value)}
        className="w-full border px-4 py-2 rounded"
        required
      />
      <input
        type="text"
        placeholder="Autor"
        value={autor}
        onChange={e => setAutor(e.target.value)}
        className="w-full border px-4 py-2 rounded"
        required
      />
      <input
        type="number"
        step="0.01"
        placeholder="Precio"
        value={precio}
        onChange={e => setPrecio(e.target.value)}
        className="w-full border px-4 py-2 rounded"
        required
      />
      <input
        type="text"
        placeholder="ISBN"
        value={isbn}
        onChange={e => setIsbn(e.target.value)}
        className="w-full border px-4 py-2 rounded"
        required
      />
      <textarea
        placeholder="Descripción"
        value={descripcion}
        onChange={e => setDescripcion(e.target.value)}
        className="w-full border px-4 py-2 rounded"
        rows={4}
      />

      <select
        multiple
        value={generosIds.map(String)}
        onChange={e =>
          setGenerosIds(Array.from(e.target.selectedOptions, opt => Number(opt.value)))
        }
        className="w-full border px-4 py-2 rounded"
      >
        {generos.map(genero => (
          <option key={genero.id} value={genero.id}>
            {genero.nombre}
          </option>
        ))}
      </select>

      <input
        type="file"
        accept="image/*"
        onChange={e => setImagen(e.target.files?.[0] || null)}
        className="w-full"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        {loading ? 'Guardando...' : 'Guardar'}
      </button>
    </form>
  )
}

export default LibroForm
