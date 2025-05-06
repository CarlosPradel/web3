import { Route, Routes } from 'react-router-dom';
import LoginPage from '../auth/LoginPage';
import RegisterPage from '../auth/RegisterPage';
import Dashboard from '../pages/Dashboard';
import NotFound from '../pages/NotFound';

import MovimientoList from '../movimientos/MovimientoList';
import MovimientoForm from '../movimientos/MovimientoForm';

import CuentaList from '../cuentas/CuentaList';
import CuentaForm from '../cuentas/CuentaForm';
import CuentaMovimientos from '../cuentas/CuentaMovimientos';

import BeneficiarioList from '../beneficiarios/BeneficiarioList';
import BeneficiarioForm from '../beneficiarios/BeneficiarioForm';

import ProtectedRoute from '../components/ProtectedRoute';

const RouterConfig = () => {
  return (
    <Routes>
      {/* RUTAS PÚBLICAS */}
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* DASHBOARD PROTEGIDO */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* CUENTAS */}
      <Route
        path="/cuentas"
        element={
          <ProtectedRoute>
            <CuentaList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cuentas/crear"
        element={
          <ProtectedRoute>
            <CuentaForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cuentas/:id/movimientos"
        element={
          <ProtectedRoute>
            <CuentaMovimientos />
          </ProtectedRoute>
        }
      />

      {/* BENEFICIARIOS */}
      <Route
        path="/beneficiarios"
        element={
          <ProtectedRoute>
            <BeneficiarioList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/beneficiarios/crear"
        element={
          <ProtectedRoute>
            <BeneficiarioForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/beneficiarios/editar/:id"
        element={
          <ProtectedRoute>
            <BeneficiarioForm />
          </ProtectedRoute>
        }
      />

      {/* MOVIMIENTOS */}
      <Route
        path="/movimientos"
        element={
          <ProtectedRoute>
            <MovimientoList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/movimientos/crear"
        element={
          <ProtectedRoute>
            <MovimientoForm />
          </ProtectedRoute>
        }
      />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RouterConfig;
