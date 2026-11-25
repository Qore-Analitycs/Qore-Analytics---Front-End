import { geracaoPromptrompt } from "@/@types/geracaoPrompt";
import { PromptService } from "@/services/geracaoPromptService";
import { toastErro, toastSucesso } from "@/utils/toast";
import { useState } from "react";

export function usePrompt() {
    const [prompts, setPrompts] = useState<geracaoPromptrompt[]>([]);
    const [promptAtual, setPromptAtual] = useState<geracaoPromptrompt | null>(null);
    const [carregando, setCarregando] = useState(false);

    async function gerarPrompt(dados: geracaoPromptrompt) {
        setCarregando(true);

        try {
            const novoPrompt = await PromptService.gerar(dados);

            setPromptAtual(novoPrompt);
            setPrompts((antigos) => [novoPrompt, ...antigos]);

            toastSucesso("Prompt gerado com sucesso!");

            return novoPrompt;
        } catch (error: any) {
            console.error("Erro ao gerar prompt:", error.response?.data || error);

            const mensagemApi =
                typeof error.response?.data === "string"
                    ? error.response.data
                    : error.response?.data?.message ||
                      error.response?.data?.title ||
                      "Erro ao gerar prompt";

            toastErro(mensagemApi);

            return;
        } finally {
            setCarregando(false);
        }
    }

    return {
        prompts,
        promptAtual,
        carregando,
        gerarPrompt,
    };
}