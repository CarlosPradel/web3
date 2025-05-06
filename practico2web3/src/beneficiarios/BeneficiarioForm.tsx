import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBeneficiario } from './beneficiarioService';
import { getUsuariosDisponibles } from '../auth/authService';
import { getCuentasUsuario } from '../cuentas/cuentaService';

interface Usuario {
  id: string;
  username: string;
}

interface Cuenta {
  id: string;
  numero_cuenta: string;
  saldo: number;
}

const BeneficiarioForm = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [cuentas, setCuentas] = useState<Cuenta[]>([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState('');
  const [cuentaSeleccionada, setCuentaSeleccionada] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getUsuariosDisponibles().then(setUsuarios);
  }, []);

  useEffect(() => {
    if (usuarioSeleccionado) {
      getCuentasUsuario(usuarioSeleccionado).then(setCuentas);
    } else {
      setCuentas([]);
      setCuentaSeleccionada('');
    }
  }, [usuarioSeleccionado]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!usuarioSeleccionado || !cuentaSeleccionada) {
      setMensaje('Selecciona un usuario y una cuenta.');
      return;
    }

    try {
      await createBeneficiario({
        beneficiario: usuarioSeleccionado,
        cuenta_destino: cuentaSeleccionada,
      });
      alert('Beneficiario agregado correctamente.');
      navigate('/beneficiarios');
    } catch (error) {
      console.error('Error al crear beneficiario:', error);
      setMensaje('Hubo un error al crear el beneficiario.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <button
          className="btn btn-outline-secondary mb-3"
          onClick={() => navigate('/beneficiarios')}
        >
          ← Volver
        </button>

        <h3 className="text-center mb-4 text-primary">Agregar Beneficiario</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="usuario" className="form-label">Seleccionar Usuario</label>
            <select
              id="usuario"
              className="form-select"
              value={usuarioSeleccionado}
              onChange={(e) => setUsuarioSeleccionado(e.target.value)}
            >
              <option value="">-- Selecciona un usuario --</option>
              {usuarios.map((u) => (
                <option key={u.id} value={u.id}>{u.username}</option>
              ))}
            </select>
          </div>

          {cuentas.length > 0 && (
            <div className="mb-3">
              <label htmlFor="cuenta" className="form-label">Seleccionar Cuenta</label>
              <select
                id="cuenta"
                className="form-select"
                value={cuentaSeleccionada}
                onChange={(e) => setCuentaSeleccionada(e.target.value)}
              >
                <option value="">-- Selecciona una cuenta --</option>
                {cuentas.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.numero_cuenta} - Bs {Number(c.saldo).toFixed(2)}
                  </option>
                ))}
              </select>
            </div>
          )}

          {mensaje && <div className="alert alert-warning text-center">{mensaje}</div>}

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">Agregar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BeneficiarioForm;
