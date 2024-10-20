
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../../client-api/api'; // Ajustar la ruta de importación según la estructura del proyecto
import { Cliente, ActualizarStatusRequest } from '../../client-api/Servicios/models/Models'; // Importar la interfaz Cliente y ActualizarStatusRequest
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-baja-cliente',
  templateUrl: './baja-cliente.component.html',
  styleUrls: ['./baja-cliente.component.css'],
  imports: [CommonModule, FormsModule]
})
export class BajaClienteComponent {
  cliente: Cliente | null = null;
  ClientStatus: ActualizarStatusRequest = {
    codCliente: 0,
    status: 0
  };
  codigoCliente: number | null = null;
  mensaje: string = '';

  constructor(private clienteService: ClienteService) {}

  buscarCliente(): void {
    if (this.codigoCliente) {
      this.clienteService.getClientes().subscribe((clientes: Cliente[]) => {
        const clienteEncontrado = clientes.find(cliente => cliente.codCliente === this.codigoCliente);
        if (clienteEncontrado) {
          this.cliente = clienteEncontrado;
          this.mensaje = '';
        } else {
          this.cliente = null;
          this.mensaje = 'Cliente no encontrado';
        }
      });
    }
  }

  darDeBaja(): void {
    if (this.codigoCliente !== null) {
      this.clienteService.actualizarStatus(this.codigoCliente, 0).subscribe((response: ActualizarStatusRequest) => {
        this.mensaje = 'Cliente dado de baja exitosamente';
        this.ClientStatus = { 
          ...this.ClientStatus, 
          status: 0 
        };
      });
    }
  }

  reiniciar(): void {
    this.cliente = null;
    this.codigoCliente = null;
    this.mensaje = '';
  }
}
