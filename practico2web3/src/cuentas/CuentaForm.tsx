import { useNavigate } from 'react-router-dom';
import { createCuenta } from './cuentaService';
import api from '../services/api';

const CuentaForm = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.get('auth/me/');
      const usuario = response.data;

      const cuentaData = {
        usuario: usuario.id,
        saldo: 0,
      };

      await createCuenta(cuentaData);
      alert('Cuenta creada correctamente.');
      navigate('/cuentas');
    } catch (error) {
      console.error('Error al crear la cuenta:', error);
      alert('Hubo un error al crear la cuenta.');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 shadow" style={{ maxWidth: '500px', width: '100%' }}>
        <button
          className="btn btn-outline-secondary mb-3"
          onClick={() => navigate('/cuentas')}
        >
          ← Volver
        </button>
        <h2 className="text-center text-primary mb-4">Crear Nueva Cuenta</h2>
        <form onSubmit={handleSubmit}>
          <p className="text-center text-muted mb-4">
            Al crear una cuenta, se asignará un número automáticamente y el saldo inicial será 0.
          </p>
          <button type="submit" className="btn btn-success w-100">
            Crear cuenta
          </button>
        </form>
      </div>
    </div>
  );
};

export default CuentaForm;
