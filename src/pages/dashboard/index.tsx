import React, { useState } from "react";
import Head from "next/head";
import SideBar from "@/components/sideBar/sideBar";
import HistoricoExecucoes from "@/components/HistoricoExecucoes/HistoricoExecucoes";
import ExecucoesRecentes from "@/components/ExecucoesRecentes/ExecucoesRecentes";
import DistribuicaoTipo from "@/components/DistribuicaoTipo/DistribuicaoTipo";
import AmbientesMonitorados from "@/components/AmbientesMonitorados/AmbientesMonitorados";
import styles from "./dashboard.module.css";

export default function DashboardPage() {
    const [sidebarExpandida, setSidebarExpandida] = useState(false);

    return (
        <>
            <Head>
                <title>Painel de Monitoramento | Qore Analytics</title>
            </Head>

            <div
                className={`${styles.layoutShell} ${sidebarExpandida ? styles.layoutShellExpandido : ""
                    }`}
            >
                {/* 1. Barra Lateral Fixa */}
                <div className={styles.sidebarContainer}>
                    <SideBar
                        expandida={sidebarExpandida}
                        onExpandidaChange={setSidebarExpandida}
                    />
                </div>

                {/* Container Principal Rolável com Push Content */}
                <main className={styles.conteudoPrincipal}>
                    <div className={styles.container}>
                        {/* 2. Cabeçalho da Página */}
                        <header className={styles.cabecalhoPagina}>
                            <span className={styles.categoriaMenor}>
                                Dashboard
                            </span>
                            <h1 className={styles.tituloPrincipal}>
                                Painel de Monitoramento
                            </h1>
                            <p className={styles.descricaoPagina}>
                                Repositório unificado de auditoria, execuções
                                automatizadas (Web E2E &amp; APIs) e
                                rastreabilidade contínua de suítes de teste.
                            </p>
                        </header>

                        {/* 3. Grid Principal de Monitoramento (Histórico e Execuções à esquerda + Distribuição e Ambientes à direita) */}
                        <section
                            className={`${styles.gridMonitoramento} grid grid-cols-1 lg:grid-cols-3 gap-6 items-start`}
                            aria-label="Monitoramento em Tempo Real"
                        >
                            {/* Coluna Esquerda (2 colunas no grid: Histórico + Execuções Recentes) */}
                            <div
                                className={`${styles.colunaHistorico} lg:col-span-2 flex flex-col gap-6 w-full`}
                            >
                                <HistoricoExecucoes />
                                <ExecucoesRecentes />
                            </div>

                            {/* Coluna Direita (1 coluna no grid: Distribuição por Tipo + Ambientes Monitorados) */}
                            <div
                                className={`${styles.colunaDireita} lg:col-span-1 flex flex-col gap-6 w-full`}
                            >
                                <DistribuicaoTipo />
                                <AmbientesMonitorados />
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </>
    );
}

