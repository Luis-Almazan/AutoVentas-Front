import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoService, ProveedorService, UbicacionService } from '../../client-api/api'; // Ajustar la ruta de importación según la estructura del proyecto
import { Producto, Proveedor, Ubicacion } from '../../client-api/Servicios/models/Models'; // Importar desde el índice (index.ts)
import { forkJoin, Observable } from 'rxjs';

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
  productosConDetalles: any[] = []; // Productos con nombre de proveedor y ubicación

  constructor(
    private productoService: ProductoService,
    private proveedorService: ProveedorService,
    private ubicacionService: UbicacionService
  ) {}

  ngOnInit(): void {
    this.obtenerProductosConDetalles();
  }

  obtenerProductosConDetalles(): void {
    this.productoService.getProductos().subscribe((productos: Producto[]) => {
      if (productos.length > 0) {
        // Realizar solicitudes a Proveedor y Ubicación solo si los códigos existen
        const proveedores$ = productos.map(producto => 
          producto.codProveedor !== undefined 
            ? this.proveedorService.getProveedorPorId(producto.codProveedor) 
            : new Observable<Proveedor>((observer) => {
                observer.next({ codProveedor: 0, nombre: 'Sin Proveedor', descripcion: '', productos: [] });
                observer.complete();
              })
        );

        const ubicaciones$ = productos.map(producto => 
          producto.ubicacion !== undefined 
            ? this.ubicacionService.getUbicacionPorId(producto.ubicacion) 
            : new Observable<Ubicacion>((observer) => {
                observer.next({ codUbicacion: 0, nombre: 'Sin Ubicación', descripcion: '', productos: [] });
                observer.complete();
              })
        );

        // Usar forkJoin para esperar a todas las solicitudes
        forkJoin([forkJoin(proveedores$), forkJoin(ubicaciones$)]).subscribe({
          next: ([proveedores, ubicaciones]: [Proveedor[], Ubicacion[]]) => {
            this.productosConDetalles = productos.map((producto, index) => ({
              ...producto,
              proveedorNombre: proveedores[index]?.nombre || 'Sin Proveedor',
              ubicacionNombre: ubicaciones[index]?.nombre || 'Sin Ubicación'
            }));
            console.log('Productos con detalles:', this.productosConDetalles);
          },
          error: (error) => {
            console.error('Error al obtener detalles de proveedor/ubicación:', error);
          }
        });
      }
    });
  }

  consultarProductos(): void {
    if (this.consultaPor && this.consultaValor) {
      const valorConsulta = typeof this.consultaValor === 'string' ? this.consultaValor.trim().toLowerCase() : this.consultaValor;
  
      // Obtener todos los productos con detalles antes de realizar el filtro
      this.productoService.getProductos().subscribe((productos: Producto[]) => {
        if (productos.length > 0) {
          const proveedores$ = productos.map(producto =>
            producto.codProveedor !== undefined
              ? this.proveedorService.getProveedorPorId(producto.codProveedor)
              : new Observable<Proveedor>((observer) => {
                  observer.next({ codProveedor: 0, nombre: 'Sin Proveedor', descripcion: '', productos: [] });
                  observer.complete();
                })
          );
  
          const ubicaciones$ = productos.map(producto =>
            producto.ubicacion !== undefined
              ? this.ubicacionService.getUbicacionPorId(producto.ubicacion)
              : new Observable<Ubicacion>((observer) => {
                  observer.next({ codUbicacion: 0, nombre: 'Sin Ubicación', descripcion: '', productos: [] });
                  observer.complete();
                })
          );
  
          forkJoin([forkJoin(proveedores$), forkJoin(ubicaciones$)]).subscribe({
            next: ([proveedores, ubicaciones]: [Proveedor[], Ubicacion[]]) => {
              this.productosConDetalles = productos.map((producto, index) => ({
                ...producto,
                proveedorNombre: proveedores[index]?.nombre || 'Sin Proveedor',
                ubicacionNombre: ubicaciones[index]?.nombre || 'Sin Ubicación'
              }));
  
              // Filtrar después de obtener los detalles
              this.productosConDetalles = this.productosConDetalles.filter((producto: any) => {
                let resultadoComparacion = false;
  
                switch (this.consultaPor) {
                  case 'codigo':
                    resultadoComparacion = producto.codProducto.toString() === valorConsulta.toString();
                    break;
                  case 'descripcion':
                    resultadoComparacion = producto.descripcion.toLowerCase() === valorConsulta.toString();
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
            },
            error: (error) => {
              console.error('Error al obtener detalles de proveedor/ubicación:', error);
            }
          });
        }
      });
    } else {
      this.obtenerProductosConDetalles(); // Si no hay filtro, obtenemos todos los productos
    }
  }
  }
