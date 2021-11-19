import { Routes } from '@angular/router';

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
      }]
  }
];
