import axios from "axios";
import { api } from "./api";
import type {
  GerarPlanoTesteDto,
  GerarRoteiroApiResponse,
  GerarRoteiroRequest,
  GitHubInspecaoRespostaDto,
} from "@/@types/geracaoPrompt";

interface ErroApiPayload {
  mensagem?: string;
  message?: string;
  title?: string;
}

export const extrairMensagemErroGeracao = (
  error: unknown,
  fallback = "Não foi possível concluir a operação."
): string => {
  if (axios.isAxiosError<ErroApiPayload | string>(error)) {
    const payload = error.response?.data;
    if (typeof payload === "string" && payload.trim()) {
      return payload;
    }
    if (payload && typeof payload === "object") {
      if (payload.mensagem) return payload.mensagem;
      if (payload.message) return payload.message;
      if (payload.title) return payload.title;
    }
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
};

const extrairPlanoDaResposta = (
  payload: GerarRoteiroApiResponse<GerarPlanoTesteDto> | GerarPlanoTesteDto
): GerarPlanoTesteDto => {
  if ("resposta" in payload && payload.resposta) {
    return payload.resposta;
  }
  if ("Resposta" in payload && payload.Resposta) {
    return payload.Resposta;
  }
  return payload as GerarPlanoTesteDto;
};

export const PromptService = {
  /**
   * Valida a URL do GitHub e retorna branches e commits disponíveis.
   */
  async inspecionarRepositorio(
    url: string,
    branch?: string
  ): Promise<GitHubInspecaoRespostaDto> {
    const params: Record<string, string> = { url: url.trim() };
    if (branch && branch.trim()) {
      params.branch = branch.trim();
    }

    const { data } = await api.get<GitHubInspecaoRespostaDto>(
      "GitHub/repositorio",
      { params }
    );
    return data;
  },

  /**
   * Gera o roteiro e os passos de teste via IA (`POST /api/PassosTeste/gerar`).
   */
  async gerar(dados: GerarRoteiroRequest): Promise<GerarPlanoTesteDto> {
    const { data } = await api.post<
      GerarRoteiroApiResponse<GerarPlanoTesteDto> | GerarPlanoTesteDto
    >("PassosTeste/gerar", dados);

    return extrairPlanoDaResposta(data);
  },
};
