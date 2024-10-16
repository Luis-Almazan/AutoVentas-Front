import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'  // Este servicio será proporcionado en la raíz, disponible en toda la aplicación
})
export class ApiService {
  private apiUrl = 'https://localhost:44376/api/Cliente';  // URL de la API

  constructor(private http: HttpClient) {}

  // Método GET
  getClientes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/ObtenerClientes`);
  }


}
