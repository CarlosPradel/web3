import { useEffect, useState } from 'react';
import { getBeneficiarios, deleteBeneficiario } from './beneficiarioService';
import { useNavigate } from 'react-router-dom';
import { Beneficiario } from '../models/beneficiario';

const BeneficiarioList = () => {
  const [beneficiarios, setBeneficiarios] = useState<Beneficiario[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getBeneficiarios().then(setBeneficiarios);
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('¿Estás seguro de eliminar este beneficiario?')) {
      try {
        await deleteBeneficiario(id);
        setBeneficiarios((prev) => prev.filter((b) => b.id !== id));
      } catch (error) {
        console.error('Error al eliminar beneficiario:', error);
      }
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
        <h2 className="text-primary">Lista de Beneficiarios</h2>
        <button
          className="btn btn-success"
          onClick={() => navigate('/beneficiarios/crear')}
        >
          Agregar Beneficiario
        </button>
      </div>

      <table className="table table-bordered table-hover shadow-sm">
        <thead className="table-light">
          <tr>
            <th>Usuario</th>
            <th>Número de Cuenta</th>
            <th className="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {beneficiarios.length === 0 ? (
            <tr>
              <td colSpan={3} className="text-center text-muted">
                No hay beneficiarios registrados.
              </td>
            </tr>
          ) : (
            beneficiarios.map((b) => (
              <tr key={b.id}>
                <td>{b.beneficiario_nombre || 'Desconocido'}</td>
                <td>{b.numero_cuenta}</td>
                <td className="text-center">
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(b.id)}
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

export default BeneficiarioList;
