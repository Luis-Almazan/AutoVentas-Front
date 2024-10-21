import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../client-api/api'; // Ajustar la ruta de importación según la estructura del proyecto
import { Producto, ActualizarStatus } from '../../client-api/Servicios/models/Models'; // Importar la interfaz Producto y ActualizarStatusRequest
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-baja-producto',
  templateUrl: './baja-producto.component.html',
  styleUrls: ['./baja-producto.component.css'],
  imports: [CommonModule, FormsModule]
})
export class BajaProductoComponent {
  producto: Producto | null = null;
  ProductStatus: ActualizarStatus = {
    codProducto: 0,
    status: 0
  };
  codigoProducto: number | null = null;
  mensaje: string = '';

  constructor(private productoService: ProductoService) {}

  buscarProducto(): void {
    if (this.codigoProducto) {
      this.productoService.getProductos().subscribe((productos: Producto[]) => {
        const productoEncontrado = productos.find(producto => producto.codProducto === this.codigoProducto);
        if (productoEncontrado) {
          this.producto = productoEncontrado;
          this.mensaje = '';
        } else {
          this.producto = null;
          this.mensaje = 'Producto no encontrado';
        }
      });
    }
  }

  darDeBaja(): void {
    if (this.codigoProducto !== null) {
      this.productoService.actualizarStatus(this.codigoProducto, 0).subscribe((response: ActualizarStatus) => {
        this.mensaje = 'Producto dado de baja exitosamente';
        this.ProductStatus = { 
          ...this.ProductStatus,
          status: 0 
        };
      });
    }
  }

  reiniciar(): void {
    this.producto = null;
    this.codigoProducto = null;
    this.mensaje = '';
  }
}
