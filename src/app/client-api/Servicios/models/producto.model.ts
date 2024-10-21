import { Proveedor } from './proveedor.model';
import { DetalleVentum } from './detalle-venta.model';
import { Ubicacion } from './ubicacion.model';

export interface Producto {
    codProducto: number;
    descripcion: string;
    codProveedor?: number;
    fechaVencimiento?: string;  // string para fecha con formato (yyyy-MM-dd)
    ubicacion: number;
    existencia: number;
    precio: number;
    status: number;
    codProveedorNavigation?: Proveedor;
    //detalleVenta: DetalleVentum[];
    ubicacionNavigation?: Ubicacion;
  }