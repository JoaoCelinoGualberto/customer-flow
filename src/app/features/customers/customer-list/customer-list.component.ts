import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

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

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.getCustomers().subscribe({
      next: (data) => {
        this.customers = data.itens;
        console.log('Clientes carregados:', this.customers);
      },
      error: (error) => {
        this.errorMessage = 'Erro ao carregar clientes. Tente novamente mais tarde.';
        console.error('Erro ao carregar clientes:', error);
      },
    });
  }
}