export interface DetalleCompra {
  id: number;
  precio_unitario: number;
  libro: {
    id: number;
    titulo: string;
    autor: string;
  };
}

export interface Compra {
  id: number;
  fecha: string;
  total: number | string;
  qr_generado: string;
  comprobante_pago?: string;
  confirmada: boolean;
  detalles: DetalleCompra[];
  usuario: number;
}
