import { NotasCredito } from './notas-credito.model';
import { Ventum } from './venta.model';

export interface AnulacionVenta {
    codAnulacion: number;
    codNotaCredito?: number;
    codVenta: number;
    motivoAnulacion?: string;
    //codNotaCreditoNavigation?: NotasCredito;
    //codVentaNavigation?: Ventum;
  }