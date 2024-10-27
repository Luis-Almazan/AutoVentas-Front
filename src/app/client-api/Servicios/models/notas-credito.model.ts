import { AnulacionVenta } from './anulacion-venta.model';
import { Cliente } from './cliente.model';
import { Ventum } from './venta.model';
import { DevolucionProducto } from './devolucion-producto.model';

export interface NotasCredito {
    codNotaCredito: number;
    codCliente: number;
    tipoNota: string;
    fechaNota?: string; // string para fecha con formato (yyyy-MM-dd)
    total: number;
    codVenta?: number;
    anulacionVenta?: AnulacionVenta[];
    //clienteNavigation?: Cliente;
    //codVentaNavigation?: Ventum;
    devolucionProductos?: DevolucionProducto[];
  }

  