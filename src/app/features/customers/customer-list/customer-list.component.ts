import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent implements OnInit {
  customers: any[] = [];
  errorMessage: string = '';

  constructor(
    private customerService: CustomerService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadCustomers(); 
    this.initTooltips();
  }

  // Fetch customers from the service
  loadCustomers(): void {
    this.customerService.getCustomers().subscribe({
      next: (data) => {
        this.customers = data.itens; // Assign fetched data to the customers array
        console.log('Clientes carregados:', data);
      },
      error: (error) => {
        console.error('Erro ao carregar clientes:', error);
      },
    });
  }

  // Logout the user and navigate to the login page
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  // Navigate to the customer edit page
  editCustomer(customerId: number): void {
    this.router.navigate(['/customers/edit', customerId]);
  }

  // Initialize Bootstrap tooltips
  initTooltips(): void {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map((element) => {
      return new (window as any).bootstrap.Tooltip(element);
    });
  }
}