import React, { useCallback, useEffect, useRef, useState } from "react";
import {
    Activity,
    Calendar,
    Lock,
    Maximize2,
    Minimize2,
    Pause,
    Play,
    RefreshCw,
    RotateCcw,
    RotateCw,
    Square,
    VideoOff,
    Volume2,
    VolumeX,
} from "lucide-react";
import styles from "./VideoSessionPlayer.module.css";

export type VelocidadeReproducao = 0.5 | 1 | 1.5 | 2;

export type MarcadorEventoSessao = {
    id: string;
    /** Momento exato do evento em segundos (ex: 1.0, 2.0, 3.2, 4.4) */
    timestamp: number;
    /** Rótulo descritivo da interação (ex: "Navegação", "Formulário", "Clique", "Confirmação") */
    rotulo: string;
    /** Rótulo de tempo curto opcional (ex: "0:01"). Se omitido, é gerado automaticamente */
    tempoLabel?: string;
    /** Comando/seletor técnico capturado pelo Playwright */
    detalheAcao?: string;
    /** Resumo contextual discreto exibido durante o passo */
    resumoContextual?: string;
};

export type TimelineEventItem = MarcadorEventoSessao;

export type VideoSessionPlayerProps = {
    /** URL do arquivo de vídeo (.mp4 / .webm). Se ausente, vazio ou com falha de carregamento, exibe o estado "Vídeo não encontrado". */
    src?: string;
    /** Imagem de capa opcional para o elemento <video> */
    poster?: string;
    /** Título principal da sessão (alias EN: sessionTitle) */
    sessionTitle?: string;
    tituloSessao?: string;
    /** Badge técnico de qualidade e taxa de quadros (alias EN: resolutionBadge) */
    resolutionBadge?: string;
    qualidadeBadge?: string;
    /** Timestamp/data formatada da execução (alias EN: timestampLabel) */
    timestampLabel?: string;
    dataExecucao?: string;
    /** Informações do runner e resolução no topo do navegador (alias EN: runnerInfo) */
    runnerInfo?: {
        version?: string;
        resolution?: string;
        url?: string;
    };
    /** URL exibida na barra de endereço simulada do navegador */
    urlGravada?: string;
    /** Identificador do runner Playwright */
    runnerVersao?: string;
    /** Resolução da viewport gravada (ex: "1280x720" ou "1920x1080") */
    resolucao?: string;
    /** Lista de marcadores de eventos/interações na timeline (alias EN: events) */
    events?: MarcadorEventoSessao[];
    marcadores?: MarcadorEventoSessao[];
    /** Callback disparado ao selecionar um marcador ou buscar um ponto na timeline */
    onSeek?: (novoTempoSegundos: number) => void;
};

const OPCOES_VELOCIDADE: VelocidadeReproducao[] = [0.5, 1, 1.5, 2];

export const MARCADORES_SESSAO_PADRAO: MarcadorEventoSessao[] = [
    {
        id: "m1",
        timestamp: 1.0,
        tempoLabel: "0:01",
        rotulo: "Navegação",
        detalheAcao: "page.goto('/checkout/pagamento-seguro') [00:01.00]",
        resumoContextual: "Carregamento inicial da rota segura de checkout",
    },
    {
        id: "m2",
        timestamp: 2.0,
        tempoLabel: "0:02",
        rotulo: "Formulário",
        detalheAcao: "select#installments -> '6x de R$ 35,00' [00:02.04]",
        resumoContextual: "Preenchimento de método de pagamento em 6x sem juros",
    },
    {
        id: "m3",
        timestamp: 3.2,
        tempoLabel: "0:03",
        rotulo: "Clique",
        detalheAcao: "click#btn-submit-payment [00:03.18]",
        resumoContextual: "Submissão do pedido e validação de debounce no DOM",
    },
    {
        id: "m4",
        timestamp: 4.4,
        tempoLabel: "0:04",
        rotulo: "Confirmação",
        detalheAcao: "expect(modal#order-success).toBeVisible() [00:04.40]",
        resumoContextual: "Confirmação HTTP 200 e exibição do recibo #9841",
    },
];

/**
 * Formata segundos numéricos para o padrão de telemetria MM:SS.d (ex: 00:03.2)
 */
