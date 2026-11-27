import type { OpcaoSelect } from "@/components/select/select";

export type { OpcaoSelect };

export type StatusProjeto = "Ativo" | "Inativo";

export type OpcaoEmpresaProjeto = string | OpcaoSelect;

export interface ProjetoItem {
  id: string;
  projeto: string;
  empresa: string;
  nUsuarios: number;
  status: StatusProjeto;
}

export interface Usuario {
  id: string;
  nome: string;
  email: string;
}

export interface Projeto {
  id: number;
  criadoEm: string;
  nome: string;
  empresaId?: number;
  empresa?: string;
  ativo?: boolean;
  status?: StatusProjeto;
  totalUsuarios?: number;
  urlAlvo?: string;
  urlSwagger?: string;
  usuarios: Usuario[];
}

export type ColunaTabelaProjetoKey =
  | "projeto"
  | "empresa"
  | "nUsuarios"
  | "status";

export interface ColunaTabelaProjeto {
  key: ColunaTabelaProjetoKey;
  label: "Projeto" | "Empresa" | "N Ususario" | "Status";
  align?: "left" | "center";
}

export interface DadosFiltroProjetos {
  buscaRapida: string;
  empresa: string;
  status: string;
}

export type FiltrosProjeto = DadosFiltroProjetos;

export interface CriarProjetoPayload {
  projeto: string;
  empresa: string;
  nUsuarios?: number;
  status?: StatusProjeto;
}

export interface ModalCriarProjetoProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (dados: CriarProjetoPayload) => void | Promise<void>;
  empresas: OpcaoEmpresaProjeto[];
  isSubmitting?: boolean;
  errorMessage?: string | null;
}
