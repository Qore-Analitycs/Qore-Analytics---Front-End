export type TpDecisaoDod = "APROVADO_POR_QA" | "REPROVADO_POR_QA";

export interface PassoTestePayload {
  id: number;
  titulo: string;
  acao: string;
  alvo: string;
  descricao: string;
  dadosTeste: string;
  resultadoEsperado: string;
  criterioMinimo: boolean;
}

export interface GitHubCommitInfoDto {
  urlRepositorio: string;
  hashCommit: string;
  nomeBranch: string;
  nomeAutor: string;
  mensagem: string;
}

export interface RequisitoDto {
  idRequisito: string;
  titulo: string;
  categoria: string;
  modulo: string;
  arquivosAfetados: string[];
  casosTesteIds: string[];
  statusCobertura: string;
  prioridade: string;
  justificativa: string;
}

export interface AutorExecucaoDto {
  id: string;
  nome: string;
  email: string;
  cargo: string;
  empresaId: number;
  empresa: string;
  assinandoComoTexto?: string;
}

export interface AssinaturaPerfilDto {
  usuarioId: string;
  nome: string;
  email: string;
  cargo: string;
  empresaId: number;
  empresa: string;
  assinandoComoTexto: string;
  assinaturaBase64?: string | null;
  possuiAssinaturaSalva: boolean;
}

export interface SalvarAssinaturaPadraoRequest {
  assinaturaBase64?: string | null;
}

export interface AvaliarDodRequest {
  decisaoParecer: TpDecisaoDod;
  justificativaTecnica?: string;
  assinaturaBase64?: string | null;
  salvarAssinatura: boolean;
  termoAceito: boolean;
}

export interface AvaliacaoDodDto {
  id: number;
  decisao: string;
  justificativaTecnica: string;
  hashAssinatura: string;
  assinaturaBase64?: string | null;
  termoAceito: boolean;
  assinadoEm: string;
  assinadoEmFormatado: string;
  avaliadoPor?: AutorExecucaoDto | null;
}

export interface ExecutarPassosMcpRequest {
  planoTesteId?: number | null;
  projetoId?: number | null;
  titulo?: string;
  urlAlvo: string;
  commit?: string;
  nome?: string;
  data?: string;
  focoTeste?: string;
  impacto?: string;
  arquivosAlterados?: string[];
  preCondicoes?: string[];
  criteriosMinimosAceitacao?: string[];
  matrizRastreabilidade?: RequisitoDto[];
  commitInfo?: GitHubCommitInfoDto | null;
  passos: PassoTestePayload[];
  maxIteracoesPorPasso?: number;
  execucaoId?: number;
  gravarVideo?: boolean;
  usuarioId?: string;
}

export interface ExecucaoIniciadaDto {
  execucaoId: number;
  planoTesteId?: number | null;
  projetoId?: number | null;
  projetoNome?: string | null;
  titulo: string;
  urlAlvo: string;
  executadoPor?: AutorExecucaoDto | null;
  totalPassos: number;
  passos: PassoTestePayload[];
  statusUrl: string;
  liveUrl: string;
  videoUrl: string;
  relatorioUrl: string;
  exportarRelatorioUrl: string;
}

export interface RegistroAcaoMcpDto {
  iteracao: number;
  acao: string;
  target?: string | null;
  valor?: string | null;
  motivo: string;
  sucesso: boolean;
  erro?: string | null;
}

export interface ResultadoPassoMcpDto {
  id: number;
  codigo: string;
  titulo: string;
  tipo: string;
  acao?: string | null;
  alvo?: string | null;
  dadosTeste?: string | null;
  descricao?: string | null;
  resultadoEsperado?: string | null;
  criterioMinimo: boolean;
  status: string;
  duracaoMs: number;
  timestampRelativoMs: number;
  diagnostico: string;
  erro?: string | null;
  screenshotAntesUrl?: string | null;
  screenshotDepoisUrl?: string | null;
  acoes: RegistroAcaoMcpDto[];
}

export interface RelatorioExecucaoMcpDto {
  execucaoId: number;
  planoTesteId?: number | null;
  projetoId?: number | null;
  projetoNome?: string | null;
  titulo: string;
  urlAlvo: string;
  statusGeral: string;
  statusDod: string;
  criteriosMinimosAtingidos: boolean;
  conformidadePercentual: number;
  focoTeste: string;
  impacto: string;
  arquivosAlterados: string[];
  preCondicoes: string[];
  criteriosMinimosAceitacao: string[];
  matrizRastreabilidade: RequisitoDto[];
  commitInfo?: GitHubCommitInfoDto | null;
  iniciadoEm: string;
  finalizadoEm?: string | null;
  duracaoTotalMs: number;
  totalPassos: number;
  passosAprovados: number;
  passosFalhos: number;
  passosCriterioMinimoTotal: number;
  passosCriterioMinimoAprovados: number;
  videoUrl?: string | null;
  liveUrl: string;
  resumoExecucao: string;
  executadoPor?: AutorExecucaoDto | null;
  avaliacaoDod?: AvaliacaoDodDto | null;
  logs: string[];
  passos: ResultadoPassoMcpDto[];
}
