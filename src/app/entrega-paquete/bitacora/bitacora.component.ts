import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EntregaPaquete, Cliente, Ventum } from '../../client-api/Servicios/models/Models'; // Ajustar la ruta según la estructura del proyecto
import { EntregaPaqueteService, ClienteService, VentaService } from '../../client-api/api'; // Ajustar la ruta según la estructura del proyecto
import { forkJoin } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-bitacora',
  templateUrl: './bitacora.component.html',
  styleUrls: ['./bitacora.component.css'],
  imports: [CommonModule, FormsModule]
})
export class BitacoraComponent implements OnInit {
  entregas: EntregaPaquete[] = [];
  clientes: Cliente[] = [];
  ventas: Ventum[] = [];
  entregasConDetalles: any[] = []; // Entregas con detalles del cliente y venta
  consultaPor: string = '';
  consultaValor: string | number = '';

  constructor(
    private entregaService: EntregaPaqueteService,
    private clienteService: ClienteService,
    private ventaService: VentaService
  ) {}

  ngOnInit(): void {
    this.obtenerEntregasConDetalles();
  }

  obtenerEntregasConDetalles(): void {
    forkJoin({
      entregas: this.entregaService.obtenerEntregas(),
      clientes: this.clienteService.getClientes(),
      ventas: this.ventaService.obtenerVentas()
    }).subscribe({
      next: ({ entregas, clientes, ventas }) => {
        this.clientes = clientes;
        this.ventas = ventas;

        // Mapear las entregas con los nombres de los clientes y las ventas asociadas
        this.entregasConDetalles = entregas.map(entrega => {
          const cliente = this.clientes.find(c => c.codCliente === entrega.codCliente);
          const venta = this.ventas.find(v => v.codVenta === entrega.codVenta);
          return {
            ...entrega,
            clienteNombre: cliente ? `${cliente.primerNombre} ${cliente.primerApellido}` : 'Cliente no encontrado',
            ventaTotal: venta ? venta.totalVenta : 'Venta no encontrada',
            tipoEntrega: entrega.observaciones ? 'Con Observación' : 'Sin Observación'
          };
        });

        console.log('Entregas con detalles:', this.entregasConDetalles);
      },
      error: (error) => {
        console.error('Error al obtener datos:', error);
      }
    });
  }

  consultarEntregas(): void {
    if (this.consultaPor && this.consultaValor) {
      const valorConsulta = typeof this.consultaValor === 'string' ? this.consultaValor.trim().toLowerCase() : this.consultaValor;

      this.entregasConDetalles = this.entregasConDetalles.filter((entrega: any) => {
        let resultadoComparacion = false;

        switch (this.consultaPor) {
          case 'codigo':
            resultadoComparacion = entrega.codEntrega.toString() === valorConsulta.toString();
            break;
          case 'cliente':
            resultadoComparacion = entrega.clienteNombre.toLowerCase().includes(valorConsulta.toString());
            break;
          case 'venta':
            resultadoComparacion = entrega.ventaTotal.toString() === valorConsulta.toString();
            break;
          case 'tipo':
            resultadoComparacion = entrega.tipoEntrega.toLowerCase() === valorConsulta.toString().toLowerCase();
            break;
          default:
            resultadoComparacion = false;
        }

        return resultadoComparacion;
      });
    } else {
      this.obtenerEntregasConDetalles(); // Si no hay filtro, obtenemos todas las entregas con detalles
    }
  }
}
