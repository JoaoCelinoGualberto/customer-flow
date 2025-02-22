import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiUrl; 

  constructor(private http: HttpClient) {}

  // Generic method do Get Requests
  get(endpoint: string) {
    return this.http.get(`${this.apiUrl}/${endpoint}`);
  }

  // Generic method do Post Requests
  post(endpoint: string, body: any) {
    return this.http.post(`${this.apiUrl}/${endpoint}`, body);
  }

  // Generic method do Put Requests
  put(endpoint: string, body: any) {
    return this.http.put(`${this.apiUrl}/${endpoint}`, body);
  }
}