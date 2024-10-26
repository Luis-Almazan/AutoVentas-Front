import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroments/environment';
import { EntregaPaquete } from './models/Models';

@Injectable({
  providedIn: 'root'
})
export class EntregaPaqueteService {
  private apiUrl = `${environment.apiUrl}/api/EntregaPaquete`;

  constructor(private http: HttpClient) {}

  obtenerEntregas(): Observable<EntregaPaquete[]> {
    return this.http.get<EntregaPaquete[]>(`${this.apiUrl}/ObtenerEntregas`);
  }

  obtenerEntregaPorId(codEntrega: number): Observable<EntregaPaquete> {
    return this.http.get<EntregaPaquete>(`${this.apiUrl}/ObtenerEntregaPorId/${codEntrega}`);
  }

  crearEntrega(entrega: EntregaPaquete): Observable<EntregaPaquete> {
    return this.http.post<EntregaPaquete>(`${this.apiUrl}/CrearEntrega`, entrega);
  }

  actualizarEntrega(codEntrega: number, entrega: EntregaPaquete): Observable<EntregaPaquete> {
    return this.http.put<EntregaPaquete>(`${this.apiUrl}/ActualizarEntrega/${codEntrega}`, entrega);
  }

  borrarEntrega(codEntrega: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/BorrarEntrega/${codEntrega}`);
  }
}
