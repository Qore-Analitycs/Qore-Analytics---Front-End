import React, { useState } from "react";
import { AlertTriangle, Check, Clock } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import styles from "./ExecucoesRecentes.module.css";

export type StatusExecucao = "aprovada" | "falhou" | "em_execucao";

export type FiltroExecucao = "todas" | "aprovadas" | "com_falha";

export type ItemExecucao = {
    id: string;
    suiteNome: string;
    suiteSubtitulo: string;
    status: StatusExecucao;
    statusLabel: string;
    testesPassaram: number;
    testesTotal: number;
    duracao: string;
    inicioRelativo: string;
};

export type ExecucoesRecentesProps = {
    execucoes?: ItemExecucao[];
    titulo?: string;
    subtitulo?: string;
    filtroInicial?: FiltroExecucao;
};

const EXECUCOES_PADRAO: ItemExecucao[] = [
    {
        id: "exec-1",
        suiteNome: "Autenticação e login",
        suiteSubtitulo: "Testes automatizados · build #1284",
        status: "aprovada",
        statusLabel: "Aprovada",
        testesPassaram: 48,
        testesTotal: 48,
        duracao: "1m 12s",
        inicioRelativo: "há 4 min",
    },
    {
        id: "exec-2",
        suiteNome: "Fluxo de checkout",
        suiteSubtitulo: "Testes E2E · build #1284",
        status: "falhou",
        statusLabel: "Falhou",
        testesPassaram: 36,
        testesTotal: 42,
        duracao: "3m 40s",
        inicioRelativo: "há 11 min",
    },
    {
        id: "exec-3",
        suiteNome: "Cadastro de clientes",
        suiteSubtitulo: "Testes automatizados · build #1283",
        status: "aprovada",
        statusLabel: "Aprovada",
        testesPassaram: 64,
        testesTotal: 64,
        duracao: "2m 05s",
        inicioRelativo: "há 26 min",
    },
    {
        id: "exec-4",
        suiteNome: "Relatórios mensais",
        suiteSubtitulo: "Regressão · build #1283",
        status: "em_execucao",
        statusLabel: "Em execução",
        testesPassaram: 18,
        testesTotal: 55,
        duracao: "0m 47s",
        inicioRelativo: "há 31 min",
    },
    {
        id: "exec-5",
        suiteNome: "Notificações por e-mail",
        suiteSubtitulo: "Testes por commit · build #1282",
        status: "aprovada",
        statusLabel: "Aprovada",
        testesPassaram: 27,
        testesTotal: 27,
        duracao: "0m 58s",
        inicioRelativo: "há 1 h",
    },
    {
        id: "exec-6",
        suiteNome: "Permissões de usuário",
        suiteSubtitulo: "Testes automatizados · build #1282",
        status: "falhou",
        statusLabel: "Falhou",
        testesPassaram: 51,
        testesTotal: 53,
        duracao: "1m 33s",
        inicioRelativo: "há 2 h",
    },
];

const MAPA_CLASSES_ICONE: Record<StatusExecucao, string> = {
    aprovada: styles.iconeAprovada,
    falhou: styles.iconeFalhou,
    em_execucao: styles.iconeEmExecucao,
};

const MAPA_CLASSES_BADGE: Record<StatusExecucao, string> = {
    aprovada: styles.badgeAprovada,
    falhou: styles.badgeFalhou,
    em_execucao: styles.badgeEmExecucao,
};

const renderIconeStatus = (status: StatusExecucao) => {
    switch (status) {
        case "aprovada":
            return <Check size={18} strokeWidth={2.5} />;
        case "falhou":
            return <AlertTriangle size={18} strokeWidth={2.2} />;
        case "em_execucao":
            return <Clock size={18} strokeWidth={2.2} />;
        default:
            return null;
    }
};

