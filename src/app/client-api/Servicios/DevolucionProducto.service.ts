import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroments/environment';
import { DevolucionProducto } from './models/Models';

@Injectable({
  providedIn: 'root'
})
export class DevolucionProductoService {
  private apiUrl = `${environment.apiUrl}/api/DevolucionProducto`;

  constructor(private http: HttpClient) {}

  obtenerDevoluciones(): Observable<DevolucionProducto[]> {
    return this.http.get<DevolucionProducto[]>(`${this.apiUrl}/ObtenerDevoluciones`);
  }

  obtenerDevolucionPorId(codDevolucion: number): Observable<DevolucionProducto> {
    return this.http.get<DevolucionProducto>(`${this.apiUrl}/ObtenerDevolucionPorId/${codDevolucion}`);
  }

  crearDevolucion(devolucion: DevolucionProducto): Observable<DevolucionProducto> {
    return this.http.post<DevolucionProducto>(`${this.apiUrl}/CrearDevolucion`, devolucion);
  }

  actualizarDevolucion(codDevolucion: number, devolucion: DevolucionProducto): Observable<DevolucionProducto> {
    return this.http.put<DevolucionProducto>(`${this.apiUrl}/ActualizarDevolucion/${codDevolucion}`, devolucion);
  }

  borrarDevolucion(codDevolucion: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/BorrarDevolucion/${codDevolucion}`);
  }
}
