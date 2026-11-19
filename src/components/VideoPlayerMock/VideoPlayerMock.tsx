import React from "react";
import {
    Calendar,
    CheckCircle2,
    Lock,
    Maximize2,
    Pause,
    RotateCcw,
    RotateCw,
    ShoppingBag,
    Square,
    Volume2,
} from "lucide-react";
import styles from "./VideoPlayerMock.module.css";

export type VideoPlayerMockProps = {
    tituloSessao?: string;
    qualidadeBadge?: string;
    dataExecucao?: string;
    urlGravada?: string;
    runnerVersao?: string;
    resolucao?: string;
    tempoAtual?: string;
    tempoTotal?: string;
};

const MARCADORES_TIMELINE = [
    { id: "m1", tempo: "0:01", rotulo: "Navegação", ativo: false },
    { id: "m2", tempo: "0:02", rotulo: "Formulário", ativo: false },
    { id: "m3", tempo: "0:03", rotulo: "Clique", ativo: true },
    { id: "m4", tempo: "0:04", rotulo: "Confirmação", ativo: false },
];

const VELOCIDADES = ["0.5x", "1x", "1.5x", "2x"];

export default function VideoPlayerMock({
    tituloSessao = "Gravação Contínua da Sessão Web (00:04.8)",
    qualidadeBadge = "HD • 60FPS",
    dataExecucao = "17 de Outubro 2018, 09 : 41 BRT",
    urlGravada = "https://app.empresa.com.br/checkout/pagamento-seguro",
    runnerVersao = "PLAYWRIGHT_RUNNER_v1.42",
    resolucao = "1920x1080",
    tempoAtual = "00:03.2",
    tempoTotal = "00:04.8",
}: VideoPlayerMockProps) {
    return (
        <section
            className={styles.cardPlayer}
            aria-label="Visualização de Vídeo e Player de Telemetria"
        >
            {/* 1. Barra Superior de Metadados da Gravação */}
            <header className={styles.topoPlayer}>
                <div className={styles.infoSessaoEsquerda}>
                    <span className={styles.pontoGravacao} aria-hidden="true" />
                    <span className={styles.tituloSessao}>{tituloSessao}</span>
                    <span className={styles.badgeQualidade}>
                        {qualidadeBadge}
                    </span>
                </div>

                <div className={styles.infoDataDireita}>
                    <Calendar
                        size={15}
                        className={styles.iconeCalendario}
                        aria-hidden="true"
                    />
                    <span>{dataExecucao}</span>
                </div>
            </header>

            {/* 2. Moldura do Player / Viewport Playwright */}
            <div className={styles.molduraViewport}>
                {/* Barra de Navegador Simulada */}
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

                    <div className={styles.barraEndereco}>
                        <Lock
                            size={11}
                            className={styles.iconeCadeado}
                            aria-hidden="true"
                        />
                        <span className={styles.textoUrl}>{urlGravada}</span>
                    </div>

                    <div className={styles.infoRunner}>
                        <span className={styles.pontoRunner} />
                        <span className={styles.textoRunner}>
                            {runnerVersao}
                        </span>
                        <span className={styles.textoResolucao}>
                            {resolucao}
                        </span>
                    </div>
                </div>

                {/* Palco Visual da Gravação E2E */}
                <div className={styles.palcoGravacao}>
                    {/* Camada de Fundo (Checkout Simulado) */}
                    <div className={styles.checkoutFundo} aria-hidden="true">
                        <div className={styles.checkoutTopoFundo}>
                            <div className={styles.marcaCheckoutFundo}>
                                <ShoppingBag
                                    size={15}
                                    className={styles.iconeSacola}
                                />
                                <span>Checkout Seguro Enterprise</span>
                            </div>
                            <span className={styles.pedidoFundo}>
                                Pedido #98-9841
                            </span>
                        </div>

                        <div className={styles.skeletonGridFundo}>
                            <div className={styles.skeletonBloco} />
                            <div className={styles.skeletonBloco} />
                        </div>
                    </div>

                    {/* Modal Central de Confirmação Capturado pelo Teste */}
                    <div className={styles.modalCapturado}>
                        <div className={styles.iconeSucessoWrapper}>
                            <CheckCircle2 size={22} />
                        </div>

                        <h3 className={styles.tituloModal}>
                            Pedido Aprovado com Sucesso!
                        </h3>

                        <p className={styles.descricaoModal}>
                            Transação autorizada pelo gateway em 410ms. ID:
                        </p>

                        <span className={styles.badgeTransacao}>
                            tx_live_984174a
                        </span>

                        <div className={styles.botoesModal}>
                            <button
                                type="button"
                                className={styles.btnModalSecundario}
                                tabIndex={-1}
                            >
                                Ver Recibo
                            </button>

                            <div className={styles.wrapperBotaoInspecionado}>
                                <button
                                    type="button"
                                    className={styles.btnModalPrimario}
                                    tabIndex={-1}
                                >
                                    Acompanhar
                                </button>

                                {/* Tooltip de Telemetria Playwright */}
                                <div className={styles.tooltipTelemetria}>
                                    <span className={styles.pontoTooltip} />
                                    <span>
                                        click#btn-submit-payment [00:03.18]
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. Barra Inferior de Controles e Timeline do Player */}
                <div className={styles.painelControles}>
                    {/* Barra de Progresso */}
                    <div className={styles.timelineContainer}>
                        <div className={styles.trilhaProgresso}>
                            <div
                                className={styles.preenchimentoProgresso}
                                style={{ width: "66%" }}
                            >
                                <span className={styles.cursorTimeline} />
                            </div>
                        </div>

                        {/* Marcadores de Eventos da Sessão */}
                        <div className={styles.marcadoresLista}>
                            {MARCADORES_TIMELINE.map((item) => (
                                <span
                                    key={item.id}
                                    className={`${styles.marcadorItem} ${
                                        item.ativo
                                            ? styles.marcadorItemAtivo
                                            : ""
                                    }`}
                                >
                                    {item.tempo} {item.rotulo}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Linha de Botões de Reprodução e Velocidade */}
                    <div className={styles.barraBotoesInferior}>
                        <div className={styles.controlesEsquerda}>
                            <button
                                type="button"
                                className={styles.btnPlayPrincipal}
                                aria-label="Pausar reprodução"
                            >
                                <Pause size={14} />
                            </button>

                            <button
                                type="button"
                                className={styles.btnControleIcone}
                                aria-label="Retroceder passo"
                            >
                                <RotateCcw size={14} />
                            </button>

                            <button
                                type="button"
                                className={styles.btnControleIcone}
                                aria-label="Avançar passo"
                            >
                                <RotateCw size={14} />
                            </button>

                            <div className={styles.visorTempo}>
                                <strong className={styles.tempoAtual}>
                                    {tempoAtual}
                                </strong>
                                <span className={styles.tempoSeparador}>/</span>
                                <span className={styles.tempoTotal}>
                                    {tempoTotal}
                                </span>
                            </div>
                        </div>

                        <div className={styles.controlesDireita}>
                            <div
                                className={styles.seletorVelocidade}
                                role="group"
                                aria-label="Velocidade de reprodução"
                            >
                                {VELOCIDADES.map((vel) => (
                                    <button
                                        key={vel}
                                        type="button"
                                        className={`${styles.btnVelocidade} ${
                                            vel === "1x"
                                                ? styles.btnVelocidadeAtiva
                                                : ""
                                        }`}
                                    >
                                        {vel}
                                    </button>
                                ))}
                            </div>

                            <button
                                type="button"
                                className={styles.btnControleIcone}
                                aria-label="Volume"
                            >
                                <Volume2 size={14} />
                            </button>

                            <button
                                type="button"
                                className={styles.btnControleIcone}
                                aria-label="Modo miniatura"
                            >
                                <Square size={13} />
                            </button>

                            <button
                                type="button"
                                className={styles.btnControleIcone}
                                aria-label="Tela cheia"
                            >
                                <Maximize2 size={14} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

