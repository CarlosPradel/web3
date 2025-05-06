import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCuentas, deleteCuenta } from './cuentaService';

interface Cuenta {
  id: string;
  numero_cuenta: string;
  saldo: number | string | null;
}

const CuentaList = () => {
  const [cuentas, setCuentas] = useState<Cuenta[]>([]);
  const navigate = useNavigate();

  const cargarCuentas = async () => {
    try {
      const cuentasActualizadas = await getCuentas();
      setCuentas(cuentasActualizadas);
    } catch (error) {
      console.error('Error al cargar cuentas:', error);
    }
  };

  useEffect(() => {
    cargarCuentas();

    const handleFocus = () => {
      cargarCuentas();
    };

    window.addEventListener('focus', handleFocus);
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteCuenta(id);
      setCuentas((prev) => prev.filter((cuenta) => cuenta.id !== id));
    } catch (error) {
      console.error('Error al eliminar cuenta:', error);
    }
  };

  return (
    <div className="container mt-5">
      <button
        className="btn btn-outline-secondary mb-3"
        onClick={() => navigate('/dashboard')}
      >
        ← Volver al Dashboard
      </button>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary">Mis Cuentas</h2>
        <button className="btn btn-success" onClick={() => navigate('/cuentas/crear')}>
          Crear nueva cuenta
        </button>
      </div>

      <table className="table table-hover table-bordered shadow-sm">
        <thead className="table-light">
          <tr>
            <th>Número de Cuenta</th>
            <th>Saldo</th>
            <th className="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cuentas.map((cuenta) => (
            <tr key={cuenta.id}>
              <td>{cuenta.numero_cuenta}</td>
              <td>
                Bs{' '}
                {cuenta.saldo != null
                  ? Number(cuenta.saldo).toFixed(2)
                  : '0.00'}
              </td>
              <td className="text-center">
                <button
                  className="btn btn-outline-info btn-sm me-2"
                  onClick={() => navigate(`/cuentas/${cuenta.id}/movimientos`)}
                >
                  Ver movimientos
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(cuenta.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
          {cuentas.length === 0 && (
            <tr>
              <td colSpan={3} className="text-center text-muted">
                No tienes cuentas registradas.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CuentaList;
