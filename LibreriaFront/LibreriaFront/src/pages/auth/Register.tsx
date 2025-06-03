import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { registrarUsuario } from '../../services/auth'
import { useAuth } from '../../hooks/useAuth'
import { UserPlus } from 'lucide-react'

const Register = () => {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    rol: 'cliente' as const
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { token, usuario } = await registrarUsuario(form)
      login(token, usuario)
      toast.success('Registro exitoso')
      navigate('/cliente/panel')
    } catch (error) {
      console.error('Error al registrar usuario:', error)
      toast.error('Error al registrar usuario')
    }
  }

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-100 px-6">
      <div className="flex flex-col items-center justify-center w-full max-w-[1200px] bg-white rounded-3xl shadow-2xl p-10">
        <UserPlus className="w-20 h-20 text-blue-600 mb-4" />
        <h2 className="text-4xl font-extrabold text-blue-700 mb-6 text-center">
          Registro de Cliente
        </h2>

        <form onSubmit={handleSubmit} className="w-full max-w-xl space-y-5">
          <input
            type="text"
            name="first_name"
            placeholder="Nombre"
            value={form.first_name}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="last_name"
            placeholder="Apellido"
            value={form.last_name}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg hover:bg-blue-700 transition"
          >
            Registrarse
          </button>

          <div className="text-center">
            <p className="text-gray-600">¿Ya tienes una cuenta?</p>
            <Link to="/auth/login" className="text-blue-600 font-semibold hover:underline">
              Iniciar sesión
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
