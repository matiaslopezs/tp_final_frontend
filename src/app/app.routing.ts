import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { ProductoComponent } from './producto/producto.component';
import { ProductoAgregarComponent } from './producto/producto-agregar/producto-agregar.component';
import { ProductoEditarComponent } from  './producto/producto-editar/producto-editar.component'
import { ReporteResumidoComponent } from './reporte-resumido/reporte-resumido.component';
export const AppRoutes: Routes = [
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    }, {
      path: '',
      component: AdminLayoutComponent,
      children: [
          {
        path: '',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
    }, {
        path: 'components',
        loadChildren: () => import('./components/components.module').then(m => m.ComponentsModule)
    }, {
        path: 'forms',
        loadChildren: () => import('./forms/forms.module').then(m => m.Forms)
    }, {
        path: 'tables',
        loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule)
    }, {
        path: 'maps',
        loadChildren: () => import('./maps/maps.module').then(m => m.MapsModule)
    }, {
        path: 'widgets',
        loadChildren: () => import('./widgets/widgets.module').then(m => m.WidgetsModule)
    }, {
        path: 'charts',
        loadChildren: () => import('./charts/charts.module').then(m => m.ChartsModule)
    }, {
        path: 'calendar',
        loadChildren: () => import('./calendar/calendar.module').then(m => m.CalendarModule)
    }, {
        path: '',
        loadChildren: () => import('./userpage/user.module').then(m => m.UserModule)
    }, {
        path: '',
        loadChildren: () => import('./timeline/timeline.module').then(m => m.TimelineModule)
    },{
        path:'productoComponent',
        component:ProductoComponent,
    },{
        path:'productoComponent/crear',
        component:ProductoAgregarComponent,
    },{
        path:'productoComponent/editar/:id',
        component:ProductoEditarComponent,
    },{
        path:'reporteResumido',
        component:ReporteResumidoComponent,
    },
  ]}, {
      path: '',
      component: AuthLayoutComponent,
      children: [{
        path: 'pages',
        loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
      }]
    }
];
