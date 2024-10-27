import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EntregaPaqueteService, ClienteService, VentaService } from '../../client-api/api'; // Ajustar rutas según la estructura
import { Cliente, Ventum, EntregaPaquete } from '../../client-api/Servicios/models/Models';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-entrega-paquete',
  imports: [CommonModule, FormsModule],
  templateUrl: './ingreso-entrega.component.html',
  styleUrls: ['./ingreso-entrega.component.html']
  
})
export class IngresoEntregaComponent implements OnInit {
  descripcion: string = '';
  observaciones: string = '';
  codCliente: number | null = null;
  codVenta: number | null = null;
  status: number = 1;
  clientes: Cliente[] = [];
  ventas: Ventum[] = [];

  constructor(
    private entregaPaqueteService: EntregaPaqueteService,
    private clienteService: ClienteService,
    private ventaService: VentaService
  ) {}

  ngOnInit(): void {
    this.obtenerClientes();
    this.obtenerVentasEnProceso();
  }

  obtenerClientes(): void {
    this.clienteService.getClientes().subscribe({
      next: (clientes) => {
        this.clientes = clientes;
      },
      error: (error) => {
        console.error('Error al obtener clientes:', error);
      }
    });
  }

  obtenerVentasEnProceso(): void {
    this.ventaService.obtenerVentas().subscribe({
      next: (ventas) => {
        this.ventas = ventas.filter(venta => venta.statusVenta === 1);
      },
      error: (error) => {
        console.error('Error al obtener ventas en proceso:', error);
      }
    });
  }

  guardarEntrega(): void {
    if (this.codCliente && this.codVenta && this.descripcion) {
      const nuevaEntrega: EntregaPaquete = {
        codEntrega: 0, // Este se generará automáticamente
        descripcion: this.descripcion,
        observaciones: this.observaciones,
        codCliente: this.codCliente,
        codVenta: this.codVenta,
        status: this.status
      };

      this.entregaPaqueteService.crearEntrega(nuevaEntrega).subscribe({
        next: (entrega) => {
          console.log('Entrega creada exitosamente:', entrega);
          alert('Entrega creada exitosamente.');
        },
        error: (error) => {
          console.error('Error al crear la entrega:', error);
        }
      });
    } else {
      alert('Por favor, completa todos los campos obligatorios.');
    }
  }
}
