import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroments/environment';
import { DetalleVentum } from './models/Models';  // Importar la interfaz DetalleVenta

@Injectable({
  providedIn: 'root'  // Este servicio será proporcionado en la raíz, disponible en toda la aplicación
})
export class DetalleVentaService {
  private apiUrl = `${environment.apiUrl}/api/DetalleVenta`;  // URL base de la API

  constructor(private http: HttpClient) {}

  // Método GET - Obtener todos los detalles de venta
  obtenerDetallesVenta(): Observable<DetalleVentum[]> {
    return this.http.get<DetalleVentum[]>(`${this.apiUrl}/ObtenerDetallesVenta`);
  }

  // Método GET - Obtener un detalle de venta por su ID
  obtenerDetalleVentaPorId(codDetalleVenta: number): Observable<DetalleVentum> {
    return this.http.get<DetalleVentum>(`${this.apiUrl}/ObtenerDetalleVentaPorId/${codDetalleVenta}`);
  }

  // Método POST - Crear un nuevo detalle de venta
  crearDetalleVenta(detalleVenta: DetalleVentum): Observable<DetalleVentum> {
    return this.http.post<DetalleVentum>(`${this.apiUrl}/CrearDetalleVenta`, detalleVenta);
  }

  crearDetallesVenta(detallesVenta: DetalleVentum[]): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/crearDetallesVenta`, detallesVenta);
  }

  // Método PUT - Actualizar un detalle de venta existente
  actualizarDetalleVenta(codDetalleVenta: number, detalleVenta: DetalleVentum): Observable<DetalleVentum> {
    return this.http.put<DetalleVentum>(`${this.apiUrl}/ActualizarDetalleVenta/${codDetalleVenta}`, detalleVenta);
  }

  // Método DELETE - Borrar un detalle de venta existente
  borrarDetalleVenta(codDetalleVenta: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/BorrarDetalleVenta/${codDetalleVenta}`);
  }
}
