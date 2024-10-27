import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BitacoraService } from '../../client-api/api'; // Ajusta la ruta según tu proyecto
import { Bitacora } from '../../client-api/Servicios/models/Models'; // Ajusta la ruta según tu proyecto
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-bitacora',
  templateUrl: './bitacora.component.html',
  styleUrls: ['./bitacora.component.css'],
  imports: [CommonModule, FormsModule]
})
export class BitacoraComponent implements OnInit {
  bitacoras: Bitacora[] = [];
  consultaPor: string = '';
  consultaValor: string = '';
  bitacorasFiltradas: Bitacora[] = [];

  constructor(private bitacoraService: BitacoraService) {}

  ngOnInit(): void {
    this.obtenerBitacoras();
  }

  obtenerBitacoras(): void {
    this.bitacoraService.obtenerBitacoras().subscribe({
      next: (data: Bitacora[]) => {
        this.bitacoras = data;
        this.bitacorasFiltradas = [...this.bitacoras];
      },
      error: (error) => {
        console.error('Error al obtener bitácoras:', error);
      }
    });
  }

  consultarBitacoras(): void {
    if (this.consultaPor && this.consultaValor) {
      const valorConsulta = this.consultaValor.trim().toLowerCase();

      this.bitacorasFiltradas = this.bitacoras.filter((bitacora: Bitacora) => {
        let resultadoComparacion = false;

        switch (this.consultaPor) {
          case 'tabla':
            resultadoComparacion = bitacora.tablaNombre.toLowerCase().includes(valorConsulta);
            break;
          case 'operacion':
            resultadoComparacion = bitacora.operacion.toLowerCase().includes(valorConsulta);
            break;
          case 'usuario':
            resultadoComparacion = bitacora.usuario.toLowerCase().includes(valorConsulta);
            break;
          default:
            resultadoComparacion = false;
        }

        return resultadoComparacion;
      });
    } else {
      this.bitacorasFiltradas = [...this.bitacoras];
    }
  }
}
