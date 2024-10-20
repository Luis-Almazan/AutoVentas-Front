import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroments/environment';
import { Proveedor } from './models/proveedor.model';  // Importar la interfaz Proveedor

@Injectable({
  providedIn: 'root'  // Este servicio estará disponible en toda la aplicación
})
export class ProveedorService {
  private apiUrl = `${environment.apiUrl}/api/Proveedor`;

  constructor(private http: HttpClient) {}

  // Obtener todos los proveedores
  getProveedores(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(`${this.apiUrl}/ObtenerProveedores`);
  }

  // Obtener un proveedor por ID
  getProveedorPorId(codProveedor: number): Observable<Proveedor> {
    return this.http.get<Proveedor>(`${this.apiUrl}/ObtenerProveedorPorId/${codProveedor}`);
  }

  // Crear un nuevo proveedor
  crearProveedor(proveedor: Proveedor): Observable<Proveedor> {
    return this.http.post<Proveedor>(`${this.apiUrl}/CrearProveedor`, proveedor);
  }

  // Actualizar un proveedor existente
  actualizarProveedor(codProveedor: number, proveedor: Proveedor): Observable<Proveedor> {
    return this.http.put<Proveedor>(`${this.apiUrl}/ActualizarProveedor/${codProveedor}`, proveedor);
  }

  // Borrar un proveedor
  borrarProveedor(codProveedor: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/BorrarProveedor/${codProveedor}`);
  }
}
