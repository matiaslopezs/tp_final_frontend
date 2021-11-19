import { Routes } from '@angular/router';
import { ClientesAgregarComponent } from '../clientes/clientes-agregar/clientes-agregar.component';
import { ClientesComponent } from '../clientes/clientes.component';

import { DashboardComponent } from './dashboard.component';

export const DashboardRoutes: Routes = [
    {

      path: '',
      children: [ {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path:'clientes',
        component:ClientesComponent
      },
      {
        path:'nuevocliente',
        component:ClientesAgregarComponent
      }
      ]
    } 
];
