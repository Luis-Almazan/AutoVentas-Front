import { Component } from '@angular/core';
import { RouterOutlet,RouterLink } from '@angular/router';

import { MenuComponent } from './menu/menu.component'; 
// CLIENTES
import { ActualizarClienteComponent } from './clientes/actualizar-cliente/actualizar-cliente.component';
import { BajaClienteComponent } from './clientes/baja-cliente/baja-cliente.component';
import { ConsultaClienteComponent } from './clientes/consulta-cliente/consulta-cliente.component';
import { DatosClienteComponent } from './clientes/datos-cliente/datos-cliente.component'; 
// ***********************************************************************************************
// ENTREGA-PAQUETE
import { BitacoraComponent } from './entrega-paquete/bitacora/bitacora.component';
import { IngresoEntregaComponent } from './entrega-paquete/ingreso-entrega/ingreso-entrega.component';
import { SeguimientoEntregaComponent } from './entrega-paquete/seguimiento-entrega/seguimiento-entrega.component';
// ***********************************************************************************************
//NOTA-CREDITO
import {AnulacionVentasComponent} from './nota-credito/anulacion-ventas/anulacion-ventas.component';
import { DevolucionProductoComponent} from './nota-credito/devolucion-producto/devolucion-producto.component';
// ***********************************************************************************************
//PRODUCTOS
import {ActualizaProductoComponent} from './productos/actualiza-producto/actualiza-producto.component';
import {BajaProductoComponent} from './productos/baja-producto/baja-producto.component';
import {ConsultaProductoComponent} from './productos/consulta-producto/consulta-producto.component';
import {IngresarProductoComponent} from './productos/ingresar-producto/ingresar-producto.component';
// ***********************************************************************************************
//SUB-MENUS
import {MenuClientesComponent} from './sub-menus/menu-clientes/menu-clientes.component';
import {MenuNotacreditoComponent} from './sub-menus/menu-notacredito/menu-notacredito.component';
import {MenuProductosComponent} from './sub-menus/menu-productos/menu-productos.component';
// ***********************************************************************************************
//VENTAS
import {ConsultaVentaComponent} from './ventas/consulta-venta/consulta-venta.component';
// ***********************************************************************************************


@Component({  
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink,MenuComponent,ActualizarClienteComponent,BajaClienteComponent,ConsultaClienteComponent,DatosClienteComponent,BitacoraComponent,IngresoEntregaComponent,SeguimientoEntregaComponent,AnulacionVentasComponent,DevolucionProductoComponent,ActualizaProductoComponent,BajaProductoComponent,ConsultaProductoComponent,IngresarProductoComponent,MenuClientesComponent,MenuNotacreditoComponent,MenuProductosComponent,ConsultaVentaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AutoVentas-Front';
}