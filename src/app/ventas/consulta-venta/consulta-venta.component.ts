import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ventum, Cliente } from '../../client-api/Servicios/models/Models'; // Ajustar la ruta según la estructura del proyecto
import { VentaService, ClienteService } from '../../client-api/api'; // Ajustar la ruta según la estructura del proyecto
import { Observable, forkJoin } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-consulta-venta',
  templateUrl: './consulta-venta.component.html', 
  styleUrls: ['./consulta-venta.component.css'],
  imports: [CommonModule, FormsModule]
})
export class ConsultaVentaComponent implements OnInit {
  ventas: Ventum[] = [];
  clientes: Cliente[] = [];
  ventasConDetalles: any[] = []; // Ventas con detalles del cliente y clasificación por tipo de venta
  consultaPor: string = '';
  consultaValor: string | number = '';

  constructor(private ventasService: VentaService, private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.obtenerVentasConClientes();
  }

  obtenerVentasConClientes(): void {
    forkJoin({
      ventas: this.ventasService.obtenerVentas(),
      clientes: this.clienteService.getClientes() // Obtener todos los clientes de una sola vez
    }).subscribe({
      next: ({ ventas, clientes }) => {
        this.clientes = clientes;

        // Mapear las ventas con los nombres de los clientes y agregar tipo de venta
        this.ventasConDetalles = ventas.map(venta => {
          const cliente = this.clientes.find(c => c.codCliente === venta.codCliente);
          return {
            ...venta,
            clienteNombre: cliente ? `${cliente.primerNombre} ${cliente.primerApellido}` : 'Cliente no encontrado',
            tipoVenta: venta.totalVenta > 500 ? 'Mayor' : 'Menor'
          };
        });

        console.log('Ventas con detalles:', this.ventasConDetalles);
      },
      error: (error) => {
        console.error('Error al obtener datos:', error);
      }
    });
  }

  consultarVentas(): void {
    if (this.consultaPor && this.consultaValor) {
      const valorConsulta = typeof this.consultaValor === 'string' ? this.consultaValor.trim().toLowerCase() : this.consultaValor;

      this.ventasConDetalles = this.ventasConDetalles.filter((venta: any) => {
        let resultadoComparacion = false;

        switch (this.consultaPor) {
          case 'codigo':
            resultadoComparacion = venta.codVenta.toString() === valorConsulta.toString();
            break;
          case 'cliente':
            resultadoComparacion = venta.clienteNombre.toLowerCase().includes(valorConsulta.toString());
            break;
          case 'total':
            resultadoComparacion = venta.totalVenta.toString() === valorConsulta.toString();
            break;
          case 'estatus':
            // Estado de la venta: 0 - En Proceso, 1 - Entregado, 2 - Cancelado
            const statusTexto = venta.statusVenta === 0 ? 'en proceso' : venta.statusVenta === 1 ? 'entregado' : 'cancelado';
            resultadoComparacion = statusTexto === valorConsulta.toString().toLowerCase();
            break;
          case 'tipo':
            resultadoComparacion = venta.tipoVenta.toLowerCase() === valorConsulta.toString().toLowerCase();
            break;
          default:
            resultadoComparacion = false;
        }

        return resultadoComparacion;
      });
    } else {
      this.obtenerVentasConClientes(); // Si no hay filtro, obtenemos todas las ventas con detalles
    }
  }
}
