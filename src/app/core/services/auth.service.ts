import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;

  constructor(private apiService: ApiService) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.apiService.post('Auth/login', credentials).pipe(
      tap(() => {
        this.isAuthenticated = true; // Authenticad user def
      })
    );
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated; // Return auth status
  }
}