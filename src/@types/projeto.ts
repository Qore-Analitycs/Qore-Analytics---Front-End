export type Projeto = IProjeto;

export interface IProjeto {
  id: number
  criadoEm: string
  nome: string
  projetoId: number
  empresa: string
  ativo: boolean
  status: string
  totalUsuarios: number
  usuarios: Usuario[]
}

export interface Usuario {
  id: string
  nome: string
  email: string
  cargo: string
  empresaId: number
  empresa: string
  ativo: boolean
}

export interface CriarProjeto {
  nome: string;
  empresa?: number;
}
