import { Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import PanelAdmin from "../pages/admin/Panel";
import LibrosAdmin from "../pages/admin/AdminLibros";
import GenerosAdmin from "../pages/admin/AdminGeneros";
import UsuariosAdmin from "../pages/admin/AdminUsuarios";
import VentasAdmin from "../pages/admin/AdminVentas";

import Home from "../pages/client/Home";
import Homepage from "../pages/public/HomePage";
import LibrosCliente from "../pages/client/Libros";
import LibroDetalle from "../pages/client/LibroDetalle";
import ConfirmarCompra from "../pages/client/ConfirmarCompra";
import Compras from "../pages/client/Compras";
import TopLibros from "../pages/client/TopLibros";

import ProtectedRoute from "../components/ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />

      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />

      <Route
        path="/client"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />


      <Route
        path="/libros"
        element={
          <ProtectedRoute>
            <LibrosCliente />
          </ProtectedRoute>
        }
      />
      <Route
        path="/libros/:id"
        element={
          <ProtectedRoute>
            <LibroDetalle />
          </ProtectedRoute>
        }
      />
      <Route
        path="/libros/top"
        element={
          <ProtectedRoute>
            <TopLibros />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cliente/confirmar-compra"
        element={
          <ProtectedRoute>
            <ConfirmarCompra />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cliente/compras"
        element={
          <ProtectedRoute>
            <Compras />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute requireAdmin>
            <PanelAdmin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/libros"
        element={
          <ProtectedRoute requireAdmin>
            <LibrosAdmin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/generos"
        element={
          <ProtectedRoute requireAdmin>
            <GenerosAdmin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/usuarios"
        element={
          <ProtectedRoute requireAdmin>
            <UsuariosAdmin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/ventas"
        element={
          <ProtectedRoute requireAdmin>
            <VentasAdmin />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Homepage />} />
    </Routes>
  );
}
  