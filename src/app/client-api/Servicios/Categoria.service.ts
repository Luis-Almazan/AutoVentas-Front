import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroments/environment';
import { Categoria } from './models/Models';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private apiUrl = `${environment.apiUrl}/api/Categoria`;

  constructor(private http: HttpClient) {}

  obtenerCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.apiUrl}/ObtenerCategorias`);
  }

  obtenerCategoriaPorId(codCategoria: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.apiUrl}/ObtenerCategoriaPorId/${codCategoria}`);
  }

  crearCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(`${this.apiUrl}/CrearCategoria`, categoria);
  }

  actualizarCategoria(codCategoria: number, categoria: Categoria): Observable<Categoria> {
    return this.http.put<Categoria>(`${this.apiUrl}/ActualizarCategoria/${codCategoria}`, categoria);
  }

  borrarCategoria(codCategoria: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/BorrarCategoria/${codCategoria}`);
  }
}
