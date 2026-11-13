import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import SideBar from "@/components/sideBar/sideBar";
import PromptCenario, {
    DadosPromptCenario,
} from "@/components/promptCenario/promptCenario";
import DocumentoGerado from "@/components/documentoGerado/documentoGerado";
import { PassoValidacao } from "@/components/documentoGerado/types";
import TestResult from "@/components/testResult/testResult";
import {
    DadosResultadoTeste,
    ResultadoPasso,
} from "@/components/testResult/types";
import styles from "./criacaoTeste.module.css";

const TEMPOS_EXECUCAO_MOCK = [410, 320, 540, 290];

const simularResultadoIA = (passos: PassoValidacao[]): DadosResultadoTeste => {
    const passosExecutados: ResultadoPasso[] = passos.map((passo, index) => {
        const ehFalhaSimulada = Boolean(passo.focoDiff);

        return {
            id: passo.id,
            numero: index + 1,
            titulo: passo.acao,
            status: ehFalhaSimulada ? "NAO_PASSOU" : "PASSOU",
            tempoExecucaoMs:
                TEMPOS_EXECUCAO_MOCK[index % TEMPOS_EXECUCAO_MOCK.length],
            ...(ehFalhaSimulada && {
                erroDetalhe:
                    "Erro: 2 requisições POST /api/checkout disparadas simultaneamente (Status 409 Conflict).",
                tags: ["Foco de E2E", "Crítico • Idempotência"],
            }),
        };
    });

    return { passos: passosExecutados };
};

export default function CriacaoTestePage() {
    const [sidebarExpandida, setSidebarExpandida] = useState(false);
    const [gerandoRoteiro, setGerandoRoteiro] = useState(false);
    const [executandoIA, setExecutandoIA] = useState(false);
    const [erroUrl, setErroUrl] = useState<string | undefined>(undefined);
    const [erroDescricao, setErroDescricao] = useState<string | undefined>(
        undefined
    );
    const [tituloRoteiro, setTituloRoteiro] = useState<string | undefined>(
        undefined
    );
    const [versaoDocumento, setVersaoDocumento] = useState(0);
    const [resultadoTeste, setResultadoTeste] =
        useState<DadosResultadoTeste | null>(null);

    const gerarTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const executarTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
        null
    );

    useEffect(() => {
        return () => {
            if (gerarTimeoutRef.current) {
                clearTimeout(gerarTimeoutRef.current);
            }
            if (executarTimeoutRef.current) {
                clearTimeout(executarTimeoutRef.current);
            }
        };
    }, []);

    const handleGerarRoteiro = (dados: DadosPromptCenario) => {
        const urlVazia = !dados.urlPullRequest.trim();
        const descricaoVazia = !dados.descricaoFluxo.trim();

        setErroUrl(
            urlVazia ? "Informe a URL da pull request para gerar o roteiro." : undefined
        );
        setErroDescricao(
            descricaoVazia
                ? "Descreva o fluxo ou regra de negócio."
                : undefined
        );

        if (urlVazia || descricaoVazia) {
            return;
        }

        if (gerarTimeoutRef.current) {
            clearTimeout(gerarTimeoutRef.current);
        }

        setGerandoRoteiro(true);

        gerarTimeoutRef.current = setTimeout(() => {
            const resumoTitulo = dados.descricaoFluxo.trim().slice(0, 60);
            setTituloRoteiro(
                resumoTitulo
                    ? `Roteiro E2E: ${resumoTitulo}`
                    : "Titulo do Roteiro"
            );
            setVersaoDocumento((prev) => prev + 1);
            setResultadoTeste(null);
            setGerandoRoteiro(false);
        }, 500);
    };

    const handleAssinarRoteiro = (passos: PassoValidacao[]) => {
        console.log("Roteiro assinado com os passos:", passos);
    };

    const handleExecutarTesteIA = (passos: PassoValidacao[]) => {
        if (executarTimeoutRef.current) {
            clearTimeout(executarTimeoutRef.current);
        }

        setExecutandoIA(true);

        executarTimeoutRef.current = setTimeout(() => {
            setResultadoTeste(simularResultadoIA(passos));
            setExecutandoIA(false);
        }, 600);
    };

    const handleExportarRelatorio = (resultado: DadosResultadoTeste) => {
        console.log("Exportando relatório:", resultado);
    };

    return (
        <>
            <Head>
                <title>Criação de Teste E2E | Qore Analytics</title>
            </Head>

            <div
                className={`${styles.layoutShell} ${sidebarExpandida ? styles.layoutShellExpandido : ""
                    }`}
            >
                <div className={styles.sidebarContainer}>
                    <SideBar
                        expandida={sidebarExpandida}
                        onExpandidaChange={setSidebarExpandida}
                    />
                </div>

                <main className={styles.conteudoPrincipal}>
                    <div className={styles.conteudoLimitado}>
                        {/* Topo da Página */}
                        <header className={styles.topoPagina}>
                            <p className={styles.tituloPagina}>
                                Criação e execução de teste
                            </p>
                            <h1 className={styles.tituloSecaoPrincipal}>
                                Criação de Teste E2E
                            </h1>
                        </header>

                        {/* Bloco 1: Prompt de Geração de Cenários */}
                        <section
                            className={styles.blocoSecao}
                            aria-label="Prompt de Geração de Cenários"
                        >
                            <PromptCenario
                                carregando={gerandoRoteiro}
                                erroUrl={erroUrl}
                                erroDescricao={erroDescricao}
                                onGerarRoteiro={handleGerarRoteiro}
                            />
                        </section>

                        {/* Bloco 2: Documento Gerado ("Folha Sulfite") */}
                        <section
                            className={styles.blocoSecao}
                            aria-label="Documento gerado"
                        >
                            <h2 className={styles.tituloSecao}>
                                Documento gerado
                            </h2>
                            <DocumentoGerado
                                key={versaoDocumento}
                                tituloInicial={tituloRoteiro}
                                carregandoIA={executandoIA}
                                onAssinarRoteiro={handleAssinarRoteiro}
                                onExecutarTesteIA={handleExecutarTesteIA}
                            />
                        </section>

                        {/* Bloco 3: Resultado do Teste (Condicional após execução da IA) */}
                        {resultadoTeste && (
                            <section
                                className={styles.blocoSecao}
                                aria-label="Resultado do teste"
                            >
                                <TestResult
                                    resultado={resultadoTeste}
                                    onExportarRelatorio={
                                        handleExportarRelatorio
                                    }
                                />
                            </section>
                        )}
                    </div>
                </main>
            </div>
        </>
    );
}

