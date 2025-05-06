import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createMovimiento } from './movimientoService';
import { getBeneficiarios } from '../beneficiarios/beneficiarioService';
import { getCuentas } from '../cuentas/cuentaService';
import { Movimiento } from '../models/Movimiento';
import { Cuenta } from '../models/Cuenta';
import { Beneficiario } from '../models/beneficiario';

const MovimientoForm = () => {
  const navigate = useNavigate();

  const [tipo, setTipo] = useState<'ingreso' | 'egreso' | 'transferencia'>('ingreso');
  const [monto, setMonto] = useState<number>(0);
  const [cuentaOrigen, setCuentaOrigen] = useState<string>('');
  const [cuentaDestino, setCuentaDestino] = useState<string>('');
  const [beneficiarios, setBeneficiarios] = useState<Beneficiario[]>([]);
  const [cuentas, setCuentas] = useState<Cuenta[]>([]);
  const [beneficiarioSeleccionado, setBeneficiarioSeleccionado] = useState<string>('');

  useEffect(() => {
    getCuentas().then(setCuentas);
    getBeneficiarios().then(setBeneficiarios);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isNaN(monto) || monto <= 0) {
      alert('El monto debe ser mayor a 0');
      return;
    }

    const data: Movimiento = {
      tipo,
      monto,
      cuenta_origen: tipo !== 'ingreso' ? cuentaOrigen : undefined,
      cuenta_destino:
        tipo === 'ingreso'
          ? cuentaDestino
          : tipo === 'transferencia'
          ? beneficiarioSeleccionado
          : undefined,
      id: '',
      fecha: new Date().toISOString(),
    };

    try {
      await createMovimiento(data);
      alert('Movimiento creado con éxito');
      navigate('/movimientos');
    } catch (error) {
      console.error('Error al crear movimiento:', error);
      alert('Hubo un error al crear el movimiento');
    }
  };

  return (
    <div className="container mt-5">
      <button
        className="btn btn-outline-secondary mb-3"
        onClick={() => navigate('/movimientos')}
      >
        ← Volver
      </button>

      <h2 className="mb-4 text-primary">Crear Movimiento</h2>

      <form onSubmit={handleSubmit}>
        {/* Tipo de movimiento */}
        <div className="mb-3">
          <label htmlFor="tipo" className="form-label">Tipo de Movimiento</label>
          <select
            id="tipo"
            className="form-select"
            value={tipo}
            onChange={(e) => setTipo(e.target.value as 'ingreso' | 'egreso' | 'transferencia')}
            required
          >
            <option value="ingreso">Ingreso</option>
            <option value="egreso">Egreso</option>
            <option value="transferencia">Transferencia</option>
          </select>
        </div>

        {/* Monto */}
        <div className="mb-3">
          <label htmlFor="monto" className="form-label">Monto</label>
          <input
            type="text"
            id="monto"
            className="form-control"
            value={monto}
            onChange={(e) => setMonto(Number(e.target.value))}
            required
          />
        </div>

        {/* Cuenta Origen */}
        {(tipo === 'egreso' || tipo === 'transferencia') && (
          <div className="mb-3">
            <label htmlFor="cuentaOrigen" className="form-label">Cuenta Origen</label>
            <select
              id="cuentaOrigen"
              className="form-select"
              value={cuentaOrigen}
              onChange={(e) => setCuentaOrigen(e.target.value)}
              required
            >
              <option value="">Seleccionar cuenta</option>
              {cuentas.map((cuenta) => (
                <option key={cuenta.id} value={cuenta.id}>
                  {cuenta.numero_cuenta} - Bs {Number(cuenta.saldo).toFixed(2)}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Cuenta Destino */}
        {tipo === 'ingreso' && (
          <div className="mb-3">
            <label htmlFor="cuentaDestino" className="form-label">Cuenta Destino</label>
            <select
              id="cuentaDestino"
              className="form-select"
              value={cuentaDestino}
              onChange={(e) => setCuentaDestino(e.target.value)}
              required
            >
              <option value="">Seleccionar cuenta</option>
              {cuentas.map((cuenta) => (
                <option key={cuenta.id} value={cuenta.id}>
                  {cuenta.numero_cuenta} - Bs {Number(cuenta.saldo).toFixed(2)}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Beneficiario */}
        {tipo === 'transferencia' && (
          <div className="mb-3">
            <label htmlFor="beneficiario" className="form-label">Beneficiario</label>
            <select
              id="beneficiario"
              className="form-select"
              value={beneficiarioSeleccionado}
              onChange={(e) => setBeneficiarioSeleccionado(e.target.value)}
              required
            >
              <option value="">Seleccionar beneficiario</option>
              {beneficiarios.map((b) => (
                <option key={b.id} value={b.cuenta_destino_id}>
                  {b.beneficiario_nombre} ({b.numero_cuenta})
                </option>
              ))}
            </select>
          </div>
        )}

        <button type="submit" className="btn btn-primary w-100">Guardar Movimiento</button>
      </form>
    </div>
  );
};

export default MovimientoForm;