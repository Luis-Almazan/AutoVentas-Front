import { Producto } from './producto.model';

export interface Ubicacion {
    codUbicacion: number;
    nombre: string;
    descripcion?: string;
    productos: Producto[];
  }