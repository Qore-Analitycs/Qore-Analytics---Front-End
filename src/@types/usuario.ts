
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

export type FiltrosUsuario = {
  nome?: string;
  cargo?: number;
  status?: boolean;
  empresa?: number;
};

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
