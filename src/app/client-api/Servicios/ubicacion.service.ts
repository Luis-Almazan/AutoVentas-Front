import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroments/environment';
import { Ubicacion } from './models/Models';  // Importar la interfaz Ubicación

@Injectable({
  providedIn: 'root'  // Este servicio estará disponible en toda la aplicación
})
export class UbicacionService {
  private apiUrl = `${environment.apiUrl}/api/Ubicacion`;

  constructor(private http: HttpClient) {}

  // Obtener todas las ubicaciones
  getUbicaciones(): Observable<Ubicacion[]> {
    return this.http.get<Ubicacion[]>(`${this.apiUrl}/ObtenerUbicaciones`);
  }

  // Obtener una ubicación por ID
  getUbicacionPorId(codUbicacion: number): Observable<Ubicacion> {
    return this.http.get<Ubicacion>(`${this.apiUrl}/ObtenerUbicacionPorId/${codUbicacion}`);
  }

  // Crear una nueva ubicación
  crearUbicacion(ubicacion: Ubicacion): Observable<Ubicacion> {
    return this.http.post<Ubicacion>(`${this.apiUrl}/CrearUbicacion`, ubicacion);
  }

  // Actualizar una ubicación existente
  actualizarUbicacion(codUbicacion: number, ubicacion: Ubicacion): Observable<Ubicacion> {
    return this.http.put<Ubicacion>(`${this.apiUrl}/ActualizarUbicacion/${codUbicacion}`, ubicacion);
  }

  // Borrar una ubicación
  borrarUbicacion(codUbicacion: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/BorrarUbicacion/${codUbicacion}`);
  }
}
