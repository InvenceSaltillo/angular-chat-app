import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // {
  //   path: '',
  //   component: PagesComponent,
  //   // canActivate: [ LoginGuard ],
  //   loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
  // },
  { path: '**', redirectTo: '/login', pathMatch: 'full'}
];

export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash: false } );
