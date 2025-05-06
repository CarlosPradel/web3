import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovimientosPorCuenta } from '../movimientos/movimientoService';

interface Movimiento {
  id: string;
  tipo: string;
  monto: number;
  fecha: string;
}

const CuentaMovimientos = () => {
  const { id } = useParams<{ id: string }>();
  const [movimientos, setMovimientos] = useState<Movimiento[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const cargarMovimientos = async () => {
      try {
        const data = await getMovimientosPorCuenta(id!);
        setMovimientos(data);
      } catch (error) {
        console.error('Error al obtener movimientos:', error);
      } finally {
        setLoading(false);
      }
    };

    cargarMovimientos();
  }, [id]);

  return (
    <div className="container mt-5">
      <button
        className="btn btn-outline-secondary mb-3"
        onClick={() => navigate('/cuentas')}
      >
        ← Volver
      </button>

      <h2 className="text-primary mb-4">Movimientos de la Cuenta #{id}</h2>

      {loading ? (
        <p>Cargando movimientos...</p>
      ) : movimientos.length === 0 ? (
        <p className="text-muted">No hay movimientos registrados para esta cuenta.</p>
      ) : (
        <table className="table table-bordered table-hover shadow-sm">
          <thead className="table-light">
            <tr>
              <th>Tipo</th>
              <th>Monto</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {movimientos.map((mov) => (
              <tr key={mov.id}>
                <td>{mov.tipo}</td>
                <td>Bs {Number(mov.monto).toFixed(2)}</td>
                <td>{new Date(mov.fecha).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CuentaMovimientos;
