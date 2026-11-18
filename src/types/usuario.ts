
export interface Perfil {
  Id: number;
  Nome: string;
  Descricao?: string;
}


export interface Usuario {
  Id: string;
  Nome: string;
  Email: string;
  EstaAtivo: boolean;
  HashSenha: string;
  PerfilId: number;
  Perfil?: Perfil;
  CriadoEm?: string;
}

