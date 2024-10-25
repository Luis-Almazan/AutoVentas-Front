import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoService, ClienteService, VentaService, DetalleVentaService } from '../../client-api/api'; 
import { Producto, Cliente, Ventum, DetalleVentum } from '../../client-api/Servicios/models/Models';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-ventas',
  templateUrl: './consulta-venta.component.html',
  styleUrls: ['./consulta-venta.component.css'],
  imports: [CommonModule, FormsModule]
})
export class ConsultaVentaComponent {
  clientes: Cliente[] = [];
  productos: Producto[] = [];
  venta: Ventum = {
    codVenta: 0,
    codCliente: 0,
    fechaVenta: new Date().toISOString().split('T')[0],
    totalVenta: 0,
    statusVenta: 1
  };
  detallesVenta: DetalleVentum[] = [];
  productoSeleccionado: Producto | null = null;
  cantidadProducto: number = 1;

  constructor(
    private clienteService: ClienteService,
    private productoService: ProductoService,
    private ventumService: VentaService,
    private detalleVentaService: DetalleVentaService
  ) {}

  ngOnInit(): void {
    this.obtenerClientes();
    this.obtenerProductos();
  }

  obtenerClientes(): void {
    this.clienteService.getClientes().subscribe((clientes: Cliente[]) => {
      this.clientes = clientes;
    });
  }

  obtenerProductos(): void {
    this.productoService.getProductos().subscribe((productos: Producto[]) => {
      this.productos = productos;
    });
  }

  agregarProducto(): void {
    if (this.productoSeleccionado && this.cantidadProducto > 0) {
      const subtotal = this.productoSeleccionado.precio * this.cantidadProducto;

      const detalle: DetalleVentum = {
        codDetalleVenta: 0,
        codVenta: this.venta.codVenta,
        codProducto: this.productoSeleccionado.codProducto,
        cantidad: this.cantidadProducto,
        subtotal: subtotal,
        status: 1
      };

      this.detallesVenta.push(detalle);
      this.calcularTotalVenta();
    }
  }

  calcularTotalVenta(): void {
    this.venta.totalVenta = this.detallesVenta.reduce((total, detalle) => total + detalle.subtotal, 0);
  }

  confirmarVenta(): void {
    
  
    // Guardar la venta solamente
    this.ventumService.crearVenta(this.venta).subscribe((ventaCreada: Ventum) => {
      // No se crea el detalle de venta aquí, solo se crea la venta
      alert('Venta confirmada.');
    }, (error) => {
      // Manejo de error en caso de que la creación de la venta falle
      console.error('Error al crear la venta:', error);
      alert('Ocurrió un error al confirmar la venta.');
    });
  }

  anularVenta(): void {
    // Lógica para anular la venta
    this.venta = {
      codVenta: 0,
      codCliente: 0,
      fechaVenta: '',
      totalVenta: 0,
      statusVenta: 0
    };
    this.detallesVenta = [];
  }
}
