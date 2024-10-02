import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-actualizar-cliente',
  standalone: true,
  imports: [],
  templateUrl: './actualizar-cliente.component.html',
  styleUrl: './actualizar-cliente.component.css'
})
export class ActualizarClienteComponent {

  constructor(private router: Router) {}

  navigateTo(page: string): void {
      this.router.navigate([page]); // Reemplaza 'page' con la ruta real
  }

}
