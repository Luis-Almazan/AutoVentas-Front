import { Producto } from './producto.model';


export interface Proveedor {
    codProveedor: number;
    nombre: string;
    descripcion?: string;
    productos: Producto[];
  }