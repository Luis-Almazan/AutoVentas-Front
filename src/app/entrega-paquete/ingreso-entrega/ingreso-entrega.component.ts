import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VentaService, ClienteService } from '../../client-api/api';
import { Ventum, Cliente } from '../../client-api/Servicios/models/Models'; 
import { Observable, forkJoin } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-ingreso-entrega',
  templateUrl: './ingreso-entrega.component.html',
  styleUrls: ['./ingreso-entrega.component.css'],
  imports: [CommonModule, FormsModule]
})
export class IngresoEntregaComponent implements OnInit {
  clientes: Cliente[] = [];
  ventasEnProceso: Ventum[] = [];
  codCliente: number = 0; // Código de cliente actual, se puede setear cuando el cliente se autentica.

  descripcion: string = '';
  observaciones: string = '';
  clienteSeleccionado: Cliente | undefined;
  ventaSeleccionada: number = 0;
  status: number = 1;

  constructor(
    private ventasService: VentaService,
    private clienteService: ClienteService
  ) {}

  ngOnInit(): void {
    this.obtenerClientesYVentas();
  }

  obtenerClientesYVentas(): void {
    forkJoin({
      clientes: this.clienteService.getClientes(),
      ventas: this.ventasService.obtenerVentas()
    }).subscribe({
      next: ({ clientes, ventas }) => {
        this.clientes = clientes;

        // Filtrar las ventas que pertenecen al cliente y que están "En Proceso" (statusVenta === 1)
        this.ventasEnProceso = ventas.filter(
          venta => venta.codCliente === this.codCliente && venta.statusVenta === 1
        );

        // Seleccionar el cliente autenticado (simulado)
        this.clienteSeleccionado = this.clientes.find(cliente => cliente.codCliente === this.codCliente);
      },
      error: (error) => {
        console.error('Error al obtener datos:', error);
      }
    });
  }

  guardarEntrega(): void {
    // Aquí se procesaría la lógica para guardar la entrega de paquetes.
    const nuevaEntrega = {
      codEntrega: 0,
      descripcion: this.descripcion,
      observaciones: this.observaciones,
      codCliente: this.codCliente,
      codVenta: this.ventaSeleccionada,
      status: this.status
    };
    
    console.log('Datos para crear entrega:', nuevaEntrega);
    // Llamar al servicio para crear la entrega
  }
}
