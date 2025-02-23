import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from './features/customers/customer-list/customer-list.component';
import { AuthGuard } from './core/guards/auth.guard';
import { CustomerFormComponent } from './features/customers/customer-form/customer-form.component';
import { LoginComponent } from './features/auth/login/login.component'; // Importe o LoginComponent

const routes: Routes = [
  { 
    path: 'auth',
    children: [
      { path: 'login', component: LoginComponent },
    ],
  },
  
  // Rotas protegidas
  { path: 'customers', component: CustomerListComponent, canActivate: [AuthGuard] },
  { path: 'customers/new', component: CustomerFormComponent, canActivate: [AuthGuard] },
  { path: 'customers/edit/:id', component: CustomerFormComponent, canActivate: [AuthGuard] },

  // Redirecionamentos
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}