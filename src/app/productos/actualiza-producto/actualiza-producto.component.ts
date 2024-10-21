
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoService, ProveedorService, UbicacionService } from '../../client-api/api';
import { Producto, Proveedor, Ubicacion } from '../../client-api/Servicios/models/Models';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-actualiza-producto',
  templateUrl: './actualiza-producto.component.html',
  styleUrls: ['./actualiza-producto.component.css'],
  imports: [CommonModule, FormsModule]
})
export class ActualizaProductoComponent implements OnInit {
  codigoProducto: number | null = null;
  producto: Producto | null = null;
  mensaje: string = '';
  proveedores: Proveedor[] = [];
  ubicaciones: Ubicacion[] = [];

  constructor(
    private productoService: ProductoService,
    private proveedorService: ProveedorService,
    private ubicacionService: UbicacionService
  ) {}

  ngOnInit(): void {
    this.obtenerProveedoresYUbicaciones();
  }

  obtenerProveedoresYUbicaciones(): void {
    this.proveedorService.getProveedores().subscribe(proveedores => {
      this.proveedores = proveedores;
    });
    this.ubicacionService.getUbicaciones().subscribe(ubicaciones => {
      this.ubicaciones = ubicaciones;
    });
  }

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

  actualizarProducto(): void {
    if (this.producto) {
      this.productoService.actualizarProducto(this.producto.codProducto, this.producto).subscribe(() => {
        this.mensaje = 'Producto actualizado exitosamente';
      });
    }
  }

  reiniciar(): void {
    this.producto = null;
    this.codigoProducto = null;
    this.mensaje = '';
  }
}
