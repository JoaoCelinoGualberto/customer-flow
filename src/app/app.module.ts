import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http'; // Importe HTTP_INTERCEPTORS
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CustomerListComponent } from './features/customers/customer-list/customer-list.component';
import { CustomerFormComponent } from './features/customers/customer-form/customer-form.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';

// Definição das rotas
const routes: Routes = [
  { 
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
  },
  { path: 'customers', component: CustomerListComponent, canActivate: [AuthGuard] },
  { path: 'customers/new', component: CustomerFormComponent, canActivate: [AuthGuard] },
  { path: 'customers/edit/:id', component: CustomerFormComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth/login' }
];

@NgModule({
  declarations: [
    AppComponent,
    CustomerListComponent,
    CustomerFormComponent,
  ],
  imports: [
    BrowserModule,
    HttpClient, 
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    FormsModule 
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }