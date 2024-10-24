import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroments/environment';
import { Ventum } from './models/Models';  // Importar la interfaz Venta

@Injectable({
  providedIn: 'root'  // Este servicio será proporcionado en la raíz, disponible en toda la aplicación
})
export class VentaService {
  private apiUrl = `${environment.apiUrl}/api/Venta`;  // URL base de la API

  constructor(private http: HttpClient) {}

  // Método GET - Obtener todas las ventas
  obtenerVentas(): Observable<Ventum[]> {
    return this.http.get<Ventum[]>(`${this.apiUrl}/ObtenerVentas`);
  }

  // Método GET - Obtener una venta por su ID
  obtenerVentaPorId(codVenta: number): Observable<Ventum> {
    return this.http.get<Ventum>(`${this.apiUrl}/ObtenerVentaPorId/${codVenta}`);
  }

  // Método POST - Crear una nueva venta
  crearVenta(venta: Ventum): Observable<Ventum> {
    return this.http.post<Ventum>(`${this.apiUrl}/CrearVenta`, venta);
  }

  // Método PUT - Actualizar una venta existente
  actualizarVenta(codVenta: number, venta: Ventum): Observable<Ventum> {
    return this.http.put<Ventum>(`${this.apiUrl}/ActualizarVenta/${codVenta}`, venta);
  }

  // Método DELETE - Borrar una venta existente
  borrarVenta(codVenta: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/BorrarVenta/${codVenta}`);
  }
}
