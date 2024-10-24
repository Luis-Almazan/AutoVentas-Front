import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VentaService, DetalleVentaService } from '../../client-api/api'; // Ajusta la ruta según la estructura del proyecto
import { Ventum, DetalleVentum } from '../../client-api/Servicios/models/Models';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-venta',
  templateUrl: './consulta-venta.component.html',
  styleUrls: ['./consulta-venta.component.css'],
  imports: [CommonModule, FormsModule] 
})
export class VentaComponent {
  venta: Ventum = {
    codVenta: 0,
    codCliente: 0,
    fechaVenta: '', // Fecha a ingresar manualmente en formato yyyy-MM-dd
    totalVenta: 0,
    statusVenta: 0,
  };
  detallesVenta: DetalleVentum[] = [];
  mensaje: string = '';

  constructor(
    private ventaService: VentaService,
    private detalleVentaService: DetalleVentaService
  ) {}

  agregarDetalleVenta(codProducto: number, cantidad: number): void {
    if (codProducto > 0 && cantidad > 0) {
      const nuevoDetalle: DetalleVentum = {
        codDetalleVenta: 0, // Será asignado por el backend
        codVenta: 0, // Será actualizado después de crear la venta
        codProducto: codProducto,
        cantidad: cantidad,
        subtotal: cantidad * 100, // Ejemplo: multiplicar por un precio fijo, ajustar según sea necesario
        status: 1, // Estatus activo
      };

      this.detallesVenta.push(nuevoDetalle);
      this.calcularTotalVenta();
    } else {
      this.mensaje = 'Debe ingresar un producto válido y una cantidad mayor a cero';
    }
  }

  calcularTotalVenta(): void {
    this.venta.totalVenta = this.detallesVenta.reduce((total, detalle) => total + detalle.subtotal, 0);
  }

  confirmarVenta(): void {
    // Verificar si la venta tiene un cliente válido y al menos un detalle
    if (this.venta.codCliente === 0 || this.detallesVenta.length === 0 || !this.venta.fechaVenta) {
      this.mensaje = 'Debe seleccionar un cliente, ingresar una fecha y agregar al menos un producto a la venta';
      return;
    }

    // Verificar si la fecha tiene el formato correcto (yyyy-MM-dd)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(this.venta.fechaVenta)) {
      this.mensaje = 'La fecha debe tener el formato yyyy-MM-dd';
      return;
    }

    // Preparar los datos de la venta para enviarlos al backend
    const nuevaVenta: Ventum = {
      codVenta: 0, // Será asignado por el backend
      codCliente: this.venta.codCliente,
      fechaVenta: this.venta.fechaVenta, // La fecha ingresada manualmente
      totalVenta: this.venta.totalVenta,
      statusVenta: this.venta.statusVenta,
    };

    // Imprimir los datos antes de enviarlos a la API
    console.log('Datos de la venta que se enviarán:', nuevaVenta);
    console.log('Detalles de venta que se enviarán:', this.detallesVenta);

    // Hacer la solicitud para crear la venta
    this.ventaService.crearVenta(nuevaVenta).subscribe({
      next: (ventaCreada) => {
        console.log('Venta creada con éxito:', ventaCreada);

        // Asignar el código de venta creado a cada detalle y guardar los detalles de la venta
        this.detallesVenta.forEach((detalle) => {
          detalle.codVenta = ventaCreada.codVenta;
          console.log('Detalle de venta que se enviará:', detalle); // Log para cada detalle antes de enviarlo
          this.detalleVentaService.crearDetalleVenta(detalle).subscribe({
            next: () => {
              console.log('Detalle de venta creado:', detalle);
            },
            error: (error) => {
              console.error('Error al crear el detalle de venta:', error);
              this.mensaje = 'Error al crear el detalle de venta';
            },
          });
        });

        this.mensaje = 'Venta creada exitosamente con sus detalles';
      },
      error: (error) => {
        console.error('Error al crear la venta:', error);
        console.log('Datos de la venta enviados:', nuevaVenta); // Imprimir los datos para depurar
        this.mensaje = 'Error al crear la venta';
      },
    });
  }

  cancelarVenta(): void {
    // Reiniciar la venta y detalles
    this.venta = {
      codVenta: 0,
      codCliente: 0,
      fechaVenta: '',
      totalVenta: 0,
      statusVenta: 0,
    };
    this.detallesVenta = [];
    this.mensaje = 'Venta cancelada';
  }
}
