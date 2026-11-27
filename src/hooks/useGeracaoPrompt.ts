import { useCallback, useEffect, useRef, useState } from "react";
import type {
  GerarPlanoTesteDto,
  GerarRoteiroRequest,
  GitHubInspecaoEstado,
  GitHubInspecaoRespostaDto,
} from "@/@types/geracaoPrompt";
import {
  extrairMensagemErroGeracao,
  PromptService,
} from "@/services/geracaoPromptService";
import { toastErro, toastSucesso } from "@/utils/toast";

export interface UsePromptResult {
  planos: GerarPlanoTesteDto[];
  planoAtual: GerarPlanoTesteDto | null;
  carregando: boolean;
  inspecaoGitHub: GitHubInspecaoEstado;
  inspecionarGitHub: (
    url: string,
    branch?: string
  ) => Promise<GitHubInspecaoRespostaDto | null>;
  limparInspecaoGitHub: () => void;
  gerarPrompt: (
    dados: GerarRoteiroRequest
  ) => Promise<GerarPlanoTesteDto | null>;
}

export function usePrompt(): UsePromptResult {
  const [planos, setPlanos] = useState<GerarPlanoTesteDto[]>([]);
  const [planoAtual, setPlanoAtual] = useState<GerarPlanoTesteDto | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [inspecaoGitHub, setInspecaoGitHub] = useState<GitHubInspecaoEstado>({
    status: "idle",
  });

  const ultimoTokenInspecaoRef = useRef(0);
  const desmontadoRef = useRef(false);

  useEffect(() => {
    desmontadoRef.current = false;
    return () => {
      desmontadoRef.current = true;
    };
  }, []);

  const limparInspecaoGitHub = useCallback(() => {
    ultimoTokenInspecaoRef.current += 1;
    setInspecaoGitHub({ status: "idle" });
  }, []);

  const inspecionarGitHub = useCallback(
    async (
      url: string,
      branch?: string
    ): Promise<GitHubInspecaoRespostaDto | null> => {
      const urlLimpa = url.trim();
      if (!urlLimpa) {
        limparInspecaoGitHub();
        return null;
      }

      const tokenAtual = ++ultimoTokenInspecaoRef.current;
      setInspecaoGitHub({ status: "loading", urlConsultada: urlLimpa });

      try {
        const dados = await PromptService.inspecionarRepositorio(
          urlLimpa,
          branch
        );
        if (desmontadoRef.current || ultimoTokenInspecaoRef.current !== tokenAtual) {
          return null;
        }

        setInspecaoGitHub({ status: "success", dados });
        return dados;
      } catch (error) {
        if (desmontadoRef.current || ultimoTokenInspecaoRef.current !== tokenAtual) {
          return null;
        }

        const mensagem = extrairMensagemErroGeracao(error, "Link inválido");
        setInspecaoGitHub({ status: "error", mensagem });
        return null;
      }
    },
    [limparInspecaoGitHub]
  );

  const gerarPrompt = useCallback(
    async (dados: GerarRoteiroRequest): Promise<GerarPlanoTesteDto | null> => {
      setCarregando(true);

      try {
        const planoGerado = await PromptService.gerar(dados);
        if (desmontadoRef.current) return null;

        setPlanoAtual(planoGerado);
        setPlanos((antigos) => [planoGerado, ...antigos]);
        toastSucesso("Roteiro de teste gerado com sucesso!");
        return planoGerado;
      } catch (error) {
        if (!desmontadoRef.current) {
          const mensagemApi = extrairMensagemErroGeracao(
            error,
            "Erro ao gerar roteiro de teste."
          );
          toastErro(mensagemApi);
        }
        return null;
      } finally {
        if (!desmontadoRef.current) {
          setCarregando(false);
        }
      }
    },
    []
  );

  return {
    planos,
    planoAtual,
    carregando,
    inspecaoGitHub,
    inspecionarGitHub,
    limparInspecaoGitHub,
    gerarPrompt,
  };
}