const formatarTempoTelemetria = (segundos: number): string => {
    if (!Number.isFinite(segundos) || segundos < 0) {
        return "00:00.0";
    }

    const minutos = Math.floor(segundos / 60);
    const restoSegundos = segundos % 60;
    const segundosInteiros = Math.floor(restoSegundos);
    const decimos = Math.floor((restoSegundos - segundosInteiros) * 10);

    const minStr = String(minutos).padStart(2, "0");
    const segStr = String(segundosInteiros).padStart(2, "0");

    return `${minStr}:${segStr}.${decimos}`;
};

/**
 * Formata segundos numéricos para rótulo curto M:SS (ex: 0:03)
 */
const formatarTempoCurto = (segundos: number): string => {
    if (!Number.isFinite(segundos) || segundos < 0) {
        return "0:00";
    }
    const minutos = Math.floor(segundos / 60);
    const segs = Math.floor(segundos % 60);
    return `${minutos}:${String(segs).padStart(2, "0")}`;
};

export default function VideoSessionPlayer({
    src,
    poster,
    sessionTitle,
    tituloSessao = "Gravação Contínua da Sessão Web",
    timestampLabel,
    dataExecucao = "17 de Outubro 2018, 09 : 41 BRT",
    runnerInfo,
    resolucao = "1280x720",
    events,
    marcadores = MARCADORES_SESSAO_PADRAO,
    onSeek,
}: VideoSessionPlayerProps) {
    const srcNormalizado = src?.trim() || "";
    const possuiSrcValido = srcNormalizado.length > 0;

    const tituloFinal = sessionTitle ?? tituloSessao;
    const dataFinal = timestampLabel ?? dataExecucao;
    const resolucaoProp = runnerInfo?.resolution ?? resolucao;
    const listaMarcadores = events ?? marcadores;

    const videoRef = useRef<HTMLVideoElement | null>(null);
    const viewportRef = useRef<HTMLDivElement | null>(null);
    const trilhaRef = useRef<HTMLDivElement | null>(null);

    const [estaReproduzindo, setEstaReproduzindo] = useState(false);
    const [arrastandoScrubber, setArrastandoScrubber] = useState(false);
    const [emTelaCheia, setEmTelaCheia] = useState(false);
    const [velocidade, setVelocidade] = useState<VelocidadeReproducao>(1);
    const [silenciado, setSilenciado] = useState(false);
    const [videoCarregado, setVideoCarregado] = useState(false);
    const [erroVideo, setErroVideo] = useState(false);
    const [resolucaoDetectada, setResolucaoDetectada] = useState<string | null>(
        null
    );
    const [marcadorEmHover, setMarcadorEmHover] =
        useState<MarcadorEventoSessao | null>(null);

    const [tempoAtual, setTempoAtual] = useState<number>(0);
    const [duracaoTotal, setDuracaoTotal] = useState<number>(0);
    const [srcAnterior, setSrcAnterior] = useState<string>(srcNormalizado);

    // Reseta estados de mídia caso a prop src seja alterada
    if (srcNormalizado !== srcAnterior) {
        setSrcAnterior(srcNormalizado);
        setErroVideo(false);
        setVideoCarregado(false);
        setEstaReproduzindo(false);
        setResolucaoDetectada(null);
        setTempoAtual(0);
        setDuracaoTotal(0);
    }

    const videoNaoEncontrado = !possuiSrcValido || erroVideo;
    const controlesDesabilitados = videoNaoEncontrado || !videoCarregado;

    const resolucaoExibida =
        !videoNaoEncontrado && resolucaoDetectada
            ? resolucaoDetectada
            : resolucaoProp;

    // Sincroniza o estado visual quando o usuário entra ou sai do modo Fullscreen (inclusive via tecla ESC)
    useEffect(() => {
        const handleFullscreenChange = () => {
            const elementoFullscreen = document.fullscreenElement;
            setEmTelaCheia(
                Boolean(
                    elementoFullscreen &&
                    viewportRef.current &&
                    elementoFullscreen === viewportRef.current
                )
            );
        };

        document.addEventListener("fullscreenchange", handleFullscreenChange);
        return () => {
            document.removeEventListener(
                "fullscreenchange",
                handleFullscreenChange
            );
        };
    }, []);

    // Define um novo currentTime no elemento HTML5 <video> quando o vídeo está carregado e válido
    const irParaTempo = useCallback(
        (segundosAlvo: number) => {
            if (controlesDesabilitados || duracaoTotal <= 0) return;

            const tempoSeguro = Math.max(
                0,
                Math.min(duracaoTotal, segundosAlvo)
            );

            if (videoRef.current) {
                videoRef.current.currentTime = tempoSeguro;
            }

            setTempoAtual(tempoSeguro);
            onSeek?.(tempoSeguro);
        },
        [controlesDesabilitados, duracaoTotal, onSeek]
    );

    // Calcula o tempo proporcional com base na posição horizontal (clientX) na trilha do scrubber
    const atualizarTempoPorClientX = useCallback(
        (clientX: number) => {
            if (controlesDesabilitados) return;

            const trilhaEl = trilhaRef.current;
            if (!trilhaEl || duracaoTotal <= 0) return;

            const rect = trilhaEl.getBoundingClientRect();
            if (rect.width <= 0) return;

            const proporcao = Math.max(
                0,
                Math.min(1, (clientX - rect.left) / rect.width)
            );
            irParaTempo(proporcao * duracaoTotal);
        },
        [controlesDesabilitados, duracaoTotal, irParaTempo]
    );

    // Suporte a arraste contínuo (scrubbing) com mouse na barra de progresso
    useEffect(() => {
        if (!arrastandoScrubber) return;

        const handleMouseMove = (e: MouseEvent) => {
            atualizarTempoPorClientX(e.clientX);
        };

        const handleMouseUp = () => {
            setArrastandoScrubber(false);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [arrastandoScrubber, atualizarTempoPorClientX]);

    // Alterna Play / Pause controlando o elemento HTML5 <video> via useRef
    const alternarReproducao = async () => {
        if (controlesDesabilitados) return;

        const videoEl = videoRef.current;
        if (!videoEl) return;

        try {
            if (videoEl.paused || videoEl.ended) {
                if (videoEl.ended) {
                    videoEl.currentTime = 0;
                }
                await videoEl.play();
                setEstaReproduzindo(true);
            } else {
                videoEl.pause();
                setEstaReproduzindo(false);
            }
        } catch {
            setErroVideo(true);
            setVideoCarregado(false);
            setEstaReproduzindo(false);
        }
    };

    // Permite tentar recarregar a mídia caso haja um src informado mas tenha ocorrido erro de rede/carregamento
    const tentarCarregarNovamente = () => {
        if (!possuiSrcValido) return;

        setErroVideo(false);
        setVideoCarregado(false);
        setEstaReproduzindo(false);
        setTempoAtual(0);

        if (videoRef.current) {
            videoRef.current.load();
        }
    };

    // Altera a velocidade de reprodução (playbackRate) no elemento <video>
    const alterarVelocidade = (novaVelocidade: VelocidadeReproducao) => {
        setVelocidade(novaVelocidade);

        if (videoRef.current) {
            videoRef.current.playbackRate = novaVelocidade;
        }
    };

    // Retrocede ou avança o tempo da sessão
    const deslocarTempo = (deltaSegundos: number) => {
        irParaTempo(tempoAtual + deltaSegundos);
    };

    // Alterna estado de áudio mudo no elemento <video>
    const alternarMudo = () => {
        if (controlesDesabilitados) return;

        setSilenciado((prev) => {
            const novoEstado = !prev;
            if (videoRef.current) {
                videoRef.current.muted = novoEstado;
            }
            return novoEstado;
        });
    };

    // Alterna tela cheia no container que engloba o <video> e os controles
    const alternarTelaCheia = () => {
        const containerEl = viewportRef.current;
        if (!containerEl) return;

        if (!document.fullscreenElement) {
            containerEl.requestFullscreen?.().catch(() => undefined);
        } else {
            document.exitFullscreen?.().catch(() => undefined);
        }
    };

    // Handlers nativos do elemento <video> (compatível com 1280x720 e 1920x1080)
    const handleLoadedMetadata = () => {
        const videoEl = videoRef.current;
        if (!videoEl) return;

        if (Number.isFinite(videoEl.duration) && videoEl.duration > 0) {
            setDuracaoTotal(videoEl.duration);
        }
        if (videoEl.videoWidth > 0 && videoEl.videoHeight > 0) {
            setResolucaoDetectada(
                `${videoEl.videoWidth}x${videoEl.videoHeight}`
            );
        }
        videoEl.playbackRate = velocidade;
        videoEl.muted = silenciado;
        setVideoCarregado(true);
        setErroVideo(false);
    };

    const handleTimeUpdate = () => {
        const videoEl = videoRef.current;
        if (!videoEl || arrastandoScrubber) return;

        setTempoAtual(videoEl.currentTime);
    };

    const handleVideoEnded = () => {
        setEstaReproduzindo(false);
    };

    const handleVideoError = () => {
        setErroVideo(true);
        setVideoCarregado(false);
        setEstaReproduzindo(false);
    };

    // Eventos de clique, arraste e teclado no Scrubber
    const handleScrubberMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (controlesDesabilitados) return;
        e.preventDefault();
        setArrastandoScrubber(true);
        atualizarTempoPorClientX(e.clientX);
    };

    const handleScrubberKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (controlesDesabilitados) return;

        if (e.key === "ArrowRight") {
            e.preventDefault();
            deslocarTempo(0.2);
        } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            deslocarTempo(-0.2);
        } else if (e.key === "Home") {
            e.preventDefault();
            irParaTempo(0);
        } else if (e.key === "End") {
            e.preventDefault();
            irParaTempo(duracaoTotal);
        }
    };

    // Determina qual marcador corresponde ao currentTime atual (apenas quando o vídeo está carregado)
    const marcadorAtivo = !controlesDesabilitados
        ? listaMarcadores.reduce<MarcadorEventoSessao | null>(
            (maisProximo, item) => {
                if (tempoAtual + 0.15 >= item.timestamp) {
                    if (
                        !maisProximo ||
                        item.timestamp >= maisProximo.timestamp
                    ) {
                        return item;
                    }
                }
                return maisProximo;
            },
            listaMarcadores[0] ?? null
        )
        : null;

    // O evento em destaque prioriza o marcador sob hover (preview contextual) ou o evento ativo do currentTime
    const eventoContextual =
        marcadorEmHover ?? (!videoNaoEncontrado ? marcadorAtivo : null);

    const percentualProgresso =
        !controlesDesabilitados && duracaoTotal > 0
            ? Math.min(100, Math.max(0, (tempoAtual / duracaoTotal) * 100))
            : 0;

    const tempoAtualFormatado = formatarTempoTelemetria(
        controlesDesabilitados ? 0 : tempoAtual
    );
    const duracaoTotalFormatada = formatarTempoTelemetria(
        controlesDesabilitados ? 0 : duracaoTotal
    );

    return (
        <section
            className={styles.cardPlayer}
            aria-label="Reprodutor de Sessão de Vídeo e Telemetria"
        >
            {/* 1. Cabeçalho Superior de Metadados da Sessão */}
            <header className={styles.topoPlayer}>
                <div className={styles.infoSessaoEsquerda}>
                    <span
                        className={`${styles.pontoGravacao} ${estaReproduzindo ? styles.pontoGravacaoAtivo : ""
                            } ${videoNaoEncontrado
                                ? styles.pontoGravacaoInativo
                                : ""
                            }`}
                        aria-hidden="true"
                    />
                    <span className={styles.tituloSessao}>
                        {tituloFinal} ({duracaoTotalFormatada})
                    </span>
                </div>

                <div className={styles.infoDataDireita}>
                    <Calendar
                        size={15}
                        className={styles.iconeCalendario}
                        aria-hidden="true"
                    />
                    <span>{dataFinal}</span>
                </div>
            </header>

            {/* 2. Container Principal (Engloba Navegador, <video> 16:9 e Controles) */}
            <div
                ref={viewportRef}
                className={`${styles.molduraViewport} ${emTelaCheia ? styles.molduraViewportFullscreen : ""
                    }`}
            >
                {/* Barra de Navegador Playwright */}
                <div className={styles.barraNavegador}>
                    <div className={styles.controlesJanela}>
                        <span
                            className={`${styles.bolinhaJanela} ${styles.bolinhaVermelha}`}
                        />
                        <span
                            className={`${styles.bolinhaJanela} ${styles.bolinhaAmarela}`}
                        />
                        <span
                            className={`${styles.bolinhaJanela} ${styles.bolinhaVerde}`}
                        />
                    </div>
                </div>

                {/* Palco 16:9 (1280x720) com Estado Dedicado de "Vídeo não encontrado" */}
                <div
                    className={`${styles.palcoVideoWrapper} ${videoNaoEncontrado
                        ? styles.palcoVideoWrapperIndisponivel
                        : ""
                        }`}
                    onClick={
                        !controlesDesabilitados ? alternarReproducao : undefined
                    }
                    role="presentation"
                >
                    {possuiSrcValido && (
                        <video
                            ref={videoRef}
                            className={`${styles.elementoVideo} ${videoNaoEncontrado
                                ? styles.elementoVideoOculto
                                : ""
                                }`}
                            src={srcNormalizado}
                            poster={poster}
                            width={1280}
                            height={720}
                            playsInline
                            preload="metadata"
                            controls={false}
                            onLoadedMetadata={handleLoadedMetadata}
                            onTimeUpdate={handleTimeUpdate}
                            onPlay={() => setEstaReproduzindo(true)}
                            onPause={() => setEstaReproduzindo(false)}
                            onEnded={handleVideoEnded}
                            onError={handleVideoError}
                        />
                    )}

                    {/* Pill Contextual Discreta Contida no Viewport */}
                    {eventoContextual && (
                        <div
                            className={`${styles.hudEventoContextual} ${marcadorEmHover
                                ? styles.hudEventoContextualPreview
                                : ""
                                }`}
                            aria-live="polite"
                        >
                            <Activity
                                size={13}
                                className={styles.iconeHudEvento}
                                aria-hidden="true"
                            />
                            <span className={styles.tempoHudEvento}>
                                {eventoContextual.tempoLabel ??
                                    formatarTempoCurto(
                                        eventoContextual.timestamp
                                    )}
                            </span>
                            <strong className={styles.rotuloHudEvento}>
                                {eventoContextual.rotulo}
                            </strong>
                            {eventoContextual.resumoContextual && (
                                <>
                                    <span
                                        className={styles.separadorHudEvento}
                                        aria-hidden="true"
                                    >
                                        •
                                    </span>
                                    <span className={styles.resumoHudEvento}>
                                        {eventoContextual.resumoContextual}
                                    </span>
                                </>
                            )}
                        </div>
                    )}

                    {/* Estado Dedicado: Vídeo não encontrado */}
                    {videoNaoEncontrado && (
                        <div
                            className={styles.estadoVideoNaoEncontrado}
                            role="status"
                            aria-live="polite"
                        >
                            <div
                                className={styles.iconeNaoEncontradoWrapper}
                                aria-hidden="true"
                            >
                                <VideoOff size={24} />
                            </div>

                            <h3 className={styles.tituloNaoEncontrado}>
                                Vídeo não encontrado
                            </h3>

                            <p className={styles.descricaoNaoEncontrado}>
                                {possuiSrcValido
                                    ? "Não foi possível carregar o arquivo de gravação desta sessão. Verifique se o recurso de mídia está disponível no servidor."
                                    : "Nenhuma gravação de vídeo (.mp4) foi vinculada a esta execução de teste."}
                            </p>

                            {possuiSrcValido && (
                                <button
                                    type="button"
                                    className={styles.btnTentarNovamente}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        tentarCarregarNovamente();
                                    }}
                                >
                                    <RefreshCw size={14} aria-hidden="true" />
                                    <span>Tentar novamente</span>
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {/* 3. Barra Inferior de Controles, Scrubber e Marcadores */}
                <div className={styles.painelControles}>
                    <div className={styles.timelineContainer}>
                        {/* Scrubber Customizado */}
                        <div
                            ref={trilhaRef}
                            className={`${styles.areaCliqueScrubber} ${controlesDesabilitados
                                ? styles.areaCliqueScrubberDesabilitada
                                : ""
                                }`}
                            role="slider"
                            tabIndex={controlesDesabilitados ? -1 : 0}
                            aria-disabled={controlesDesabilitados}
                            aria-label="Linha do tempo da sessão de vídeo"
                            aria-valuemin={0}
                            aria-valuemax={Number(duracaoTotal.toFixed(1))}
                            aria-valuenow={Number(tempoAtual.toFixed(1))}
                            aria-valuetext={`${tempoAtualFormatado} de ${duracaoTotalFormatada}`}
                            onMouseDown={handleScrubberMouseDown}
                            onKeyDown={handleScrubberKeyDown}
                        >
                            <div className={styles.trilhaProgresso}>
                                <div
                                    className={styles.preenchimentoProgresso}
                                    style={{ width: `${percentualProgresso}%` }}
                                >
                                    {!controlesDesabilitados && (
                                        <span
                                            className={styles.cursorTimeline}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Controles Principais: Play/Pause, Tempo, PlaybackRate e Fullscreen */}
                    <div className={styles.barraBotoesInferior}>
                        <div className={styles.controlesEsquerda}>
                            <button
                                type="button"
                                disabled={controlesDesabilitados}
                                className={styles.btnPlayPrincipal}
                                onClick={alternarReproducao}
                                aria-label={
                                    estaReproduzindo
                                        ? "Pausar vídeo"
                                        : "Reproduzir vídeo"
                                }
                                title={
                                    controlesDesabilitados
                                        ? "Vídeo indisponível"
                                        : estaReproduzindo
                                            ? "Pausar (Play/Pause)"
                                            : "Reproduzir (Play/Pause)"
                                }
                            >
                                {estaReproduzindo ? (
                                    <Pause size={14} />
                                ) : (
                                    <Play size={13} fill="currentColor" />
                                )}
                            </button>

                            <button
                                type="button"
                                disabled={controlesDesabilitados}
                                className={styles.btnControleIcone}
                                onClick={() => deslocarTempo(-1)}
                                aria-label="Retroceder 1 segundo"
                                title="Retroceder 1s"
                            >
                                <RotateCcw size={14} />
                            </button>

                            <button
                                type="button"
                                disabled={controlesDesabilitados}
                                className={styles.btnControleIcone}
                                onClick={() => deslocarTempo(1)}
                                aria-label="Avançar 1 segundo"
                                title="Avançar 1s"
                            >
                                <RotateCw size={14} />
                            </button>

                            <div
                                className={styles.visorTempo}
                                aria-live="polite"
                            >
                                <strong className={styles.tempoAtual}>
                                    {tempoAtualFormatado}
                                </strong>
                                <span className={styles.tempoSeparador}>/</span>
                                <span className={styles.tempoTotal}>
                                    {duracaoTotalFormatada}
                                </span>
                            </div>
                        </div>

                        <div className={styles.controlesDireita}>
                            {/* Seletor de Velocidade (playbackRate) */}
                            <div
                                className={styles.seletorVelocidade}
                                role="group"
                                aria-label="Velocidade de reprodução"
                            >
                                {OPCOES_VELOCIDADE.map((opcao) => (
                                    <button
                                        key={opcao}
                                        type="button"
                                        disabled={controlesDesabilitados}
                                        aria-pressed={velocidade === opcao}
                                        className={`${styles.btnVelocidade} ${velocidade === opcao
                                            ? styles.btnVelocidadeAtiva
                                            : ""
                                            }`}
                                        onClick={() => alterarVelocidade(opcao)}
                                    >
                                        {opcao}x
                                    </button>
                                ))}
                            </div>

                            <button
                                type="button"
                                disabled={controlesDesabilitados}
                                className={styles.btnControleIcone}
                                onClick={alternarMudo}
                                aria-label={
                                    silenciado
                                        ? "Ativar áudio"
                                        : "Silenciar áudio"
                                }
                                title={silenciado ? "Ativar áudio" : "Silenciar"}
                            >
                                {silenciado ? (
                                    <VolumeX size={14} />
                                ) : (
                                    <Volume2 size={14} />
                                )}
                            </button>

                            <button
                                type="button"
                                disabled={controlesDesabilitados}
                                className={styles.btnControleIcone}
                                aria-label="Modo quadro"
                                title="Modo quadro"
                            >
                                <Square size={13} />
                            </button>

                            <button
                                type="button"
                                className={`${styles.btnControleIcone} ${emTelaCheia
                                    ? styles.btnControleIconeAtivo
                                    : ""
                                    }`}
                                onClick={alternarTelaCheia}
                                aria-label={
                                    emTelaCheia
                                        ? "Sair da tela cheia"
                                        : "Expandir para tela cheia"
                                }
                                title={
                                    emTelaCheia
                                        ? "Sair da tela cheia (ESC)"
                                        : "Tela cheia"
                                }
                            >
                                {emTelaCheia ? (
                                    <Minimize2 size={14} />
                                ) : (
                                    <Maximize2 size={14} />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
