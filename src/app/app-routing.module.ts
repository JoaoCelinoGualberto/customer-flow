import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { CustomerListComponent } from './features/customers/customer-list/customer-list.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [

  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route
  { path: '**', redirectTo: '/login' }, // Redirects to login when page not found

  // Protected routes
  { path: 'customers', component: CustomerListComponent, canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}