import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css'],
    standalone: true // Marca el componente como independiente
})
export class MenuComponent {

    constructor(private router: Router) {}

    navigateTo(menu: string): void {
        this.router.navigate([menu]); // Reemplaza 'page' con la ruta real
    }
}
