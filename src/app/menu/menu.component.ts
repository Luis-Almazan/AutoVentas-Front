import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // Asegúrate de importar CommonModule

@Component({
    selector: 'app-menu',
    standalone: true,
    imports:[RouterLink,RouterOutlet,CommonModule],
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
 
})
export class MenuComponent {
  clientesVisible = false;
  productosVisible = false;
  notasVisible = false;
  paquetesVisible = false; // Controla la visibilidad del submenú de Entrega de Paquetes

  toggleClientes() {
    this.clientesVisible = !this.clientesVisible;
  }

  toggleProductos() {
    this.productosVisible = !this.productosVisible;
  }

  toggleNotas() {
    this.notasVisible = !this.notasVisible;
  }

  togglePaquetes() {
    this.paquetesVisible = !this.paquetesVisible; // Alterna la visibilidad del submenú de Entrega de Paquetes
  }
}
