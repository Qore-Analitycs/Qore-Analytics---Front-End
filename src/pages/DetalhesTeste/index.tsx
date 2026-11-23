import React from "react";
import Head from "next/head";
import { Download, Share2 } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import VideoSessionPlayer, {
    MARCADORES_SESSAO_PADRAO,
    MarcadorEventoSessao,
} from "@/components/VideoSessionPlayer/VideoSessionPlayer";
import ValidationTable from "@/components/documentoGerado/ValidationTable/ValidationTable";
import { PassoValidacao } from "@/components/documentoGerado/types";
import TestResult from "@/components/testResult/testResult";
import { DadosResultadoTeste } from "@/components/testResult/types";
import styles from "./detalhesTeste.module.css";

export const PASSOS_ROTEIRO_DETALHE: PassoValidacao[] = [
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

export const RESULTADO_TESTE_DETALHE: DadosResultadoTeste = {
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

export interface DetalheTesteProps {
    /** URL do vídeo da sessão E2E (.mp4 / .webm). Se ausente ou indisponível, o player exibe "Vídeo não encontrado". */
    videoSrc?: string;
    /** Lista de eventos/marcadores da linha do tempo */
    events?: MarcadorEventoSessao[];
    /** Título exibido no cabeçalho do player de vídeo */
    sessionTitle?: string;
    /** Badge técnico de resolução/FPS */
    resolutionBadge?: string;
    /** Data/hora formatada da sessão gravada */
    timestampLabel?: string;
    /** Metadados do runner Playwright exibidos na barra do navegador */
    runnerInfo?: {
        version?: string;
        resolution?: string;
        url?: string;
    };
    /** Passos do Roteiro Detalhado de Validação Manual */
    passosRoteiro?: PassoValidacao[];
    /** Dados de resultado dos passos executados */
    resultadoTeste?: DadosResultadoTeste;
}

export default function DetalhesTestePage({
    videoSrc,
    events = MARCADORES_SESSAO_PADRAO,
    sessionTitle = "Gravação Contínua da Sessão Web",
    timestampLabel = "17 de Outubro 2018, 09 : 41 BRT",
    runnerInfo = {
        version: "PLAYWRIGHT_RUNNER_v1.42",
        resolution: "1280x720",
        url: "https://app.empresa.com.br/checkout/pagamento-seguro",
    },
    passosRoteiro = PASSOS_ROTEIRO_DETALHE,
    resultadoTeste = RESULTADO_TESTE_DETALHE,
}: DetalheTesteProps) {
    return (
        <>
            <Head>
                <title>Detalhes do Teste | Qore Analytics</title>
            </Head>

            <AppLayout maxWidth="1520px" containerClassName={styles.container}>
                {/* 1. Cabeçalho da Página e Ações Superiores */}
                <header className={styles.cabecalhoPagina}>
                    <div className={styles.textosCabecalho}>
                        <h1 className={styles.tituloRelatorio}>
                            Detalhes do Teste
                        </h1>
                    </div>

                </header>

                {/* 2. Player de Sessão de Vídeo e Telemetria */}
                <VideoSessionPlayer
                    src={videoSrc}
                    events={events}
                    sessionTitle={sessionTitle}
                    timestampLabel={timestampLabel}
                    runnerInfo={runnerInfo}
                />

                {/* 3. Roteiro Detalhado de Validação Manual (Modo Leitura) */}
                <ValidationTable
                    passos={passosRoteiro}
                    readOnly
                    mode="view"
                />

                {/* 4. Resultado do Teste (Modo Leitura com indicador Taxa de Aderência) */}
                <TestResult
                    resultado={resultadoTeste}
                    readOnly
                    mode="view"
                />
            </AppLayout>
        </>
    );
}
