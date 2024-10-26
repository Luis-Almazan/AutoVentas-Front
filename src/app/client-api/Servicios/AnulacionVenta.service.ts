import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroments/environment';
import { AnulacionVenta } from './models/Models';

@Injectable({
  providedIn: 'root'
})
export class AnulacionVentaService {
  private apiUrl = `${environment.apiUrl}/api/AnulacionVenta`;

  constructor(private http: HttpClient) {}

  obtenerAnulaciones(): Observable<AnulacionVenta[]> {
    return this.http.get<AnulacionVenta[]>(`${this.apiUrl}/ObtenerAnulaciones`);
  }

  obtenerAnulacionPorId(codAnulacion: number): Observable<AnulacionVenta> {
    return this.http.get<AnulacionVenta>(`${this.apiUrl}/ObtenerAnulacionPorId/${codAnulacion}`);
  }

  crearAnulacion(anulacion: AnulacionVenta): Observable<AnulacionVenta> {
    return this.http.post<AnulacionVenta>(`${this.apiUrl}/CrearAnulacion`, anulacion);
  }

  actualizarAnulacion(codAnulacion: number, anulacion: AnulacionVenta): Observable<AnulacionVenta> {
    return this.http.put<AnulacionVenta>(`${this.apiUrl}/ActualizarAnulacion/${codAnulacion}`, anulacion);
  }

  borrarAnulacion(codAnulacion: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/BorrarAnulacion/${codAnulacion}`);
  }
}
