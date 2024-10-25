import { Producto } from './producto.model';
import { Ventum } from './venta.model';

export interface DetalleVentum {
    codDetalleVenta: number;
    codVenta: number;
    codProducto: number;
    cantidad: number;
    subtotal: number;
    status: number;
    codDevolucionProducto?: number;
   // codProductoNavigation?: Producto;
    codVentaNavigation?: Ventum;
  }