import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../../client-api/api';
import { Cliente } from '../../client-api/Servicios/models/Models';

@Component({
  standalone: true,
  selector: 'app-actualizar-cliente',
  templateUrl: './actualizar-cliente.component.html',
  styleUrls: ['./actualizar-cliente.component.css'],
  imports: [CommonModule, FormsModule]
})
export class ActualizarClienteComponent {
  codigoCliente: string = '';
  cliente: Cliente | null = null;
  mensaje: string = '';

  constructor(private clienteService: ClienteService) {}

  buscarCliente(): void {
    const codCliente = Number(this.codigoCliente);
    if (!isNaN(codCliente)) {
      this.clienteService.getClientes().subscribe(
        (data: Cliente[]) => {
          const clienteEncontrado = data.find(cliente => cliente.codCliente === codCliente);
          if (clienteEncontrado) {
            this.cliente = clienteEncontrado;
            this.mensaje = '';
          } else {
            this.cliente = null;
            this.mensaje = 'Cliente no encontrado';
          }
        },
        error => {
          console.error('Error al buscar el cliente', error);
          this.cliente = null;
          this.mensaje = 'Hubo un error al intentar buscar al cliente';
        }
      );
    } else {
      this.mensaje = 'Por favor, ingrese un código válido';
    }
  }

  actualizarCliente(): void {
    if (this.cliente) {
      this.clienteService.actualizarCliente(this.cliente.codCliente, this.cliente).subscribe(
        response => {
          console.log('Cliente actualizado exitosamente', response);
          this.mensaje = 'El cliente ha sido actualizado exitosamente';
        },
        error => {
          console.error('Error al actualizar el cliente', error);
          this.mensaje = 'Hubo un error al intentar actualizar al cliente';
        }
      );
    }
  }

  reiniciarFormulario(): void {
    this.cliente = null;
    this.codigoCliente = '';
    this.mensaje = '';
  }
}
