import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroments/environment';

@Injectable({
  providedIn: 'root'  // Este servicio será proporcionado en la raíz, disponible en toda la aplicación
})
export class ProductoService {
  private apiUrl = `${environment.apiUrl}/api/Producto`;  // URL de la API de Productos

  constructor(private http: HttpClient) {}

  // Método GET - Obtener todos los productos
  getProductos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/ObtenerProductos`);
  }
 
  // Método GET - Obtener un producto por su ID
  getProductoPorId(codProducto: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/ObtenerProductoPorId/${codProducto}`);
  }

  // Método POST - Crear un nuevo producto
  crearProducto(producto: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/CrearProducto`, producto);
  }

  // Método PUT - Actualizar un producto
  actualizarProducto(codProducto: number, producto: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/ActualizarProducto/${codProducto}`, producto);
  }

  // Método DELETE - Borrar un producto
  borrarProducto(codProducto: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/BorrarProducto/${codProducto}`);
  }
}
