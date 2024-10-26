import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroments/environment';
import { ActualizarStatus,Producto} from './models/Models';
import {  } from './models/Models';

@Injectable({
  providedIn: 'root'  // Este servicio será proporcionado en la raíz, disponible en toda la aplicación
})
export class ProductoService {
  private apiUrl = `${environment.apiUrl}/api/Producto`;  // URL de la API de Productos

  constructor(private http: HttpClient) {}

  // Método GET - Obtener todos los productos
  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/ObtenerProductos`);
  }

  // Método GET - Obtener un producto por su ID
  getProductoPorId(codProducto: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/ObtenerProductoPorId/${codProducto}`);
  }

  // Método POST - Crear un nuevo producto
  crearProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(`${this.apiUrl}/CrearProducto`, producto);
  }

  // Método PUT - Actualizar un producto
  actualizarProducto(codProducto: number, producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.apiUrl}/ActualizarProducto/${codProducto}`, producto);
  }

  // Método POST - Actualizar Status del producto
  actualizarStatus(codProducto: number, status: number): Observable<ActualizarStatus> {
    return this.http.post<ActualizarStatus>(`${this.apiUrl}/ActualizarStatus`, { codProducto, status });
  }

  // Método DELETE - Borrar un producto
  borrarProducto(codProducto: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/BorrarProducto/${codProducto}`);
  }
}
