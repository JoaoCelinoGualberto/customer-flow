import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importações corretas
import { CustomerService } from '../services/customer.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss'],
})
export class CustomerFormComponent implements OnInit {
  customerForm: FormGroup;
  isEditMode = false;
  customerId: number | null = null;

  constructor(
    private fb: FormBuilder, // FormBuilder está sendo injetado
    private customerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute
  ) {
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
    this.customerId = +this.route.snapshot.paramMap.get('id')!;
    if (this.customerId) {
      this.isEditMode = true;
      this.loadCustomer(this.customerId);
    }
  }

  loadCustomer(id: number): void {
    this.customerService.getCustomerById(id).subscribe({
      next: (customer) => {
        this.customerForm.patchValue(customer); // Preenche o formulário com os dados do cliente
      },
      error: (error) => {
        console.error('Error loading customer', error);
      },
    });
  }

  onSubmit(): void {
    if (this.customerForm.valid) {
      const customerData = {
        ...this.customerForm.value,
        ...this.getDefaultValues(), // Adiciona valores padrão
      };

      if (this.isEditMode && this.customerId) {
        this.customerService.updateCustomer(this.customerId, customerData).subscribe({
          next: () => {
            this.router.navigate(['/customers']);
          },
          error: (error) => {
            console.error('Erro ao atualizar cliente', error);
          },
        });
      } else {
        this.customerService.addCustomer(customerData).subscribe({
          next: () => {
            this.router.navigate(['/customers']);
          },
          error: (error) => {
            console.error('Erro ao adicionar cliente', error);
          },
        });
      }
    }
  }

  // Retorna valores padrão
  getDefaultValues(): any {
    return {
      id: 0,
      dt_ultima_alteracao: new Date().toISOString(),
      usuario_ultima_alteracao_id: 0,
      usuario_ultima_alteracao_nome: 'Admin',
      dt_inclusao: new Date().toISOString(),
      usuario_inclusao_id: 0,
      guid: 'string',
      emp_id: 0,
      chk_emp_disponivel: true,
      cadastro_id: 0,
      chk_alterar_nome: true,
      desconto_auto_aplicar: true,
      desconto_auto_aliq: 0,
      obs_nfe: '',
      consumidor_final: true,
      tipo_preco_venda: 'Padrão',
      cadastro_empresa_id: 0,
      cadastro_empresa_guid: 'string',
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
      tipo_regime_apuracao: '',
      nome_conjuge: '',
      inscricao_municipal: '',
      dt_casamento: new Date().toISOString(),
      id_print_wayy: '',
      cadastro_contato_padrao: {
        id: 0,
        dt_ultima_alteracao: new Date().toISOString(),
        usuario_ultima_alteracao_id: 0,
        usuario_ultima_alteracao_nome: 'Admin',
        dt_inclusao: new Date().toISOString(),
        usuario_inclusao_id: 0,
        guid: 'string',
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