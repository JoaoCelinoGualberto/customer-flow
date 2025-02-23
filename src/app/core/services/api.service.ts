import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  // Default headers
  private defaultHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': '*/*',
  });

  constructor(private http: HttpClient) {}

  // Add token to headers
  private getHeadersWithToken(headers?: HttpHeaders): HttpHeaders {
    const token = localStorage.getItem('authToken'); // Get token from localStorage
    if (token) {
      return (headers || this.defaultHeaders).set('Authorization', `Bearer ${token}`);
    }
    return headers || this.defaultHeaders;
  }

  // Generic GET request
  get<T>(endpoint: string, headers?: HttpHeaders, params?: HttpParams): Observable<T> {
    const requestHeaders = this.getHeadersWithToken(headers); // Add token to headers
    return this.http.get<T>(`${this.apiUrl}/${endpoint}`, { headers: requestHeaders, params });
  }

  // Generic POST request
  post<T>(endpoint: string, body: any, headers?: HttpHeaders): Observable<T> {
    const requestHeaders = this.getHeadersWithToken(headers); // Add token to headers
    return this.http.post<T>(`${this.apiUrl}/${endpoint}`, body, { headers: requestHeaders });
  }

  // Generic PUT request
  put<T>(endpoint: string, body: any, headers?: HttpHeaders): Observable<T> {
    const requestHeaders = this.getHeadersWithToken(headers); // Add token to headers
    return this.http.put<T>(`${this.apiUrl}/${endpoint}`, body, { headers: requestHeaders });
  }

  // Generic DELETE request
  delete<T>(endpoint: string, headers?: HttpHeaders): Observable<T> {
    const requestHeaders = this.getHeadersWithToken(headers); // Add token to headers
    return this.http.delete<T>(`${this.apiUrl}/${endpoint}`, { headers: requestHeaders });
  }

  // Generic PATCH request
  patch<T>(endpoint: string, body: any, headers?: HttpHeaders): Observable<T> {
    const requestHeaders = this.getHeadersWithToken(headers); // Add token to headers
    return this.http.patch<T>(`${this.apiUrl}/${endpoint}`, body, { headers: requestHeaders });
  }
}