import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-menu-productos',
  standalone: true,
  imports: [RouterLink,RouterOutlet],
  templateUrl: './menu-productos.component.html',
  styleUrl: './menu-productos.component.css'
})
export class MenuProductosComponent {

}
