import { geracaoPromptrompt } from "@/@types/geracaoPrompt";
import { api } from "./api"; // Ajuste para o caminho da sua instância do Axios

export const PromptService = {
  async gerar(dados: geracaoPromptrompt): Promise<geracaoPromptrompt> {
    const { data } = await api.post<geracaoPromptrompt>("/PassosTeste/gerar", dados);
    return data;
  },
};