import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private apiService: ApiService) {}

  // Get Costumers
  getCustomers(): Observable<any> {
    return this.apiService.get('Cadastro');
  }
}