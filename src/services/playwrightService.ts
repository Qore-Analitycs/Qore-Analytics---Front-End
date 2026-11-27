import axios from "axios";
import { api } from "./api";
import type {
  AssinaturaPerfilDto,
  AvaliacaoDodDto,
  AvaliarDodRequest,
  ExecucaoIniciadaDto,
  ExecutarPassosMcpRequest,
  RelatorioExecucaoMcpDto,
  SalvarAssinaturaPadraoRequest,
} from "@/@types/playwright";

const normalizarBaseApi = (): string => {
  const base = api.defaults.baseURL || "http://localhost:5044/api/";
  return base.endsWith("/") ? base : `${base}/`;
};

export const extrairMensagemErroPlaywright = (
  error: unknown,
  fallback = "Ocorreu um erro na comunicação com o serviço Playwright."
): string => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const data = error.response?.data as
      | { mensagem?: string; message?: string; title?: string }
      | string
      | undefined;

    if (typeof data === "string" && data.trim()) {
      return data;
    }

    if (data && typeof data === "object") {
      if (data.mensagem) return data.mensagem;
      if (data.message) return data.message;
      if (data.title) return data.title;
    }

    if (status === 401) {
      return "Você precisa estar autenticado para realizar esta operação.";
    }
    if (status === 403) {
      return "Apenas usuários com perfil QA ou ADMIN podem assinar e homologar este documento.";
    }
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
};

export const PlaywrightService = {
  async iniciarExecucaoPassos(
    payload: ExecutarPassosMcpRequest
  ): Promise<ExecucaoIniciadaDto> {
    const { data } = await api.post<ExecucaoIniciadaDto>(
      "Playwright/executar-passos/iniciar",
      payload
    );
    return data;
  },

  async obterExecucao(execucaoId: number): Promise<RelatorioExecucaoMcpDto> {
    const { data } = await api.get<RelatorioExecucaoMcpDto>(
      `Playwright/execucoes/${execucaoId}`
    );
    return data;
  },

  /**
   * Busca o frame PNG mais recente de /live.
   * Retorna null quando a API devolve 204 NoContent (screenshot ainda não disponível).
   */
  async obterFrameAoVivo(execucaoId: number): Promise<Blob | null> {
    const resposta = await api.get<Blob>(`Playwright/execucoes/${execucaoId}/live`, {
      params: { t: Date.now() },
      responseType: "blob",
      validateStatus: (status) => status === 200 || status === 204,
    });

    if (resposta.status === 204 || !resposta.data || resposta.data.size === 0) {
      return null;
    }

    return resposta.data;
  },

  async obterMinhaAssinatura(): Promise<AssinaturaPerfilDto> {
    const { data } = await api.get<AssinaturaPerfilDto>("Playwright/assinatura");
    return data;
  },

  async salvarMinhaAssinatura(
    payload: SalvarAssinaturaPadraoRequest
  ): Promise<AssinaturaPerfilDto> {
    const { data } = await api.put<AssinaturaPerfilDto>(
      "Playwright/assinatura",
      payload
    );
    return data;
  },

  async assinarExecucao(
    execucaoId: number,
    payload: AvaliarDodRequest
  ): Promise<AvaliacaoDodDto> {
    const { data } = await api.post<AvaliacaoDodDto>(
      `Playwright/execucoes/${execucaoId}/assinar`,
      payload
    );
    return data;
  },

  async exportarRelatorioHtml(
    execucaoId: number,
    download = true
  ): Promise<Blob> {
    const { data } = await api.get<Blob>(
      `Playwright/execucoes/${execucaoId}/relatorio/exportar`,
      {
        params: { download },
        responseType: "blob",
      }
    );
    return data;
  },

  obterUrlVideoExecucao(execucaoId: number, download = false): string {
    const base = normalizarBaseApi();
    return `${base}Playwright/execucoes/${execucaoId}/video${
      download ? "?download=true" : ""
    }`;
  },
};
