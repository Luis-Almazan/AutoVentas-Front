import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoService, ProveedorService, UbicacionService } from '../../client-api/api'; // Ajustar la ruta de importación según la estructura del proyecto
import { Producto, Proveedor, Ubicacion } from '../../client-api/Servicios/models/Models'; // Importar desde el índice (index.ts)
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-ingresar-producto',
  templateUrl: './ingresar-producto.component.html',
  styleUrls: ['./ingresar-producto.component.css'],
  imports: [CommonModule, FormsModule]
})
export class IngresarProductoComponent implements OnInit {
  nuevoProducto: Producto = {
    codProducto: 0,
    descripcion: '',
    codProveedor: 0,
    fechaVencimiento: '',
    ubicacion: 0,
    existencia: 0,
    precio: 0,
    status: 1
  };

  proveedores: Proveedor[] = [];
  ubicaciones: Ubicacion[] = [];

  constructor(
    private productoService: ProductoService,
    private proveedorService: ProveedorService,
    private ubicacionService: UbicacionService
  ) {}

  ngOnInit(): void {
    this.obtenerProveedores();
    this.obtenerUbicaciones();
  }

  obtenerProveedores(): void {
    this.proveedorService.getProveedores().subscribe((data: Proveedor[]) => {
      this.proveedores = data;
    });
  }

  obtenerUbicaciones(): void {
    this.ubicacionService.getUbicaciones().subscribe((data: Ubicacion[]) => {
      this.ubicaciones = data;
    });
  }

  agregarProducto(): void {
    this.productoService.crearProducto(this.nuevoProducto).subscribe(() => {
      alert('Producto agregado exitosamente');
      this.reiniciarFormulario();
    });
  }

  reiniciarFormulario(): void {
    this.nuevoProducto = {
      codProducto: 0,
      descripcion: '',
      codProveedor: 0,
      fechaVencimiento: '',
      ubicacion: 0,
      existencia: 0,
      precio: 0,
      status: 1
    };
  }
}
