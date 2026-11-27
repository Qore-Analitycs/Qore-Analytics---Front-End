import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PassoValidacao, ResumoRoteiro } from "@/components/documentoGerado/types";
import {
  DadosResultadoTeste,
  ResultadoPasso,
} from "@/components/testResult/types";
import type {
  AvaliacaoDodDto,
  ExecucaoIniciadaDto,
  ExecutarPassosMcpRequest,
  PassoTestePayload,
  RelatorioExecucaoMcpDto,
  ResultadoPassoMcpDto,
} from "@/@types/playwright";
import {
  extrairMensagemErroPlaywright,
  PlaywrightService,
} from "@/services/playwrightService";
import { toastErro, toastInfo, toastSucesso } from "@/utils/toast";

const INTERVALO_POLLING_STATUS_MS = 1200;
const INTERVALO_POLLING_LIVE_MS = 900;

export const ehExecucaoEmAndamento = (statusGeral?: string | null): boolean => {
  if (!statusGeral) return false;
  return /^(executando|pendente)$/i.test(statusGeral.trim());
};

const ehPassoAprovado = (status?: string | null): boolean => {
  if (!status) return false;
  return /^(aprovado|aprovado_com_cura|aprovadocomcura|passou)$/i.test(
    status.trim()
  );
};

const formatarDuracaoPasso = (ms: number): string => {
  if (!Number.isFinite(ms) || ms <= 0) return "0ms";
  if (ms < 1000) return `${Math.round(ms)}ms`;
  return `${(ms / 1000).toFixed(2)}s`;
};

const inferirAcaoPasso = (acaoTexto: string): string => {
  const texto = acaoTexto.trim().toLowerCase();
  if (/^(naveg|acess|abrir|ir para|entrar)/.test(texto)) return "navegar";
  if (/^(preench|digit|inform|inser|escrev)/.test(texto)) return "preencher";
  if (/^(selecion|escolh|marc)/.test(texto)) return "selecionar";
  if (/^(clic|acion|pression|submet|enviar)/.test(texto)) return "clicar";
  if (/^(verific|valid|confirm|checar|garant)/.test(texto)) return "verificar";
  return "interagir";
};

export const mapearPassosValidacaoParaPayload = (
  passos: PassoValidacao[]
): PassoTestePayload[] =>
  passos.map((passo, index) => {
    const descricao = passo.acao.trim() || `Passo ${index + 1}`;
    const titulo =
      descricao.length <= 75
        ? descricao
        : `${descricao.slice(0, 72).trimEnd()}...`;

    return {
      id: index + 1,
      titulo,
      acao: inferirAcaoPasso(descricao),
      alvo: "",
      descricao,
      dadosTeste: passo.dadoEntrada.trim(),
      resultadoEsperado: passo.resultadoEsperado.trim(),
      criterioMinimo: Boolean(passo.focoDiff),
    };
  });

const mapearPassoMcpParaResultado = (
  passo: ResultadoPassoMcpDto,
  index: number
): ResultadoPasso => {
  const passou = ehPassoAprovado(passo.status);
  const tags: string[] = [];

  if (passo.criterioMinimo) {
    tags.push("Critério Mínimo DoD");
  }
  if (!passou && passo.codigo) {
    tags.push(passo.codigo);
  }

  return {
    id: String(passo.id || index + 1),
    numero: index + 1,
    titulo: passo.titulo || passo.descricao || `Passo ${index + 1}`,
    descricao:
      passo.diagnostico || passo.descricao || passo.resultadoEsperado || undefined,
    status: passou ? "PASSOU" : "NAO_PASSOU",
    tempoExecucaoMs: passo.duracaoMs || 0,
    tempoExecucaoLabel: formatarDuracaoPasso(passo.duracaoMs || 0),
    ...(!passou && passo.erro ? { erroDetalhe: passo.erro } : {}),
    ...(tags.length > 0 ? { tags } : {}),
  };
};

export interface IniciarExecucaoContexto {
  urlAlvo: string;
  projetoId?: number | null;
  planoTesteId?: number | null;
  titulo?: string;
  commit?: string;
  autor?: string;
  data?: string;
  resumo?: ResumoRoteiro;
  preCondicoes?: string[];
  criteriosMinimosAceitacao?: string[];
  passos: PassoValidacao[];
}

