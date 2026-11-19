import React, { useState } from "react";
import Head from "next/head";
import { Download, Share2 } from "lucide-react";
import SideBar from "@/components/sideBar/sideBar";
import VideoPlayerMock from "@/components/VideoPlayerMock/VideoPlayerMock";
import ValidationTable from "@/components/documentoGerado/ValidationTable/ValidationTable";
import { PassoValidacao } from "@/components/documentoGerado/types";
import TestResult from "@/components/testResult/testResult";
import { DadosResultadoTeste } from "@/components/testResult/types";
import styles from "./detalhesTeste.module.css";

const PASSOS_ROTEIRO_DETALHE: PassoValidacao[] = [
    {
        id: "passo-1",
        acao: "Navegar até a tela de Checkout e avançar para etapa de Pagamento",
        dadoEntrada: "URL: /checkout\norder_id=9841",
        resultadoEsperado:
            "A tela exibe as opções de Pix, Cartão e Boleto sem erros de renderização.",
    },
    {
        id: "passo-2",
        acao: "Selecionar opção 'Cartão de Crédito' e escolher 6x sem juros",
        dadoEntrada: "Opção: '6x de R$ 35,00'",
        resultadoEsperado:
            "O valor total das parcelas soma exatamente R$ 210,00 sem discrepância de centavos.",
    },
    {
        id: "passo-3",
        acao: "Clicar no botão 'Finalizar Pedido' rapidamente em sequência (duplo clique proposital)",
        dadoEntrada: "2 cliques em < 300ms",
        resultadoEsperado:
            "O debounce desabilita o botão após o 1º clique; apenas 1 requisição POST é disparada.",
        focoDiff: true,
    },
    {
        id: "passo-4",
        acao: "Confirmar modal de sucesso e verificar redirecionamento para recibo",
        dadoEntrada: "Status HTTP 200\nretornado",
        resultadoEsperado:
            "Tela de confirmação exibe código do pedido #9841 e comprovante para download.",
    },
];

const RESULTADO_TESTE_DETALHE: DadosResultadoTeste = {
    passos: [
        {
            id: "res-1",
            numero: 1,
            titulo: "Navegar até a tela de Checkout",
            descricao:
                "Opções Pix, Cartão e Boleto renderizadas sem erros no DOM.",
            status: "PASSOU",
            tempoExecucaoMs: 410,
            tempoExecucaoLabel: "410ms",
        },
        {
            id: "res-2",
            numero: 2,
            titulo: "Selecionar Cartão em 6x sem juros",
            descricao:
                "Soma de parcelas validada: R$ 210,00 exatos (0 discrepância).",
            status: "PASSOU",
            tempoExecucaoMs: 820,
            tempoExecucaoLabel: "820ms",
        },
        {
            id: "res-3",
            numero: 3,
            titulo: "Duplo clique em 'Finalizar Pedido'",
            descricao:
                "Falha de idempotência detectada durante submissão concorrente.",
            status: "NAO_PASSOU",
            tempoExecucaoMs: 1880,
            tempoExecucaoLabel: "1.88s",
            erroDetalhe:
                "Erro: 2 requisições POST /api/checkout disparadas simultaneamente (Status 409 Conflict).",
            tags: ["Foco de E2E", "Crítico • Idempotência"],
        },
        {
            id: "res-4",
            numero: 4,
            titulo: "Confirmar modal e recibo #9841",
            descricao:
                "Pedido #9841 confirmado e comprovante disponível para download.",
            status: "PASSOU",
            tempoExecucaoMs: 1120,
            tempoExecucaoLabel: "1.12s",
        },
    ],
};

export default function DetalhesTestePage() {
    const [sidebarExpandida, setSidebarExpandida] = useState(false);

    return (
        <>
            <Head>
                <title>Detalhe do Teste | Qore Analytics</title>
            </Head>

            <div
                className={`${styles.layoutShell} ${
                    sidebarExpandida ? styles.layoutShellExpandido : ""
                }`}
            >
                {/* Barra Lateral Fixa */}
                <div className={styles.sidebarContainer}>
                    <SideBar
                        expandida={sidebarExpandida}
                        onExpandidaChange={setSidebarExpandida}
                    />
                </div>

                {/* Container Principal */}
                <main className={styles.conteudoPrincipal}>
                    <div className={styles.conteudoLimitado}>
                        {/* 1. Cabeçalho da Página */}
                        <header className={styles.cabecalhoPagina}>
                            <div className={styles.textosCabecalho}>
                                <span className={styles.categoriaPagina}>
                                    Detalhe do teste
                                </span>
                                <h1 className={styles.tituloRelatorio}>
                                    Relatório do fluxo completo de checkout de
                                    login
                                </h1>
                                <p className={styles.descricaoRelatorio}>
                                    Inspeção detalhada de telemetria visual,
                                    rastreamento de interação Playwright e
                                    validações de estado do DOM
                                </p>
                            </div>

                            <div className={styles.acoesCabecalho}>
                                <button
                                    type="button"
                                    className={styles.btnCompartilhar}
                                >
                                    <Share2
                                        size={16}
                                        className={styles.iconeCompartilhar}
                                        aria-hidden="true"
                                    />
                                    <span>Compartilhar</span>
                                </button>

                                <button
                                    type="button"
                                    className={styles.btnVideo}
                                >
                                    <Download
                                        size={16}
                                        className={styles.iconeVideo}
                                        aria-hidden="true"
                                    />
                                    <span>Vídeo (.mp4)</span>
                                </button>
                            </div>
                        </header>

                        {/* 2. Player de Vídeo e Telemetria (Placeholder Estrutural) */}
                        <VideoPlayerMock />

                        {/* 3. Roteiro Detalhado de Validação Manual (Read-Only) */}
                        <ValidationTable
                            passos={PASSOS_ROTEIRO_DETALHE}
                            readOnly
                            mode="view"
                        />

                        {/* 4. Resultado do Teste (Read-Only) */}
                        <TestResult
                            resultado={RESULTADO_TESTE_DETALHE}
                            readOnly
                            mode="view"
                        />
                    </div>
                </main>
            </div>
        </>
    );
}

