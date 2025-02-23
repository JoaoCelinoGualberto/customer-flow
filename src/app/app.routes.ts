import { Routes } from '@angular/router';
import { CustomerListComponent } from './features/customers/customer-list/customer-list.component';
import { AuthGuard } from './core/guards/auth.guard';
import { CustomerFormComponent } from './features/customers/customer-form/customer-form.component';

export const routes: Routes = [
  // Rota para o módulo de autenticação
  { 
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
  },
  
  // Rotas protegidas
  { path: 'customers', component: CustomerListComponent, canActivate: [AuthGuard] },
  { path: 'customers/new', component: CustomerFormComponent, canActivate: [AuthGuard] },
  { path: 'customers/edit/:id', component: CustomerFormComponent, canActivate: [AuthGuard] },

  // Redirecionamentos
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth/login' }
];  