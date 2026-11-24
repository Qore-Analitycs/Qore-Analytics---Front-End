
export type Cargo = {
  id: number;
  nome: string;
};

export type Usuario = {
  id: string;
  nome: string;
  email: string;
  ativo: boolean;
  cargo: Cargo | null;
  imagem: string;
};
export type CriarUsuario = {
    nome: string;
    email: string;
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
