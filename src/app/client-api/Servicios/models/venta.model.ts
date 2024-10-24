import { AnulacionVenta } from './anulacion-venta.model';
import { Cliente } from './cliente.model';
import { DetalleVentum } from './detalle-venta.model';
import { EntregaPaquete } from './entrega-paquete.model';
import { NotasCredito } from './notas-credito.model';

export interface Ventum {
    codVenta: number;
    codCliente: number;
    fechaVenta?: string; // string para fecha con formato (yyyy-MM-dd)
    totalVenta: number;
    statusVenta?: number;
    codAnulacionVenta?: number;
    //anulacionVenta?: AnulacionVenta[];
    //clienteNavigation?: Cliente;
    //detalleVenta: DetalleVentum[];
    //entregaPaquetes: EntregaPaquete[];
    //notasCreditos: NotasCredito[];
  }