export default function ExecucoesRecentes({
    execucoes = EXECUCOES_PADRAO,
    titulo = "Execuções Recentes",
    subtitulo = "Últimas 6 execuções dos pipelines de teste (atualizado há 2 min)",
    filtroInicial = "todas",
}: ExecucoesRecentesProps) {
    const [filtroAtivo, setFiltroAtivo] =
        useState<FiltroExecucao>(filtroInicial);

    const execucoesFiltradas = execucoes.filter((item) => {
        if (filtroAtivo === "aprovadas") return item.status === "aprovada";
        if (filtroAtivo === "com_falha") return item.status === "falhou";
        return true;
    });

    return (
        <Card className={styles.cardContainer}>
            <CardHeader className={styles.cabecalho}>
                <div className={styles.titulosWrapper}>
                    <CardTitle className={styles.titulo}>{titulo}</CardTitle>
                    <CardDescription className={styles.subtitulo}>
                        {subtitulo}
                    </CardDescription>
                </div>

                <div
                    className={styles.abasFiltro}
                    role="tablist"
                    aria-label="Filtrar execuções de testes"
                >
                    <button
                        type="button"
                        role="tab"
                        aria-selected={filtroAtivo === "todas"}
                        className={`${styles.btnAba} ${filtroAtivo === "todas" ? styles.btnAbaAtiva : ""
                            }`}
                        onClick={() => setFiltroAtivo("todas")}
                    >
                        Todas
                    </button>
                    <button
                        type="button"
                        role="tab"
                        aria-selected={filtroAtivo === "aprovadas"}
                        className={`${styles.btnAba} ${filtroAtivo === "aprovadas" ? styles.btnAbaAtiva : ""
                            }`}
                        onClick={() => setFiltroAtivo("aprovadas")}
                    >
                        Aprovadas
                    </button>
                    <button
                        type="button"
                        role="tab"
                        aria-selected={filtroAtivo === "com_falha"}
                        className={`${styles.btnAba} ${filtroAtivo === "com_falha" ? styles.btnAbaAtiva : ""
                            }`}
                        onClick={() => setFiltroAtivo("com_falha")}
                    >
                        Com falha
                    </button>
                </div>
            </CardHeader>

            <CardContent className={styles.conteudo}>
                <div className={styles.tabelaWrapper}>
                    <div className={styles.gridCabecalho}>
                        <span>Suíte</span>
                        <span>Status</span>
                        <span>Testes</span>
                        <span>Duração</span>
                        <span>Início</span>
                    </div>

                    {execucoesFiltradas.length === 0 ? (
                        <div className={styles.estadoVazio}>
                            Nenhuma execução encontrada para o filtro selecionado.
                        </div>
                    ) : (
                        <ul className={styles.listaExecucoes}>
                            {execucoesFiltradas.map((item) => {
                                const classeIcone =
                                    MAPA_CLASSES_ICONE[item.status];
                                const classeBadge =
                                    MAPA_CLASSES_BADGE[item.status];

                                return (
                                    <li
                                        key={item.id}
                                        className={styles.linhaExecucao}
                                    >
                                        {/* 1. Suíte (Ícone + Título e Subtítulo) */}
                                        <div className={styles.celulaSuite}>
                                            <span
                                                className={`${styles.iconeSuiteWrapper} ${classeIcone}`}
                                                aria-hidden="true"
                                            >
                                                {renderIconeStatus(item.status)}
                                            </span>
                                            <div className={styles.infoSuite}>
                                                <h4 className={styles.nomeSuite}>
                                                    {item.suiteNome}
                                                </h4>
                                                <span
                                                    className={
                                                        styles.subtituloSuite
                                                    }
                                                >
                                                    {item.suiteSubtitulo}
                                                </span>
                                            </div>
                                        </div>

                                        {/* 2. Status Badge */}
                                        <div>
                                            <span
                                                className={`${styles.badgeStatus} ${classeBadge}`}
                                            >
                                                {item.statusLabel}
                                            </span>
                                        </div>

                                        {/* 3. Contagem de Testes */}
                                        <div className={styles.celulaTestes}>
                                            <strong
                                                className={
                                                    styles.testesPassaram
                                                }
                                            >
                                                {item.testesPassaram}
                                            </strong>
                                            <span
                                                className={styles.testesTotal}
                                            >
                                                {" "}
                                                / {item.testesTotal}
                                            </span>
                                        </div>

                                        {/* 4. Duração */}
                                        <div className={styles.celulaDuracao}>
                                            {item.duracao}
                                        </div>

                                        {/* 5. Início Relativo */}
                                        <div className={styles.celulaInicio}>
                                            {item.inicioRelativo}
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
