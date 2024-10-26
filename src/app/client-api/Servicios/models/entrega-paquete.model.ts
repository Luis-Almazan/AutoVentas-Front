import { Cliente } from './cliente.model';
import { Ventum } from './venta.model';

export interface EntregaPaquete {
    codEntrega: number;
    descripcion: string;
    observaciones?: string;
    codCliente: number;
    codVenta: number;
    status: number;
   // clienteNavigation?: Cliente;
   // codVentaNavigation?: Ventum;
  }