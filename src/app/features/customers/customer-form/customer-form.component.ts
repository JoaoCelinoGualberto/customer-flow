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
      tipo_pessoa: ['Fisica', Validators.required],
      cpf_cnpj: ['', Validators.required],
      rg_ie: [],
      ativo: [true, Validators.required],
      email: ['', [Validators.email]],
      fone: [null],
      celular: [null],
      cadastro_endereco_padrao: this.fb.group({
        endereco: '',
        endereco_numero: '',
        endereco_bairro: '',
        endereco_cep: '',
        endereco_municipio_descricao: '',
        endereco_municipio_codigo_ibge: 1721000,
        endereco_uf_sigla: '',
        ativo: [true],
        principal: true,
        cobranca: false,
        descricao: 'PRINCIPAL',
        ie_produtor_rural: '1111'
      }),

      cadastro_empresa_guid: [null],
      cadastro_empresa_id: [null],
      cadastro_grupo_id: [null],
      cadastro_profissao_id: [null],
      cadastro_tipo_id: [0],
      chk_alterar_nome: [false],
      chk_emp_disponivel: [true],
      consumidor_final: [false],
      dados_banc_agencia: [null],
      dados_banc_data_conta: [null],
      dados_banc_fone_ag: [null],
      dados_banc_nome_banco: [null],
      dados_banc_num_banco: [null],
      dados_banc_num_conta: [null],
      dados_banc_obs: [null],
      dados_banc_tipo_conta: [null],
      dados_prof_cargo: [null],
      dados_prof_cnpj: [null],
      dados_prof_data_admissao: [null],
      dados_prof_endereco: [null],
      dados_prof_endereco_bairro: [null],
      dados_prof_endereco_cep: [null],
      dados_prof_endereco_municipio_codigo_ibge: [null],
      dados_prof_endereco_numero: [null],
      dados_prof_fone: [null],
      dados_prof_nome_empresa: [null],
      dados_prof_ocupacao: [null],
      dados_prof_vlr_outras_rendas: [null],
      dados_prof_vlr_renda_mensal: [null],
      desconto_auto_aliq: [null],
      desconto_auto_aplicar: [false],
      dt_casamento: [null],
      dt_inclusao: [null],
      dt_nascimento: [null],
      dt_ultima_alteracao: [null],
      emp_id: [1],
      estado_civil: [null],
      fax: [null],
      guid: [null],
      id_print_wayy: [null],
      ie_diferido: [null],
      inscricao_municipal: [null],
      naturalidade_cidade: [null],
      naturalidade_uf: [null],
      nome_conjuge: [null],
      nome_mae: [null],
      nome_pai: [null],
      obs_geral: [null],
      obs_nfe: [null],
      obs_venda: [null],
      qtd_dependentes: [null],
      rg_ie_uf: [null],
      sexo: [null],
      site: [null],
      tipo_cadastro: ['Cliente'],
      tipo_preco_venda: [null],
      tipo_regime_apuracao: [null],
      usuario_inclusao_id: [null],
      usuario_ultima_alteracao_id: [null],
      usuario_ultima_alteracao_nome: [null],
      vlr_limite_credito: [null],
    });
  }

  isLoading = false;
  successMessage: string | null = null;


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
        this.customerForm.patchValue(customer);
      },
      error: (error) => {
        console.error('Error loading customer', error);
      },
    });
  }
  // Handle form submission
  onSubmit(): void {
    this.errorMessages = [];
    if (this.customerForm.valid) {
      this.isLoading = true;

      // Create the customerData object with the form values
      const customerData = {
        ...this.customerForm.value,
        ...this.getDefaultValues(),
      };

      // If in edit mode, add the customer ID to the object
      if (this.isEditMode && this.customerId) {
        customerData.id = this.customerId; // Add the customer ID
      }

      if (this.isEditMode && this.customerId) {
        // Update the customer
        this.customerService.updateCustomer(this.customerId, customerData).subscribe({
          next: () => {
            this.isLoading = false;
            this.successMessage = 'Cliente atualizado com sucesso! :)';
            setTimeout(() => {
              this.successMessage = null;
              this.router.navigate(['/customers']);
            }, 2000);
          },
          error: (error) => {
            this.isLoading = false;
            console.error('Error ao atualizar cliente', error);
            this.handleApiError(error);
          },
        });
      } else {
        // Add a new customer
        this.customerService.addCustomer(customerData).subscribe({
          next: () => {
            this.isLoading = false;
            this.successMessage = 'Cliente adicionado com sucesso! :)';
            setTimeout(() => {
              this.successMessage = null;
              this.router.navigate(['/customers']);
            }, 2000);
          },
          error: (error) => {
            this.isLoading = false;
            console.error('Erro ao adicionar cliente', error);
            this.handleApiError(error);
          },
        });
      }
    } else {
      this.customerForm.markAllAsTouched(); // Mark all fields as touched
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
      cadastro_contato_padrao: {
        id: 0,
        dt_ultima_alteracao: new Date().toISOString(),
        usuario_ultima_alteracao_id: 0,
        usuario_ultima_alteracao_nome: 'string',
        dt_inclusao: new Date().toISOString(),
        usuario_inclusao_id: 0,
        ativo: true,
        cadastro_id: 0,
        descricao: 'string',
        fone: 'string',
        email: 'string',
        enviar_orcamento: true,
        enviar_nf: true,
        enviar_boleto: true
      },
    };
  }
}