import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private apiService: ApiService) {}

  // Login Method
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.apiService.post('Auth/login', credentials);
  }
}