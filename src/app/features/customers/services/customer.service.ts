import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private apiService: ApiService) {}

  // Get All Customers
  getCustomers(): Observable<any> {
    return this.apiService.get('Cadastro');
  }

  // Post a Customer
  addCustomer(customer: any): Observable<any> {
    return this.apiService.post('Cadastro', customer);
  }

  // Get a Customer
  getCustomerById(id: number): Observable<any> {
    return this.apiService.get(`Cadastro/${id}`);
  }
  
  // Update a Customer
  updateCustomer(id: number, customer: any): Observable<any> {
    return this.apiService.put(`Cadastro/${id}`, customer);
  }
}