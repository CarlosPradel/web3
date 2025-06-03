import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { login as loginService } from '../../services/auth'
import { useAuth } from '../../hooks/useAuth'
import { UserCircle } from 'lucide-react'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { login: loginContext } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setError('')
      const { token, usuario } = await loginService(email, password)
      loginContext(token, usuario)

      setTimeout(() => {
        if (usuario.rol === 'administrador') {
          navigate('/admin')
        } else {
          navigate('/client')
        }
      }, 0)
    } catch {
      setError('Credenciales inválidas')
    }
  }

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-100 px-6">
      <div className="flex flex-col items-center justify-center text-center w-full max-w-[1200px] bg-white p-10 rounded-3xl shadow-2xl">
        <UserCircle className="w-24 h-24 text-blue-600 mb-4" />
        <h2 className="text-4xl font-extrabold text-blue-700 mb-6">
          Iniciar Sesión
        </h2>

        {error && (
          <p className="text-red-500 text-center mb-4 font-medium">{error}</p>
        )}

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xl space-y-5"
        >
          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg hover:bg-blue-700 transition"
          >
            Iniciar Sesión
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-600">¿No tienes cuenta?</p>
          <Link
            to="/auth/register"
            className="text-blue-600 font-semibold hover:underline"
          >
            Registrarse
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
