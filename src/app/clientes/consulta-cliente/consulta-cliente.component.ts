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
          let resultadoComparacion = false;

          switch (this.consultaPor) {
            case 'codigo':
              resultadoComparacion = cliente.codCliente.toString() === valorConsulta.toString();
              break;
            case 'nombres':
              resultadoComparacion =
                cliente.primerNombre.toLowerCase() === valorConsulta ||
                (cliente.segundoNombre ? cliente.segundoNombre.toLowerCase() === valorConsulta : false);
              break;
            case 'apellidos':
              resultadoComparacion =
                cliente.primerApellido.toLowerCase() === valorConsulta ||
                (cliente.segundoApellido ? cliente.segundoApellido.toLowerCase() === valorConsulta : false);
              break;
            case 'nit':
              resultadoComparacion = cliente.nit.toString() === valorConsulta.toString();
              break;
            case 'estado':
              const statusTexto = cliente.status === 1 ? 'activo' : 'desactivado';
              resultadoComparacion = statusTexto === valorConsulta.toString().toLowerCase();
              break;
            default:
              resultadoComparacion = false;
          }

          return resultadoComparacion;
        });
      });
    } else {
      this.obtenerClientes(); // Si no hay filtro, obtenemos todos los clientes
    }
  }
}