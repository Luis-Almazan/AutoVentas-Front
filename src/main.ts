import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { MenuComponent } from './app/menu/menu.component';
import { ActualizarClienteComponent } from './app/clientes/actualizar-cliente/actualizar-cliente.component';

bootstrapApplication(ActualizarClienteComponent, appConfig)
  .catch((err) => console.error(err));

  bootstrapApplication(MenuComponent, appConfig)
  .catch((err) => console.error(err))