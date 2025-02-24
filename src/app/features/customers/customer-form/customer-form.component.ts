import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerService } from '../services/customer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  styleUrls: ['./customer-form.component.scss'],
})
export class CustomerFormComponent implements OnInit {
  customerForm: FormGroup;
  isEditMode = false;
  customerId: number | null = null;
  errorMessages: string[] = []; 

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Initialize the form with default values and validators
    this.customerForm = this.fb.group({
      nome: ['', Validators.required],
      fantasia: [''],
      tipo_pessoa: ['Física', Validators.required],
      cpf_cnpj: ['', Validators.required],
      rg_ie: [''],
      email: ['', [Validators.required, Validators.email]],
      fone: [''],
      celular: [''],
      ativo: [true],
      cadastro_endereco_padrao: this.fb.group({
        endereco: [''],
        endereco_numero: [''],
        endereco_bairro: [''],
        endereco_cep: [''],
        endereco_municipio_descricao: [''],
        endereco_uf_sigla: [''],
      }),
    });
  }

  ngOnInit(): void {
    // Check if the form is in edit mode by checking the route parameter
    this.customerId = +this.route.snapshot.paramMap.get('id')!;
    if (this.customerId) {
      this.isEditMode = true;
      this.loadCustomer(this.customerId); // Load customer data if in edit mode
    }
  }

  // Load customer data by ID
  loadCustomer(id: number): void {
    this.customerService.getCustomerById(id).subscribe({
      next: (customer) => {
        this.customerForm.patchValue(customer); // Populate the form with customer data
      },
      error: (error) => {
        console.error('Error loading customer', error);
      },
    });
  }

  // Handle form submission
  onSubmit(): void {
    this.errorMessages = []; // Clear previous error messages
  
    if (this.customerForm.valid) {
      const customerData = {
        ...this.customerForm.value,
        ...this.getDefaultValues(), // Add default values
      };
  
      if (this.isEditMode && this.customerId) {
        // Update existing customer
        this.customerService.updateCustomer(this.customerId, customerData).subscribe({
          next: () => {
            this.router.navigate(['/customers']); // Navigate back to the customer list
          },
          error: (error) => {
            console.error('Error updating customer', error);
            this.handleApiError(error); // Handle API errors
          },
        });
      } else {
        // Add a new customer
        this.customerService.addCustomer(customerData).subscribe({
          next: () => {
            this.router.navigate(['/customers']); // Navigate back to the customer list
          },
          error: (error) => {
            console.error('Error adding customer', error);
            this.handleApiError(error); // Handle API errors
          },
        });
      }
    } else {
      this.customerForm.markAllAsTouched(); // Mark all fields as touched to display validation errors
    }
  }

  // Handle API errors
  handleApiError(error: any): void {
    if (error.error && error.error.errors) {
      this.errorMessages = error.error.errors; // Store error messages
    } else {
      this.errorMessages = ['Um erro inesperado aconteceu. Tente novamente.'];
    }
  }

  // Navigate back to the customer list
  goBack(): void {
    this.router.navigate(['/customers']);
  }

  // Return default values for the customer
  getDefaultValues(): any {
    return {
      id: 0,
      dt_ultima_alteracao: new Date().toISOString(),
      usuario_ultima_alteracao_id: 0,
      usuario_ultima_alteracao_nome: 'Admin',
      dt_inclusao: new Date().toISOString(),
      usuario_inclusao_id: 0,
      guid: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      ativo: true,
      emp_id: 0,
      chk_emp_disponivel: true,
      cadastro_id: 0,
      chk_alterar_nome: true,
      desconto_auto_aplicar: true,
      desconto_auto_aliq: 0,
      obs_nfe: '',
      consumidor_final: true,
      tipo_preco_venda: 'SomenteVenda',
      cadastro_empresa_id: 0,
      cadastro_empresa_guid: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      fantasia: '',
      tipo_pessoa: 'Física',
      tipo_cadastro: 'Cliente',
      cadastro_grupo_id: 0,
      cadastro_tipo_id: 0,
      cadastro_profissao_id: 0,
      rg_ie_uf: '',
      ie_diferido: '',
      dt_nascimento: new Date().toISOString(),
      vlr_limite_credito: 0,
      obs_venda: '',
      fax: '',
      site: '',
      sexo: '',
      estado_civil: '',
      naturalidade_cidade: '',
      naturalidade_uf: '',
      nome_pai: '',
      nome_mae: '',
      qtd_dependentes: 0,
      dados_prof_nome_empresa: '',
      dados_prof_cnpj: '',
      dados_prof_fone: '',
      dados_prof_data_admissao: new Date().toISOString(),
      dados_prof_ocupacao: '',
      dados_prof_cargo: '',
      dados_prof_vlr_renda_mensal: 0,
      dados_prof_vlr_outras_rendas: 0,
      dados_prof_endereco: '',
      dados_prof_endereco_numero: '',
      dados_prof_endereco_bairro: '',
      dados_prof_endereco_cep: '',
      dados_prof_endereco_municipio_codigo_ibge: 0,
      dados_banc_num_banco: 0,
      dados_banc_nome_banco: '',
      dados_banc_agencia: '',
      dados_banc_num_conta: '',
      dados_banc_tipo_conta: '',
      dados_banc_data_conta: new Date().toISOString(),
      dados_banc_fone_ag: '',
      dados_banc_obs: '',
      obs_geral: '',
      tipo_regime_apuracao: 'Simples',
      nome_conjuge: '',
      inscricao_municipal: '',
      dt_casamento: new Date().toISOString(),
      id_print_wayy: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      cadastro_endereco_padrao: {
        id: 0,
        dt_ultima_alteracao: new Date().toISOString(),
        usuario_ultima_alteracao_id: 0,
        usuario_ultima_alteracao_nome: 'Admin',
        dt_inclusao: new Date().toISOString(),
        usuario_inclusao_id: 0,
        guid: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        ativo: true,
        cadastro_id: 0,
        principal: true,
        cobranca: true,
        ie_produtor_rural: '',
        descricao: '',
        endereco: '',
        endereco_numero: '',
        endereco_bairro: '',
        endereco_complemento: '',
        endereco_cep: '',
        endereco_municipio_codigo_ibge: 0,
        endereco_municipio_descricao: '',
        endereco_uf_sigla: '',
        endereco_uf_codigo: 0,
        endereco_municipio_codigo_pais: 0,
        endereco_municipio_descricao_pais: '',
      },
      cadastro_contato_padrao: {
        id: 0,
        dt_ultima_alteracao: new Date().toISOString(),
        usuario_ultima_alteracao_id: 0,
        usuario_ultima_alteracao_nome: 'Admin',
        dt_inclusao: new Date().toISOString(),
        usuario_inclusao_id: 0,
        guid: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        ativo: true,
        cadastro_id: 0,
        descricao: '',
        fone: '',
        email: '',
        enviar_orcamento: true,
        enviar_nf: true,
        enviar_boleto: true,
      },
    };
  }
}