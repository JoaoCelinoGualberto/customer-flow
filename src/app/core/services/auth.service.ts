import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError, retry } from 'rxjs/operators';
import { LoginResponse } from '../../models/login-response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;

  constructor(
    private apiService: ApiService,
    private router: Router 
  ) {
    this.isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  }

  login(credentials: { email: string; senha: string; empresa_id: number; loja_id: number }): Observable<LoginResponse> {
    const body = {
      email: credentials.email,
      senha: credentials.senha,
      empresa_id: credentials.empresa_id,
      loja_id: credentials.loja_id
    };

    return this.apiService.post<LoginResponse>('Auth/login', body).pipe(
      retry(1), // Try request again
      tap((response: LoginResponse) => {
        this.isAuthenticated = true;
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('authToken', response.access_token); 
        this.router.navigate(['customers']);
      }),
      catchError((error) => {
        console.error('Erro no login:', error);
        this.isAuthenticated = false;
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('authToken');
        return throwError(() => new Error('Falha no login. Tente novamente.')); 
      })
    );
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  logout(): void {
    this.isAuthenticated = false;
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('empresaId');
    this.router.navigate(['/auth/login']);
  }
}