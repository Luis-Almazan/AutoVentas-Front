import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports:[RouterLink,RouterOutlet],
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
 
})
export class MenuComponent {
    
}
