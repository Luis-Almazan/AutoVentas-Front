import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroments/environment';
import { NotasCredito } from './models/Models';

@Injectable({
  providedIn: 'root'
})
export class NotasCreditoService {
  private apiUrl = `${environment.apiUrl}/api/NotasCredito`;

  constructor(private http: HttpClient) {}

  obtenerNotasCredito(): Observable<NotasCredito[]> {
    return this.http.get<NotasCredito[]>(`${this.apiUrl}/ObtenerNotasCredito`);
  }

  obtenerNotaCreditoPorId(codNotaCredito: number): Observable<NotasCredito> {
    return this.http.get<NotasCredito>(`${this.apiUrl}/ObtenerNotaCreditoPorId/${codNotaCredito}`);
  }

  crearNotaCredito(notaCredito: NotasCredito): Observable<NotasCredito> {
    return this.http.post<NotasCredito>(`${this.apiUrl}/CrearNotaCredito`, notaCredito);
  }

  actualizarNotaCredito(codNotaCredito: number, notaCredito: NotasCredito): Observable<NotasCredito> {
    return this.http.put<NotasCredito>(`${this.apiUrl}/ActualizarNotaCredito/${codNotaCredito}`, notaCredito);
  }

  borrarNotaCredito(codNotaCredito: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/BorrarNotaCredito/${codNotaCredito}`);
  }
}
