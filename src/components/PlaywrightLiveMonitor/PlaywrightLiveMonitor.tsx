import React from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Clock,
  ExternalLink,
  Loader2,
  MonitorPlay,
  Terminal,
  XCircle,
} from "lucide-react";
import type {
  ExecucaoIniciadaDto,
  RelatorioExecucaoMcpDto,
} from "@/@types/playwright";
import styles from "./PlaywrightLiveMonitor.module.css";

export type PlaywrightLiveMonitorProps = {
  execucaoId: number | null;
  execucaoIniciada: ExecucaoIniciadaDto | null;
  relatorio: RelatorioExecucaoMcpDto | null;
  frameAoVivoUrl: string | null;
  executando: boolean;
  erroExecucao?: string | null;
};

const obterClasseStatusPasso = (status: string): string => {
  const normalizado = status.trim().toLowerCase();
  if (normalizado === "aprovado" || normalizado === "aprovadocomcura") {
    return styles.passoAprovado;
  }
  if (normalizado === "falho") {
    return styles.passoFalho;
  }
  if (normalizado === "executando") {
    return styles.passoExecutando;
  }
  return styles.passoPendente;
};

const obterLabelStatusGeral = (
  executando: boolean,
  statusGeral?: string
): string => {
  if (executando) return "Executando ao vivo";
  if (!statusGeral) return "Finalizado";
  if (statusGeral === "AprovadoComRessalvas") return "Aprovado com Ressalvas";
  return statusGeral;
};

const PlaywrightLiveMonitor = ({
  execucaoId,
  execucaoIniciada,
  relatorio,
  frameAoVivoUrl,
  executando,
  erroExecucao,
}: PlaywrightLiveMonitorProps) => {
  if (!execucaoId && !executando && !erroExecucao) {
    return null;
  }

  const titulo =
    relatorio?.titulo || execucaoIniciada?.titulo || "Execução Playwright E2E";
  const urlAlvo = relatorio?.urlAlvo || execucaoIniciada?.urlAlvo || "";
  const passos = relatorio?.passos ?? [];
  const logs = relatorio?.logs ?? [];
  const totalPassos =
    relatorio?.totalPassos ?? execucaoIniciada?.totalPassos ?? passos.length;
  const concluidos =
    (relatorio?.passosAprovados ?? 0) + (relatorio?.passosFalhos ?? 0);
  const logsVisiveis = logs.slice(-8);

  return (
    <section
      className={styles.container}
      aria-label="Monitoramento Playwright ao Vivo"
    >
      <header className={styles.cabecalho}>
        <div className={styles.cabecalhoEsquerda}>
          <span
            className={`${styles.badgeLive} ${
              executando
                ? styles.badgeLiveAtivo
                : (relatorio?.passosFalhos ?? 0) > 0
                ? styles.badgeLiveFalha
                : styles.badgeLiveSucesso
            }`}
          >
            <span className={styles.pontoLive} aria-hidden="true" />
            <span>
              {obterLabelStatusGeral(executando, relatorio?.statusGeral)}
            </span>
          </span>

          <div className={styles.titulos}>
            <h2 className={styles.titulo}>
              {execucaoId ? `Execução #${execucaoId} — ${titulo}` : titulo}
            </h2>
            {urlAlvo && <span className={styles.urlAlvo}>{urlAlvo}</span>}
          </div>
        </div>

        <div className={styles.cabecalhoDireita}>
          <span className={styles.progressoTexto}>
            {concluidos}/{totalPassos} passos concluídos
          </span>

          {!executando && execucaoId && (
            <Link
              href={`/DetalhesTeste/${execucaoId}`}
              className={styles.linkDetalhes}
            >
              <span>Ver detalhes / vídeo</span>
              <ExternalLink size={14} aria-hidden="true" />
            </Link>
          )}
        </div>
      </header>

      {erroExecucao && (
        <div className={styles.alertaErro} role="alert">
          {erroExecucao}
        </div>
      )}

      <div className={styles.gridConteudo}>
        {/* Viewport ao vivo (/live) */}
        <div className={styles.painelViewport}>
          <div className={styles.barraNavegador}>
            <div className={styles.bolinhas}>
              <span className={styles.bolinhaVermelha} />
              <span className={styles.bolinhaAmarela} />
              <span className={styles.bolinhaVerde} />
            </div>
            <span className={styles.barraUrl}>
              {urlAlvo || "Playwright Chromium Live"}
            </span>
            <span className={styles.tagLive}>
              <MonitorPlay size={13} aria-hidden="true" />
              <span>LIVE</span>
            </span>
          </div>

          <div className={styles.palcoImagem}>
            {frameAoVivoUrl ? (
              <img
                src={frameAoVivoUrl}
                alt={`Tela ao vivo da execução #${execucaoId}`}
                className={styles.imagemAoVivo}
              />
            ) : (
              <div className={styles.estadoAguardando}>
                <Loader2
                  size={28}
                  className={executando ? styles.spinner : undefined}
                />
                <p>
                  {executando
                    ? "Iniciando navegador Chromium e capturando viewport..."
                    : "Nenhum frame capturado para esta execução."}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Passos em tempo real + logs */}
        <div className={styles.painelLateral}>
          <div className={styles.blocoPassos}>
            <h3 className={styles.subtitulo}>Progresso dos Passos</h3>
            {passos.length === 0 ? (
              <p className={styles.vazio}>
                Aguardando sincronização dos passos...
              </p>
            ) : (
              <ul className={styles.listaPassos}>
                {passos.map((passo, index) => {
                  const statusLower = passo.status.trim().toLowerCase();
                  const aprovado =
                    statusLower === "aprovado" ||
                    statusLower === "aprovadocomcura";
                  const falho = statusLower === "falho";
                  const rodando = statusLower === "executando";

                  return (
                    <li
                      key={`${passo.id}-${index}`}
                      className={`${styles.itemPasso} ${obterClasseStatusPasso(
                        passo.status
                      )}`}
                    >
                      <span className={styles.iconePasso} aria-hidden="true">
                        {aprovado ? (
                          <CheckCircle2 size={16} />
                        ) : falho ? (
                          <XCircle size={16} />
                        ) : rodando ? (
                          <Loader2 size={16} className={styles.spinner} />
                        ) : (
                          <Clock size={16} />
                        )}
                      </span>

                      <div className={styles.textoPasso}>
                        <span className={styles.nomePasso}>
                          {passo.codigo || `TC-${String(index + 1).padStart(2, "0")}`} —{" "}
                          {passo.titulo}
                        </span>
                        <span className={styles.statusPassoLabel}>
                          {passo.status}
                          {passo.duracaoMs > 0
                            ? ` • ${(passo.duracaoMs / 1000).toFixed(2)}s`
                            : ""}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <div className={styles.blocoLogs}>
            <h3 className={styles.subtitulo}>
              <Terminal size={14} aria-hidden="true" />
              <span>Logs da Execução</span>
            </h3>
            <div className={styles.caixaLogs}>
              {logsVisiveis.length === 0 ? (
                <span className={styles.logVazio}>
                  Aguardando registros do agente Playwright...
                </span>
              ) : (
                logsVisiveis.map((linha, idx) => (
                  <p key={idx} className={styles.linhaLog}>
                    {linha}
                  </p>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlaywrightLiveMonitor;
