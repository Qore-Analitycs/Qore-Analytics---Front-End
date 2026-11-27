<<<<<<< HEAD
import type { OpcaoSelect } from "@/components/select/select";

export type { OpcaoSelect };

/**
 * Status possíveis de um projeto exibido na tela de Gerenciamento de Projetos.
 */
export type StatusProjeto = "Ativo" | "Inativo";

/**
 * Opção de empresa aceita nos seletores de filtro e criação de projeto.
 */
export type OpcaoEmpresaProjeto = string | OpcaoSelect;

/**
 * Entidade de projeto exibida como linha na tabela de Gerenciamento de Projetos
 * (colunas: "Projeto", "Empresa", "N Ususario" e "Status").
 */
export interface ProjetoItem {
  id: string;
  projeto: string;
  empresa: string;
  nUsuarios: number;
  status: StatusProjeto;
}

/**
 * Alias de compatibilidade para a entidade Projeto.
 */
export type Projeto = ProjetoItem;

/**
 * Chaves e configuração das colunas esperadas na variação de Projetos da Lista.
 */
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

/**
 * Valores dos filtros específicos da tela de Gerenciamento de Projetos
 * ("BUSCA RÁPIDA", "EMPRESA" e "STATUS", sem campo Cargo).
 */
export interface DadosFiltroProjetos {
  buscaRapida: string;
  empresa: string;
  status: string;
}

/**
 * Alias de compatibilidade para o estado de filtros de Projetos.
 */
export type FiltrosProjeto = DadosFiltroProjetos;

/**
 * Payload enviado ao criar um novo projeto via modal.
 */
export interface CriarProjetoPayload {
  projeto: string;
  empresa: string;
  nUsuarios?: number;
  status?: StatusProjeto;
}

/**
 * Props do modal de criação de projeto.
 */
export interface ModalCriarProjetoProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (dados: CriarProjetoPayload) => void | Promise<void>;
  empresas: OpcaoEmpresaProjeto[];
  isSubmitting?: boolean;
  errorMessage?: string | null;
=======
export interface Projeto {
    id: number
    criadoEm: string
    nome: string
    urlAlvo: string
    urlSwagger?: string
    usuarios: Usuario[]
}

export interface Usuario {
    id: string
    nome: string
    email: string
>>>>>>> feature/consumoCriarUsuario
}
