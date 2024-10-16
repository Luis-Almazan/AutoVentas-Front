import { EntregaPaquete } from './entrega-paquete.model';
import { NotasCredito } from './notas-credito.model';
import { Ventum } from './venta.model';

export interface Cliente {
  codCliente: number;
  primerNombre: string;
  segundoNombre?: string;
  primerApellido: string;
  segundoApellido?: string;
  nit: number;
  direccionCliente: string;
  categoriaCliente: number;
  status: number;
  entregaPaquetes: EntregaPaquete[];
  notasCreditos: NotasCredito[];
  venta: Ventum[];
}
