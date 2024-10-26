import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroments/environment';
import { StatusVenta } from './models/Models';

@Injectable({
  providedIn: 'root'
})
export class StatusVentaService {
  private apiUrl = `${environment.apiUrl}/api/StatusVenta`;

  constructor(private http: HttpClient) {}

  obtenerStatusVentas(): Observable<StatusVenta[]> {
    return this.http.get<StatusVenta[]>(`${this.apiUrl}/ObtenerStatusVentas`);
  }

  obtenerStatusVentaPorId(codVenta: number): Observable<StatusVenta> {
    return this.http.get<StatusVenta>(`${this.apiUrl}/ObtenerStatusVentaPorId/${codVenta}`);
  }

  crearStatusVenta(statusVenta: StatusVenta): Observable<StatusVenta> {
    return this.http.post<StatusVenta>(`${this.apiUrl}/CrearStatusVenta`, statusVenta);
  }

  actualizarStatusVenta(codVenta: number, statusVenta: StatusVenta): Observable<StatusVenta> {
    return this.http.put<StatusVenta>(`${this.apiUrl}/ActualizarStatusVenta/${codVenta}`, statusVenta);
  }

  borrarStatusVenta(codVenta: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/BorrarStatusVenta/${codVenta}`);
  }
}
