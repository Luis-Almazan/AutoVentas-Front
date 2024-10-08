import { Component } from '@angular/core';
import { RouterLink, RouterModule ,RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-datos-cliente',
  standalone: true,
  imports: [RouterLink,RouterOutlet],
  templateUrl: './datos-cliente.component.html',
  styleUrl: './datos-cliente.component.css'
})
export class DatosClienteComponent {

}
