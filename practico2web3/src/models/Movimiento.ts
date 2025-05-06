export interface Movimiento {
    id: string;
    tipo: 'ingreso' | 'egreso' | 'transferencia';
    cuenta_origen?: string;
    cuenta_destino?: string;
    monto: number;
    fecha: string;
  }