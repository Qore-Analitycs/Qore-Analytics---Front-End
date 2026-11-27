/**
 * Status possíveis de uma empresa na tela de Gerenciamento de Empresa.
 */
export type StatusEmpresa = "Ativo" | "Inativo";

/**
 * Entidade de empresa exibida como linha na tabela de Gerenciamento de Empresa
 * (colunas: "Empresa", "N Projeto" e "Status").
 */
export interface EmpresaItem {
  id: string;
  empresa: string;
  nProjetos: number;
  status: StatusEmpresa;
}

/**
 * Alias de compatibilidade para a entidade Empresa.
 */
export type Empresa = EmpresaItem;

/**
 * Chaves e configuração das colunas da variação de Empresas na Lista.
 */
export type ColunaTabelaEmpresaKey = "empresa" | "nProjetos" | "status";

export interface ColunaTabelaEmpresa {
  key: ColunaTabelaEmpresaKey;
  label: "Empresa" | "N Projeto" | "Status";
  align?: "left" | "center";
}

/**
 * Valores dos filtros específicos da tela de Gerenciamento de Empresa
 * (BUSCA RÁPIDA e STATUS).
 */
export interface DadosFiltroEmpresas {
  buscaRapida: string;
  status: string;
}

/**
 * Payload enviado ao criar uma nova empresa via modal.
 */
export interface CriarEmpresaPayload {
  empresa: string;
  nProjetos?: number;
  status?: StatusEmpresa;
}

/**
 * Props do modal de criação de empresa.
 */
export interface ModalCriarEmpresaProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (dados: CriarEmpresaPayload) => void | Promise<void>;
  isSubmitting?: boolean;
  errorMessage?: string | null;
}
