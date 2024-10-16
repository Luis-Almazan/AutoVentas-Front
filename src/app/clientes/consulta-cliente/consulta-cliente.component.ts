import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClienteService, ProductoService } from '../../client-api/api'; // Ajustar la ruta de importación según la estructura del proyecto
import { Cliente } from '../../client-api/Servicios/models/Models'; // Importar desde el índice (index.ts)
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-consulta-cliente',
  templateUrl: './consulta-cliente.component.html',
  styleUrls: ['./consulta-cliente.component.css'],
  imports: [CommonModule, FormsModule]
})
export class ConsultaClienteComponent implements OnInit {
  clientes: Cliente[] = [];
  consultaPor: string = '';
  consultaValor: string | number = '';

  constructor(
    private clienteService: ClienteService,
    private productoService: ProductoService
  ) {}

  ngOnInit(): void {
    this.obtenerClientes();
  }

  obtenerClientes(): void {
    this.clienteService.getClientes().subscribe((data: Cliente[]) => {
      this.clientes = data;
    });
  }

  consultarClientes(): void {
    if (this.consultaPor && this.consultaValor) {
      const valorConsulta = typeof this.consultaValor === 'string' ? this.consultaValor.trim().toLowerCase() : this.consultaValor;

      this.clienteService.getClientes().subscribe((data: Cliente[]) => {
        this.clientes = data.filter((cliente: Cliente) => {
          switch (this.consultaPor) {
            case 'codigo':
              return cliente.codCliente.toString() === valorConsulta.toString();
            case 'nombres':
              return cliente.primerNombre.toLowerCase().includes(valorConsulta) ||
                (cliente.segundoNombre?.toLowerCase().includes(valorConsulta) ?? false);
            case 'apellidos':
              return cliente.primerApellido.toLowerCase().includes(valorConsulta) ||
                (cliente.segundoApellido?.toLowerCase().includes(valorConsulta) ?? false);
            case 'nit':
              return cliente.nit.toString() === valorConsulta.toString();
            case 'estado':
              const statusTexto = cliente.status === 1 ? 'activo' : 'desactivado';
              return statusTexto.includes(valorConsulta.toString().toLowerCase());
            default:
              return false;
          }
        });
      });
    } else {
      this.obtenerClientes(); // Si no hay filtro, obtenemos todos los clientes
    }
  }
}
