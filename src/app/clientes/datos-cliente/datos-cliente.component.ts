import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../../client-api/api'; // Ajustar la ruta de importación según la estructura del proyecto
import { Cliente } from '../../client-api/Servicios/models/Models'; // Importar desde el índice (index.ts)

@Component({
  standalone: true,
  selector: 'app-datos-cliente',
  templateUrl: './datos-cliente.component.html',
  styleUrls: ['./datos-cliente.component.css'],
  imports: [CommonModule, FormsModule]
})
export class DatosClienteComponent {
  cliente: Cliente = {
    codCliente: 0,
    primerNombre: '',
    segundoNombre: '',
    primerApellido: '',
    segundoApellido: '',
    nit: 0,
    direccionCliente: '',
    categoriaCliente: 0,
    status: 1,
    entregaPaquetes: [],
    notasCreditos: [],
    venta: []
  };

  constructor(private clienteService: ClienteService) {}

  crearCliente(): void {
    this.clienteService.crearCliente(this.cliente).subscribe(
      response => {
        console.log('Cliente creado exitosamente', response);
        // Puedes agregar una lógica aquí para notificar al usuario o limpiar el formulario.
      },
      error => {
        console.error('Error al crear el cliente', error);
        // Manejo de errores.
      }
    );
  }
}
