
// Representa um perfil de acesso.
export interface Perfil {
  id: number;
  nome: string;
  descricao?: string;
}

// Representa um usuário recebido da API.
export interface Usuario {
  id: string;
  nome: string;
  email: string;
  estaAtivo: boolean;
  perfilId: number;
  perfil?: Perfil;
  criadoEm?: string;
}

// Representa os dados enviados para cadastrar um usuário.
export interface CriarUsuarioDTO {
  nome: string;
  email: string;
  senha: string;
  perfilId: number;
}

// Representa os filtros da tela.
export interface FiltroUsuario {
  busca?: string;
  perfilId?: number;
  estaAtivo?: boolean;
  projetoId?: number;
}