export function usePlaywrightExecucao() {
  const [execucaoId, setExecucaoId] = useState<number | null>(null);
  const [execucaoIniciada, setExecucaoIniciada] =
    useState<ExecucaoIniciadaDto | null>(null);
  const [relatorio, setRelatorio] = useState<RelatorioExecucaoMcpDto | null>(
    null
  );
  const [frameAoVivoUrl, setFrameAoVivoUrl] = useState<string | null>(null);
  const [executando, setExecutando] = useState(false);
  const [erroExecucao, setErroExecucao] = useState<string | null>(null);
  const [avaliacaoDod, setAvaliacaoDod] = useState<AvaliacaoDodDto | null>(null);
  const [exportandoRelatorio, setExportandoRelatorio] = useState(false);

  const statusTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const liveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeRunTokenRef = useRef(0);
  const frameObjectUrlRef = useRef<string | null>(null);
  const desmontadoRef = useRef(false);

  const limparTimers = useCallback(() => {
    if (statusTimerRef.current) {
      clearTimeout(statusTimerRef.current);
      statusTimerRef.current = null;
    }
    if (liveTimerRef.current) {
      clearTimeout(liveTimerRef.current);
      liveTimerRef.current = null;
    }
  }, []);

  const atualizarFrameObjectUrl = useCallback((novoBlob: Blob | null) => {
    if (!novoBlob) return;
    const novaUrl = URL.createObjectURL(novoBlob);
    if (frameObjectUrlRef.current) {
      URL.revokeObjectURL(frameObjectUrlRef.current);
    }
    frameObjectUrlRef.current = novaUrl;
    setFrameAoVivoUrl(novaUrl);
  }, []);

  const limparFrameAtual = useCallback(() => {
    if (frameObjectUrlRef.current) {
      URL.revokeObjectURL(frameObjectUrlRef.current);
      frameObjectUrlRef.current = null;
    }
    setFrameAoVivoUrl(null);
  }, []);

  useEffect(() => {
    desmontadoRef.current = false;
    return () => {
      desmontadoRef.current = true;
      limparTimers();
      if (frameObjectUrlRef.current) {
        URL.revokeObjectURL(frameObjectUrlRef.current);
        frameObjectUrlRef.current = null;
      }
    };
  }, [limparTimers]);

  const iniciarPollingLive = useCallback(
    (idExecucao: number, runToken: number) => {
      const buscarFrame = async () => {
        if (desmontadoRef.current || activeRunTokenRef.current !== runToken) {
          return;
        }

        try {
          const blob = await PlaywrightService.obterFrameAoVivo(idExecucao);
          if (
            !desmontadoRef.current &&
            activeRunTokenRef.current === runToken &&
            blob
          ) {
            atualizarFrameObjectUrl(blob);
          }
        } catch {
          // Ignora falhas transitórias de frame ao vivo durante execução
        }

        if (!desmontadoRef.current && activeRunTokenRef.current === runToken) {
          liveTimerRef.current = setTimeout(
            buscarFrame,
            INTERVALO_POLLING_LIVE_MS
          );
        }
      };

      void buscarFrame();
    },
    [atualizarFrameObjectUrl]
  );

  const iniciarPollingStatus = useCallback(
    (idExecucao: number, runToken: number) => {
      const consultarStatus = async () => {
        if (desmontadoRef.current || activeRunTokenRef.current !== runToken) {
          return;
        }

        try {
          const snapshot = await PlaywrightService.obterExecucao(idExecucao);
          if (desmontadoRef.current || activeRunTokenRef.current !== runToken) {
            return;
          }

          setRelatorio(snapshot);
          if (snapshot.avaliacaoDod) {
            setAvaliacaoDod(snapshot.avaliacaoDod);
          }

          if (ehExecucaoEmAndamento(snapshot.statusGeral)) {
            statusTimerRef.current = setTimeout(
              consultarStatus,
              INTERVALO_POLLING_STATUS_MS
            );
            return;
          }

          // Execução finalizada: interrompe polling ao vivo e busca último frame
          if (liveTimerRef.current) {
            clearTimeout(liveTimerRef.current);
            liveTimerRef.current = null;
          }
          setExecutando(false);

          try {
            const ultimoFrame = await PlaywrightService.obterFrameAoVivo(
              idExecucao
            );
            if (!desmontadoRef.current && ultimoFrame) {
              atualizarFrameObjectUrl(ultimoFrame);
            }
          } catch {
            // Sem frame final não impede exibição do relatório
          }

          if (snapshot.passosFalhos > 0) {
            toastInfo(
              `Execução #${idExecucao} finalizada com ${snapshot.passosFalhos} falha(s).`
            );
          } else {
            toastSucesso(
              `Execução #${idExecucao} concluída com ${snapshot.conformidadePercentual}% de aprovação!`
            );
          }
        } catch (error) {
          if (desmontadoRef.current || activeRunTokenRef.current !== runToken) {
            return;
          }
          const mensagem = extrairMensagemErroPlaywright(
            error,
            "Erro ao consultar status da execução Playwright."
          );
          setErroExecucao(mensagem);
          setExecutando(false);
          limparTimers();
          toastErro(mensagem);
        }
      };

      void consultarStatus();
    },
    [atualizarFrameObjectUrl, limparTimers]
  );

  const iniciarExecucao = useCallback(
    async (contexto: IniciarExecucaoContexto): Promise<ExecucaoIniciadaDto | null> => {
      const urlLimpa = contexto.urlAlvo.trim();
      if (!/^https?:\/\/.+/i.test(urlLimpa)) {
        const msg =
          "Informe uma URL alvo válida iniciando com http:// ou https:// para executar o teste.";
        setErroExecucao(msg);
        toastErro(msg);
        return null;
      }

      if (!contexto.passos || contexto.passos.length === 0) {
        const msg = "Adicione ao menos um passo no roteiro antes de executar.";
        setErroExecucao(msg);
        toastErro(msg);
        return null;
      }

      limparTimers();
      limparFrameAtual();
      const runToken = ++activeRunTokenRef.current;

      setExecutando(true);
      setErroExecucao(null);
      setRelatorio(null);
      setAvaliacaoDod(null);

      const payload: ExecutarPassosMcpRequest = {
        planoTesteId: contexto.planoTesteId ?? null,
        projetoId:
          contexto.projetoId && contexto.projetoId > 0
            ? contexto.projetoId
            : null,
        titulo: contexto.titulo?.trim() || "Execução E2E Automatizada",
        urlAlvo: urlLimpa,
        commit: contexto.commit?.trim() || undefined,
        nome: contexto.autor?.trim() || undefined,
        data: contexto.data?.trim() || undefined,
        focoTeste: contexto.resumo?.focoTeste?.trim() || undefined,
        impacto: contexto.resumo?.impacto?.trim() || undefined,
        preCondicoes: (contexto.preCondicoes ?? [])
          .map((item) => item.trim())
          .filter(Boolean),
        criteriosMinimosAceitacao: (contexto.criteriosMinimosAceitacao ?? [])
          .map((item) => item.trim())
          .filter(Boolean),
        passos: mapearPassosValidacaoParaPayload(contexto.passos),
        maxIteracoesPorPasso: 6,
        gravarVideo: true,
      };

      try {
        const iniciada = await PlaywrightService.iniciarExecucaoPassos(payload);
        if (desmontadoRef.current || activeRunTokenRef.current !== runToken) {
          return null;
        }

        setExecucaoId(iniciada.execucaoId);
        setExecucaoIniciada(iniciada);
        toastInfo(
          `Execução #${iniciada.execucaoId} iniciada no Playwright ao vivo.`
        );

        iniciarPollingStatus(iniciada.execucaoId, runToken);
        iniciarPollingLive(iniciada.execucaoId, runToken);

        return iniciada;
      } catch (error) {
        if (desmontadoRef.current || activeRunTokenRef.current !== runToken) {
          return null;
        }

        const msg = extrairMensagemErroPlaywright(
          error,
          "Não foi possível iniciar a execução no Playwright."
        );
        setErroExecucao(msg);
        setExecutando(false);
        toastErro(msg);
        return null;
      }
    },
    [iniciarPollingLive, iniciarPollingStatus, limparFrameAtual, limparTimers]
  );

  const exportarRelatorio = useCallback(
    async (idOpcional?: number) => {
      const targetId = idOpcional ?? execucaoId;
      if (!targetId) {
        toastInfo("Execute um teste para exportar o relatório HTML.");
        return;
      }

      setExportandoRelatorio(true);
      try {
        const blob = await PlaywrightService.exportarRelatorioHtml(
          targetId,
          true
        );
        const urlBlob = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = urlBlob;
        link.download = `relatorio-execucao-${targetId}.html`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(urlBlob);
        toastSucesso(`Relatório da execução #${targetId} exportado!`);
      } catch (error) {
        toastErro(
          extrairMensagemErroPlaywright(
            error,
            "Erro ao exportar o relatório HTML."
          )
        );
      } finally {
        setExportandoRelatorio(false);
      }
    },
    [execucaoId]
  );

  const registrarAssinatura = useCallback((avaliacao: AvaliacaoDodDto) => {
    setAvaliacaoDod(avaliacao);
    setRelatorio((prev) =>
      prev
        ? {
            ...prev,
            avaliacaoDod: avaliacao,
            statusDod: avaliacao.decisao,
          }
        : prev
    );
  }, []);

  const resetarExecucao = useCallback(() => {
    activeRunTokenRef.current += 1;
    limparTimers();
    limparFrameAtual();
    setExecucaoId(null);
    setExecucaoIniciada(null);
    setRelatorio(null);
    setExecutando(false);
    setErroExecucao(null);
    setAvaliacaoDod(null);
  }, [limparFrameAtual, limparTimers]);

  const resultadoTeste: DadosResultadoTeste | null = useMemo(() => {
    if (!relatorio || ehExecucaoEmAndamento(relatorio.statusGeral)) {
      return null;
    }
    if (!relatorio.passos || relatorio.passos.length === 0) {
      return null;
    }

    return {
      passos: relatorio.passos.map(mapearPassoMcpParaResultado),
    };
  }, [relatorio]);

  return {
    execucaoId,
    execucaoIniciada,
    relatorio,
    frameAoVivoUrl,
    executando,
    erroExecucao,
    avaliacaoDod,
    exportandoRelatorio,
    resultadoTeste,
    iniciarExecucao,
    exportarRelatorio,
    registrarAssinatura,
    resetarExecucao,
  };
}
