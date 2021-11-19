import { Routes } from '@angular/router';
import { ClientesAgregarComponent } from '../clientes/clientes-agregar/clientes-agregar.component';
import { ClientesEditarComponent } from '../clientes/clientes-editar/clientes-editar.component';
import { ClientesComponent } from '../clientes/clientes.component';

import { DashboardComponent } from './dashboard.component';
import { VentasComponent } from '../ventas/ventas.component';

export const DashboardRoutes: Routes = [
    {

      path: '',
      children: [ {
        path: 'dashboard',
        component: DashboardComponent
      },{
        path: 'ventas',
        component: VentasComponent
      },
      {
        path:'clientes',
        component:ClientesComponent
      },
      {
        path:'nuevocliente',
        component:ClientesAgregarComponent
      },
      {
        path:'editarcliente/:ruc',
        component:ClientesEditarComponent
      }
      ]
    } 
];
