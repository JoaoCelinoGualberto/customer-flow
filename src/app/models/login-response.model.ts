export interface LoginResponse {
    access_token: string;
    refresh_token: string;
    empresa_id: number;
    usuario_adm: {
      id: number;
      nome: string;
      email: string;
      ativo: boolean;
    };
    loja: {
      id: number;
      emp_cnpj: string;
      emp_razao: string;
      emp_fantasia: string;
      emp_endereco: string;
      emp_endereco_numero: string;
      emp_endereco_bairro: string;
      emp_endereco_cep: string;
      emp_endereco_municipio_descricao: string;
      emp_endereco_uf_sigla: string;
    };
    usuario: {
      id: number;
      nome: string;
      email: string;
      ativo: boolean;
      departamentos: string[];
    };
  }