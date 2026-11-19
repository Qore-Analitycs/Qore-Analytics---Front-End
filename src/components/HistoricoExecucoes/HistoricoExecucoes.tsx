import React from "react";
import {
    Area,
    AreaChart,
    CartesianGrid,
    ReferenceLine,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import styles from "./HistoricoExecucoes.module.css";

export type PontoHistoricoExecucao = {
    horario: string;
    sucesso: number;
    falhas: number;
    latenciaMs: number;
    destaquePico?: boolean;
};

export type HistoricoExecucoesProps = {
    dados?: PontoHistoricoExecucao[];
    totalSucesso?: string;
    totalFalhas?: string;
    capacidadeMaxima?: string;
    taxaDescarte?: string;
    nivelReferenciaLatencia?: number;
};

const DADOS_PADRAO: PontoHistoricoExecucao[] = [
    { horario: "00:00", sucesso: 920, falhas: 18, latenciaMs: 112 },
    { horario: "04:00", sucesso: 680, falhas: 12, latenciaMs: 95 },
    { horario: "08:00", sucesso: 2150, falhas: 34, latenciaMs: 168 },
    { horario: "12:00", sucesso: 2980, falhas: 52, latenciaMs: 210 },
    {
        horario: "16:00",
        sucesso: 3890,
        falhas: 96,
        latenciaMs: 342,
        destaquePico: true,
    },
    { horario: "20:00", sucesso: 2640, falhas: 44, latenciaMs: 185 },
    { horario: "23:59", sucesso: 1420, falhas: 26, latenciaMs: 134 },
];

const TICKS_EIXO_Y = [0, 1000, 2500, 4000];

const formatarTickY = (valor: number) => {
    if (valor === 0) return "0";
    return `${(valor / 1000).toFixed(1)}k`;
};

type DotProps = {
    cx?: number;
    cy?: number;
    payload?: PontoHistoricoExecucao;
    cor: string;
};

const PontoDestaquePico = ({ cx, cy, payload, cor }: DotProps) => {
    if (cx === undefined || cy === undefined) return null;

    if (payload?.destaquePico) {
        return (
            <g>
                <circle
                    cx={cx}
                    cy={cy}
                    r={8}
                    fill={cor}
                    fillOpacity={0.22}
                />
                <circle
                    cx={cx}
                    cy={cy}
                    r={4.5}
                    fill="#FFFFFF"
                    stroke={cor}
                    strokeWidth={2.5}
                />
            </g>
        );
    }

    return <circle cx={cx} cy={cy} r={3} fill={cor} stroke="#FFFFFF" strokeWidth={1.5} />;
};

type CustomTooltipProps = {
    active?: boolean;
    payload?: Array<{
        payload: PontoHistoricoExecucao;
    }>;
    label?: string;
};

const TooltipCustomizado = ({ active, payload, label }: CustomTooltipProps) => {
    if (!active || !payload || payload.length === 0) return null;

    const ponto = payload[0].payload;

    return (
        <div className={styles.tooltipCard}>
            <span className={styles.tooltipHorario}>Horário: {label}</span>
            <div className={styles.tooltipLinha}>
                <span className={styles.tooltipRotulo}>
                    <span
                        className={`${styles.pontoIndicador} ${styles.pontoLaranja}`}
                    />
                    Bem-Sucedidas:
                </span>
                <span className={styles.tooltipValor}>
                    {ponto.sucesso.toLocaleString("pt-BR")}
                </span>
            </div>
            <div className={styles.tooltipLinha}>
                <span className={styles.tooltipRotulo}>
                    <span
                        className={`${styles.pontoIndicador} ${styles.pontoVermelho}`}
                    />
                    Falhas / Timeouts:
                </span>
                <span className={styles.tooltipValor}>
                    {ponto.falhas.toLocaleString("pt-BR")}
                </span>
            </div>
            <div className={styles.tooltipLinha}>
                <span className={styles.tooltipRotulo}>Latência p90:</span>
                <span className={styles.tooltipValor}>{ponto.latenciaMs} ms</span>
            </div>
        </div>
    );
};

export default function HistoricoExecucoes({
    dados = DADOS_PADRAO,
    totalSucesso = "48.638",
    totalFalhas = "282",
    capacidadeMaxima = "4.820 req/min",
    taxaDescarte = "0.001%",
    nivelReferenciaLatencia = 2500,
}: HistoricoExecucoesProps) {
    return (
        <Card className={styles.cardContainer}>
            <CardHeader className={styles.cabecalho}>
                <div className={styles.titulosWrapper}>
                    <CardTitle className={styles.titulo}>
                        Histórico de Execuções e Latência
                    </CardTitle>
                    <CardDescription className={styles.subtitulo}>
                        Volume horário de requisições ponderado contra picos de
                        latência (ms)
                    </CardDescription>
                </div>

                <div className={styles.barraLegenda}>
                    <div className={styles.indicadoresEsquerda}>
                        <div className={styles.itemLegenda}>
                            <span
                                className={`${styles.pontoIndicador} ${styles.pontoLaranja}`}
                                aria-hidden="true"
                            />
                            <span>
                                Execuções Bem-Sucedidas{" "}
                                <strong className={styles.valorDestaque}>
                                    ({totalSucesso})
                                </strong>
                            </span>
                        </div>

                        <div className={styles.itemLegenda}>
                            <span
                                className={`${styles.pontoIndicador} ${styles.pontoVermelho}`}
                                aria-hidden="true"
                            />
                            <span>
                                Falhas / Timeouts{" "}
                                <strong className={styles.valorDestaque}>
                                    ({totalFalhas})
                                </strong>
                            </span>
                        </div>
                    </div>

                    <div className={styles.referenciaDireita}>
                        <span
                            className={styles.linhaTracejadaIcone}
                            aria-hidden="true"
                        />
                        <span>Latência Média p90</span>
                    </div>
                </div>
            </CardHeader>

            <CardContent className={styles.conteudo}>
                <div className={styles.graficoWrapper}>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={dados}
                            margin={{ top: 14, right: 16, left: -12, bottom: 4 }}
                        >
                            <defs>
                                <linearGradient
                                    id="gradienteSucesso"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="5%"
                                        stopColor="#E87A11"
                                        stopOpacity={0.34}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="#E87A11"
                                        stopOpacity={0.02}
                                    />
                                </linearGradient>
                                <linearGradient
                                    id="gradienteFalhas"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="5%"
                                        stopColor="#DC2626"
                                        stopOpacity={0.28}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="#DC2626"
                                        stopOpacity={0.02}
                                    />
                                </linearGradient>
                            </defs>

                            <CartesianGrid
                                strokeDasharray="3 3"
                                vertical={false}
                                stroke="#E2E8F0"
                            />

                            <XAxis
                                dataKey="horario"
                                axisLine={{ stroke: "#CBD5E1" }}
                                tickLine={false}
                                tick={{
                                    fill: "#64748B",
                                    fontSize: 12,
                                    fontFamily: "Montserrat, sans-serif",
                                }}
                                dy={8}
                            />

                            <YAxis
                                domain={[0, 4000]}
                                ticks={TICKS_EIXO_Y}
                                tickFormatter={formatarTickY}
                                axisLine={false}
                                tickLine={false}
                                tick={{
                                    fill: "#64748B",
                                    fontSize: 12,
                                    fontFamily: "Montserrat, sans-serif",
                                }}
                            />

                            <Tooltip content={<TooltipCustomizado />} />

                            <ReferenceLine
                                y={nivelReferenciaLatencia}
                                stroke="#64748B"
                                strokeDasharray="5 5"
                                strokeWidth={1.5}
                            />

                            <Area
                                type="monotone"
                                dataKey="sucesso"
                                stroke="#E87A11"
                                strokeWidth={2.5}
                                fillOpacity={1}
                                fill="url(#gradienteSucesso)"
                                dot={(props) => (
                                    <PontoDestaquePico
                                        key={`dot-sucesso-${props.index}`}
                                        cx={props.cx}
                                        cy={props.cy}
                                        payload={props.payload}
                                        cor="#E87A11"
                                    />
                                )}
                                activeDot={{
                                    r: 6,
                                    stroke: "#FFFFFF",
                                    strokeWidth: 2,
                                    fill: "#E87A11",
                                }}
                            />

                            <Area
                                type="monotone"
                                dataKey="falhas"
                                stroke="#DC2626"
                                strokeWidth={2}
                                fillOpacity={1}
                                fill="url(#gradienteFalhas)"
                                dot={(props) => (
                                    <PontoDestaquePico
                                        key={`dot-falhas-${props.index}`}
                                        cx={props.cx}
                                        cy={props.cy}
                                        payload={props.payload}
                                        cor="#DC2626"
                                    />
                                )}
                                activeDot={{
                                    r: 5,
                                    stroke: "#FFFFFF",
                                    strokeWidth: 2,
                                    fill: "#DC2626",
                                }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                <footer className={styles.rodape}>
                    <span className={styles.textoRodape}>
                        Capacidade máxima aferida:{" "}
                        <strong className={styles.destaqueRodape}>
                            {capacidadeMaxima}
                        </strong>
                    </span>
                    <span className={styles.textoRodape}>
                        Taxa de descarte de pacotes (Packet Drop):{" "}
                        <strong className={styles.destaqueRodape}>
                            {taxaDescarte}
                        </strong>
                    </span>
                </footer>
            </CardContent>
        </Card>
    );
}

