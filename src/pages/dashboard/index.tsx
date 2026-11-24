import React from "react";
import Head from "next/head";
import AppLayout from "@/components/layout/AppLayout";
import CardsTestes from "@/components/card/card2";
import HistoricoExecucoes from "@/components/HistoricoExecucoes/HistoricoExecucoes";
import ExecucoesRecentes from "@/components/ExecucoesRecentes/ExecucoesRecentes";
import DistribuicaoTipo from "@/components/DistribuicaoTipo/DistribuicaoTipo";
import AmbientesMonitorados from "@/components/AmbientesMonitorados/AmbientesMonitorados";
import styles from "./dashboard.module.css";

export default function DashboardPage() {
    return (
        <>
            <Head>
                <title>Painel de Monitoramento | Qore Analytics</title>
            </Head>

            <AppLayout maxWidth="1520px">
                {/* 1. Cabeçalho da Página */}
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

                {/* 2. Grid Principal de Monitoramento (Coluna Esquerda 2/3 + Coluna Direita 1/3) */}
                <section
                    className={styles.gridMonitoramento}
                    aria-label="Monitoramento em Tempo Real"
                >
                    {/* Coluna Esquerda: Histórico e Execuções Recentes */}
                    <div className={styles.colunaHistorico}>
                        <HistoricoExecucoes />
                        <ExecucoesRecentes />
                    </div>

                    {/* Coluna Direita: Distribuição por Tipo e Ambientes Monitorados */}
                    <div className={styles.colunaDireita}>
                        <DistribuicaoTipo />
                        <AmbientesMonitorados />
                    </div>
                </section>
            </AppLayout>
        </>
    );
}
