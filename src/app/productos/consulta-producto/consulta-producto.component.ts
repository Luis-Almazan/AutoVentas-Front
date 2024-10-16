import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../client-api/api'; // Ajustar la ruta de importación según la estructura del proyecto
import { Producto } from '../../client-api/Servicios/models/Models'; // Importar desde el índice (index.ts)
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-consulta-producto',
  templateUrl: './consulta-producto.component.html',
  styleUrls: ['./consulta-producto.component.css'],
  imports: [CommonModule, FormsModule]
})
export class ConsultaProductoComponent implements OnInit {
  productos: Producto[] = [];
  consultaPor: string = '';
  consultaValor: string | number = '';

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos(): void {
    this.productoService.getProductos().subscribe((data: Producto[]) => {
      this.productos = data;
    });
  }

  consultarProductos(): void {
    if (this.consultaPor && this.consultaValor) {
      const valorConsulta = typeof this.consultaValor === 'string' ? this.consultaValor.trim().toLowerCase() : this.consultaValor;

      this.productoService.getProductos().subscribe((data: Producto[]) => {
        this.productos = data.filter((producto: Producto) => {
          let resultadoComparacion = false;

          switch (this.consultaPor) {
            case 'codigo':
              resultadoComparacion = producto.codProducto.toString() === valorConsulta.toString();
              break;
            case 'descripcion':
              resultadoComparacion = producto.descripcion.toLowerCase() === valorConsulta.toString() ;
              break;
            case 'fecha':
              resultadoComparacion = producto.fechaVencimiento === valorConsulta;
              break;
            case 'status':
              const statusTexto = producto.status === 1 ? 'activo' : 'inactivo';
              resultadoComparacion = statusTexto === valorConsulta.toString().toLowerCase();
              break;
            default:
              resultadoComparacion = false;
          }

          return resultadoComparacion;
        });
      });
    } else {
      this.obtenerProductos(); // Si no hay filtro, obtenemos todos los productos
    }
  }
}
