import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import '../styles/global.css';

const Dashboard = () => {
  const [username, setUsername] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('username');
    setUsername(user || 'Usuario');
  }, []);

  return (
    <div className="page-container bg-light">
      <Header />

      <div className="center-content px-3">
        <div className="card shadow-lg p-4 w-100" style={{ maxWidth: '500px' }}>
          <h2 className="text-center mb-3 text-primary fw-bold">Bienvenido, {username}</h2>
          <p className="text-center">
            Estás en el panel principal. Desde aquí puedes gestionar tus cuentas, movimientos y beneficiarios.
          </p>

          <div className="mt-4 d-flex flex-column gap-3">
            <button className="btn btn-outline-primary" onClick={() => navigate('/cuentas')}>
              Ver cuentas
            </button>
            <button className="btn btn-outline-secondary" onClick={() => navigate('/beneficiarios')}>
              Ver beneficiarios
            </button>
            <button className="btn btn-outline-success" onClick={() => navigate('/movimientos')}>
              Ver movimientos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
