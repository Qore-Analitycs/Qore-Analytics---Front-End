
export type Cargo = {
  id: number;
  nome: string;
};

export type EmpresaUsuario = {
  id: number;
  nome: string;
};

export type Usuario = {
  id: string;
  nome: string;
  email: string;
  ativo: boolean;
  cargo: Cargo | null;
  empresa?: EmpresaUsuario | string | null;
  imagem: string;
};

/**
 * Filtros aceitos pelo endpoint GET /api/usuarios.
 */
export type FiltrosUsuario = {
  nome?: string;
  cargo?: number;
  status?: boolean;
  empresa?: number;
};

/**
 * Estrutura de resposta retornada por GET /api/usuarios.
 */
export type RespostaListaUsuarios = {
  itens: Usuario[];
};
export type CriarUsuario = {
    nome: string;
    email: string;
    empresa?: string;
    senha: string;
    perfilId: number;
};

export type AtualizarUsuario = {
  Nome?: string;
  Email?: string;
  SenhaAtual?: string;
  NovaSenha?: string;
  ConfirmarNovaSenha?: string;
};
