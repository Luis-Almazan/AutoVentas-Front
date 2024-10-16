import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { ApiService } from '../../client-api/api.service';  // Importar ApiService
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-consulta-cliente',
  templateUrl: './consulta-cliente.component.html',
  styleUrls: ['./consulta-cliente.component.css'],
  imports: [CommonModule, FormsModule]  // Importar solo CommonModule aquí
})
export class ConsultaClienteComponent implements OnInit {
  clientes: any[] = [];
  consultaPor: string = '';
  consultaValor: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.obtenerClientes().subscribe((data) => {
      this.clientes = data.map((cliente: any) => ({
        ...cliente,
        status: cliente.status === 1 ? 'Activo' : 'Desactivado'
      }));
    });
  }

  obtenerClientes(): Observable<any[]> {
    return this.apiService.getClientes();  // Usar el método del servicio ApiService
  }

  consultarClientes(): void {
    if (this.consultaPor && this.consultaValor) {
      this.apiService.getClientes().subscribe((data) => {
        this.clientes = data.filter((cliente: any) => {
          switch (this.consultaPor) {
            case 'codigo':
              return cliente.codCliente.toString().includes(this.consultaValor);
            case 'nombres':
              return cliente.primerNombre.toLowerCase().includes(this.consultaValor.toLowerCase()) ||
                     cliente.segundoNombre.toLowerCase().includes(this.consultaValor.toLowerCase());
            case 'apellidos':
              return cliente.primerApellido.toLowerCase().includes(this.consultaValor.toLowerCase()) ||
                     cliente.segundoApellido.toLowerCase().includes(this.consultaValor.toLowerCase());
            case 'nit':
              return cliente.nit.toString().includes(this.consultaValor);
            case 'estado':
              return cliente.status.toLowerCase().includes(this.consultaValor.toLowerCase());
            default:
              return false;
          }
        }).map((cliente:any) => ({
          ...cliente,
          status: cliente.status === 1 ? 'Activo' : 'Desactivado'
        }));
      });
    }
  }
}