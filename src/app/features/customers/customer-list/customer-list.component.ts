import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent implements OnInit {
  customers: any[] = [];
  errorMessage: string = '';

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.getCustomers().subscribe({
      next: (data) => (this.customers = data),
      error: (error) => {
        this.errorMessage = 'Failed to load customers. Please try again later.';
      },
    });
  }
}