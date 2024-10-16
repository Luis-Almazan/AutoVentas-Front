import { NotasCredito } from './notas-credito.model';
import { DetalleVentum } from './detalle-venta.model';

export interface DevolucionProducto {
    codDevolucion: number;
    codNotaCredito: number;
    cantidad: number;
    motivoDevolucion?: string;
    codNotaCreditoNavigation?: NotasCredito;
    detalleVenta: DetalleVentum[];
  }