import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoService, ClienteService, VentaService, DetalleVentaService } from '../../client-api/api'; 
import { Producto, Cliente, Ventum, DetalleVentum } from '../../client-api/Servicios/models/Models';

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

  // Diccionario para almacenar descripciones de productos
  productoDescripciones: { [key: number]: string } = {};
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

    // Llenar el diccionario de descripciones de productos
    productos.forEach(producto => {
      this.productoDescripciones[producto.codProducto] = producto.descripcion;
    });

    // Depuración: Verificar el diccionario de descripciones
    console.log('Diccionario de descripciones de productos:', this.productoDescripciones);
  });
}

  agregarProducto(): void {
    if (this.productoSeleccionado && this.cantidadProducto > 0) {
      const subtotal = this.productoSeleccionado.precio * this.cantidadProducto;
  
      const detalle: DetalleVentum = {
        codVenta: this.venta.codVenta,
        codProducto: this.productoSeleccionado.codProducto,
        cantidad: this.cantidadProducto,
        subtotal: subtotal,
        status: 1
      };
  
      // Depuración: Verificar los valores de detalle antes de agregar
      console.log('Agregando detalle:', detalle);
  
      this.detallesVenta.push(detalle);
      this.calcularTotalVenta();
  
      // Resetear productoSeleccionado y cantidadProducto después de agregar
      this.productoSeleccionado = null;
      this.cantidadProducto = 1;
    } else {
      console.error('Error: Producto o cantidad no válida');
    }
  }
  

  calcularTotalVenta(): void {
    this.venta.totalVenta = this.detallesVenta.reduce((total, detalle) => total + detalle.subtotal, 0);
  }

  confirmarVenta(): void {
    // Guardar la venta y luego usar el `codVenta` retornado en la respuesta
    this.ventumService.crearVenta(this.venta).subscribe((ventaCreada: Ventum) => {
      this.detallesVenta.forEach(detalle => {
        detalle.codVenta = ventaCreada.codVenta;  // Asignar el codVenta de la venta creada
      });
      // Guardar cada detalle de venta ahora que tienen el `codVenta` asignado
      this.detallesVenta.forEach(detalle => {
        this.detalleVentaService.crearDetalleVenta(detalle).subscribe(() => {
          console.log('Detalle de venta creado:', detalle);
        }, (error) => {
          console.error('Error al crear detalle de venta:', error);
        });
      });
  
      alert('Venta y detalles confirmados.');
    }, (error) => {
      // Manejo de error en caso de que la creación de la venta falle
      console.error('Error al crear la venta:', error);
      alert('Ocurrió un error al confirmar la venta.');
    });
  }
  
  anularVenta(): void {
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
