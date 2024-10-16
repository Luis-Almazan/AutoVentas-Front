import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroments/environment';
import { Cliente } from './models/cliente.model';  // Importar la interfaz Cliente
import { ActualizarStatusRequest } from './models/actualizar-status-request.model';

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

  // Método GET - Obtener clientes por status
  getClientesPorStatus(status: number): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.apiUrl}/ObtenerClientesPorStatus/${status}`);
  }

  // Método POST - Crear un nuevo cliente
  crearCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.apiUrl}/CrearCliente`, cliente);
  }

  // Método PUT - Actualizar un cliente
  actualizarCliente(codCliente: number, cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.apiUrl}/ActualizarCliente/${codCliente}`, cliente);
  }

  // Método POST - Actualizar el estado de un cliente
  actualizarStatus(codCliente: number, status: number): Observable<ActualizarStatusRequest> {
    return this.http.post<ActualizarStatusRequest>(`${this.apiUrl}/ActualizarStatus`, { codCliente, status });
  }

  // Método DELETE - Borrar un cliente
  borrarCliente(codCliente: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/BorrarCliente/${codCliente}`);
  }}
