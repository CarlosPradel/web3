import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMovimientos, deleteMovimiento } from './movimientoService';
import { Movimiento } from '../models/Movimiento';

const MovimientoList = () => {
  const [movimientos, setMovimientos] = useState<Movimiento[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getMovimientos().then(setMovimientos);
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteMovimiento(id);
      setMovimientos(movimientos.filter((mov) => mov.id !== id));
    } catch (error) {
      console.error('Error al eliminar movimiento:', error);
      alert('Hubo un error al eliminar el movimiento');
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
        <h2 className="text-primary">Lista de Movimientos</h2>
        <button className="btn btn-success" onClick={() => navigate('/movimientos/crear')}>
          Crear Movimiento
        </button>
      </div>

      <table className="table table-bordered table-hover shadow-sm">
        <thead className="table-light">
          <tr>
            <th>Tipo</th>
            <th>Monto</th>
            <th>Fecha</th>
            <th className="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {movimientos.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center text-muted">
                No hay movimientos registrados.
              </td>
            </tr>
          ) : (
            movimientos.map((movimiento) => (
              <tr key={movimiento.id}>
                <td>{movimiento.tipo}</td>
                <td>Bs {Number(movimiento.monto).toFixed(2)}</td>
                <td>{new Date(movimiento.fecha).toLocaleString()}</td>
                <td className="text-center">
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(movimiento.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MovimientoList;
