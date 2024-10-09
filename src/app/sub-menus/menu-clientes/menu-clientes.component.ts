import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-menu-clientes',
  standalone: true,
  imports: [RouterLink,RouterOutlet],
  templateUrl: './menu-clientes.component.html',
  styleUrl: './menu-clientes.component.css'
})
export class MenuClientesComponent {

}
