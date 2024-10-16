import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroments/environment';
import { Cliente } from './models/cliente.model';  // Importar la interfaz Cliente

@Injectable({
  providedIn: 'root'  // Este servicio será proporcionado en la raíz, disponible en toda la aplicación
})
export class ClienteService {
  private apiUrl = `${environment.apiUrl}/api/Cliente`;  // URL de la API

  constructor(private http: HttpClient) {}

  // Método GET - Obtener todos los clientes
  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.apiUrl}/ObtenerClientes`);
  }

  // Método GET - Obtener un cliente por su ID
  getClientePorId(codCliente: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/ObtenerClientePorId/${codCliente}`);
  }

  // Método POST - Crear un nuevo cliente
  crearCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.apiUrl}/CrearCliente`, cliente);
  }

  // Método PUT - Actualizar un cliente
  actualizarCliente(codCliente: number, cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.apiUrl}/ActualizarCliente/${codCliente}`, cliente);
  }

  // Método DELETE - Borrar un cliente
  borrarCliente(codCliente: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/BorrarCliente/${codCliente}`);
  }
}
