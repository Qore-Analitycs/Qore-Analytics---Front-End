/**
 * Payload enviado para `POST /api/PassosTeste/gerar`.
 */
export interface GerarRoteiroRequest {
  projetoId?: number | null;
  urlPullRequest?: string | null;
  branch?: string | null;
  commitSha?: string | null;
  urlAlvo?: string | null;
  prompt: string;
  githubToken?: string | null;
}

/**
 * Passo individual retornado pela IA em `GerarPlanoTesteDto`.
 */
export interface PassoTesteGeradoDto {
  id: number;
  titulo: string;
  acao: string;
  alvo: string;
  descricao: string;
  dadosTeste: string;
  resultadoEsperado: string;
  criterioMinimo: boolean;
}

/**
 * Plano de teste completo retornado por `POST /api/PassosTeste/gerar`.
 */
export interface GerarPlanoTesteDto {
  projetoId?: number | null;
  titulo: string;
  commit: string;
  nome: string;
  data: string;
  focoTeste: string;
  totalArquivosAlterados: number;
  arquivosAlterados: string[];
  impacto: string;
  preCondicoes: string[];
  criteriosMinimosAceitacao: string[];
  urlAlvo: string;
  passos: PassoTesteGeradoDto[];
}

/**
 * Envelope de resposta de `POST /api/PassosTeste/gerar` (`Ok(new { Resposta = resposta })`).
 */
export interface GerarRoteiroApiResponse<TPlano = GerarPlanoTesteDto> {
  resposta?: TPlano;
  Resposta?: TPlano;
}

/**
 * Opção de commit retornada por `GET /api/GitHub/repositorio`.
 */
export interface GitHubCommitOpcaoDto {
  sha: string;
  shortSha: string;
  titulo: string;
  mensagem: string;
  autor: string;
  data?: string | null;
}

/**
 * Resposta de inspeção de repositório GitHub (`GET /api/GitHub/repositorio`).
 */
export interface GitHubInspecaoRespostaDto {
  valido: boolean;
  owner: string;
  repositorio: string;
  urlRepositorio: string;
  branchSelecionada: string;
  commitSelecionado: string;
  branches: string[];
  commits: GitHubCommitOpcaoDto[];
}

/**
 * Máquina de estados estrita para inspeção automática de repositório GitHub.
 */
export type GitHubInspecaoEstado =
  | { status: "idle" }
  | { status: "loading"; urlConsultada: string }
  | { status: "success"; dados: GitHubInspecaoRespostaDto }
  | { status: "error"; mensagem: string };

/**
 * Mantido como alias de compatibilidade para consumidores legados.
 */
export type geracaoPromptrompt = GerarRoteiroRequest;
