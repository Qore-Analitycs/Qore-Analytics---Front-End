import { useMemo, useState } from "react";
import Head from "next/head";
import { ShieldCheck } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import PromptCenario, {
    DadosPromptCenario,
} from "@/components/promptCenario/promptCenario";
import DocumentoGerado from "@/components/documentoGerado/documentoGerado";
import {
    DadosRoteiro,
    ItemCondicao,
    PassoValidacao,
    ResumoRoteiro,
} from "@/components/documentoGerado/types";
import TestResult from "@/components/testResult/testResult";
import PlaywrightLiveMonitor from "@/components/PlaywrightLiveMonitor/PlaywrightLiveMonitor";
import ModalAssinarDocumento from "@/components/ModalAssinarDocumento/ModalAssinarDocumento";
import { usePrompt } from "@/hooks/useGeracaoPrompt";
import { usePlaywrightExecucao } from "@/hooks/usePlaywrightExecucao";
import type { GerarPlanoTesteDto } from "@/@types/geracaoPrompt";
import { toastErro, toastInfo } from "@/utils/toast";
import styles from "./criacaoTeste.module.css";

interface DocumentoGeradoMapeado {
    titulo: string;
    commit: string;
    autor: string;
    data: string;
    resumo: ResumoRoteiro;
    preCondicoes: ItemCondicao[];
    criteriosAceitacao: ItemCondicao[];
    passos: PassoValidacao[];
}

const mapearPlanoParaDocumento = (
    plano: GerarPlanoTesteDto
): DocumentoGeradoMapeado => {
    const totalArquivos =
        plano.totalArquivosAlterados ?? plano.arquivosAlterados?.length ?? 0;

    return {
        titulo: plano.titulo?.trim() || "Roteiro de Teste E2E",
        commit: plano.commit?.trim() || "N/A",
        autor: plano.nome?.trim() || "Qore Analytics IA",
        data: plano.data?.trim() || new Date().toLocaleDateString("pt-BR"),
        resumo: {
            focoTeste: plano.focoTeste?.trim() || "Caminho Feliz",
            arquivosAlterados:
                totalArquivos === 1
                    ? "1 Arquivo alterado"
                    : `${totalArquivos} Arquivos alterados`,
            impacto: plano.impacto?.trim() || "Médio",
        },
        preCondicoes: (plano.preCondicoes ?? []).map((texto, idx) => ({
            id: `pre-${idx + 1}`,
            texto,
        })),
        criteriosAceitacao: (plano.criteriosMinimosAceitacao ?? []).map(
            (texto, idx) => ({
                id: `crit-${idx + 1}`,
                texto,
            })
        ),
        passos: (plano.passos ?? []).map((passo, idx) => ({
            id: `passo-${passo.id || idx + 1}`,
            acao: passo.descricao?.trim() || passo.titulo?.trim() || `Passo ${idx + 1}`,
            dadoEntrada:
                passo.dadosTeste?.trim() ||
                (passo.alvo?.trim() ? `Alvo: ${passo.alvo.trim()}` : ""),
            resultadoEsperado: passo.resultadoEsperado?.trim() || "",
            focoDiff: Boolean(passo.criterioMinimo),
        })),
    };
};

export default function CriacaoTestePage() {
    const [erroUrl, setErroUrl] = useState<string | undefined>(undefined);
    const [erroUrlAlvo, setErroUrlAlvo] = useState<string | undefined>(undefined);
    const [erroDescricao, setErroDescricao] = useState<string | undefined>(
        undefined
    );

    const [dadosPrompt, setDadosPrompt] = useState<DadosPromptCenario>({
        projetoId: 0,
        urlPullRequest: "",
        urlAlvo: "",
        branch: "",
        commit: "",
        descricaoFluxo: "",
    });

    const [versaoDocumento, setVersaoDocumento] = useState(0);
    const [modalAssinarAberto, setModalAssinarAberto] = useState(false);

    const {
        planoAtual,
        carregando: gerandoRoteiro,
        inspecaoGitHub,
        inspecionarGitHub,
        limparInspecaoGitHub,
        gerarPrompt,
    } = usePrompt();

    const {
        execucaoId,
        execucaoIniciada,
        relatorio,
        frameAoVivoUrl,
        executando,
        erroExecucao,
        avaliacaoDod,
        resultadoTeste,
        iniciarExecucao,
        exportarRelatorio,
        registrarAssinatura,
        resetarExecucao,
    } = usePlaywrightExecucao();

    const documentoGerado = useMemo(
        () => (planoAtual ? mapearPlanoParaDocumento(planoAtual) : null),
        [planoAtual]
    );

    const handleDadosPromptChange = (novosDados: DadosPromptCenario) => {
        setDadosPrompt(novosDados);
        if (novosDados.urlAlvo.trim() && erroUrlAlvo) {
            setErroUrlAlvo(undefined);
        }
        if (novosDados.urlPullRequest.trim() && erroUrl) {
            setErroUrl(undefined);
        }
        if (novosDados.descricaoFluxo.trim() && erroDescricao) {
            setErroDescricao(undefined);
        }
    };

    const handleGerarRoteiro = async (dados: DadosPromptCenario) => {
        setDadosPrompt(dados);

        const semEntradaMinima =
            !dados.descricaoFluxo.trim() &&
            !dados.urlPullRequest.trim() &&
            !dados.commit.trim() &&
            !(dados.projetoId > 0);

        if (semEntradaMinima) {
            setErroDescricao(
                "Descreva o fluxo, informe uma URL do GitHub ou selecione um projeto."
            );
            return;
        }

        setErroUrl(undefined);
        setErroDescricao(undefined);

        const plano = await gerarPrompt({
            projetoId: dados.projetoId > 0 ? dados.projetoId : null,
            urlPullRequest: dados.urlPullRequest || null,
            branch: dados.branch || null,
            commitSha: dados.commit || null,
            urlAlvo: dados.urlAlvo || null,
            prompt: dados.descricaoFluxo,
        });

        if (!plano) {
            return;
        }

        resetarExecucao();
        if (!dados.urlAlvo.trim() && plano.urlAlvo?.trim()) {
            setDadosPrompt((prev) => ({
                ...prev,
                urlAlvo: plano.urlAlvo.trim(),
            }));
        }
        setVersaoDocumento((prev) => prev + 1);
    };

    const handleAssinarRoteiro = () => {
        if (!execucaoId) {
            toastInfo(
                "Execute o teste com IA primeiro para gerar a execução e liberar a assinatura DoD."
            );
            return;
        }
        setModalAssinarAberto(true);
    };

    const handleExecutarTesteIA = async (
        passos: PassoValidacao[],
        dadosRoteiro?: DadosRoteiro
    ) => {
        const urlAlvo = (
            dadosPrompt.urlAlvo ||
            planoAtual?.urlAlvo ||
            ""
        ).trim();

        if (!/^https?:\/\/.+/i.test(urlAlvo)) {
            const msg =
                "Informe uma URL alvo válida (http:// ou https://) no campo 'Url da onde vai ser testado'.";
            setErroUrlAlvo(msg);
            toastErro(msg);
            return;
        }

        setErroUrlAlvo(undefined);

        await iniciarExecucao({
            urlAlvo,
            projetoId: dadosPrompt.projetoId || planoAtual?.projetoId || null,
            titulo:
                dadosRoteiro?.titulo ||
                documentoGerado?.titulo ||
                "Execução E2E Automatizada",
            commit: dadosPrompt.commit || dadosRoteiro?.commit,
            autor: dadosRoteiro?.autor,
            data: dadosRoteiro?.data,
            resumo: dadosRoteiro?.resumo,
            preCondicoes: dadosRoteiro?.preCondicoes.map((item) => item.texto),
            criteriosMinimosAceitacao: dadosRoteiro?.criteriosAceitacao.map(
                (item) => item.texto
            ),
            passos,
        });
    };

    const handleExportarRelatorio = () => {
        void exportarRelatorio();
    };

    return (
        <>
            <Head>
                <title>Criação de Teste E2E | Qore Analytics</title>
            </Head>

            <AppLayout maxWidth="1520px" containerClassName={styles.conteudoLimitado}>
                {/* Topo da Página */}
                <header className={styles.topoPagina}>
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
                        erroUrlAlvo={erroUrlAlvo}
                        erroDescricao={erroDescricao}
                        inspecaoGitHub={inspecaoGitHub}
                        onInspecionarGitHub={inspecionarGitHub}
                        onLimparInspecaoGitHub={limparInspecaoGitHub}
                        onDadosChange={handleDadosPromptChange}
                        onGerarRoteiro={handleGerarRoteiro}
                    />
                </section>

                {/* Bloco 2: Documento Gerado (exibido somente após geração via POST /PassosTeste/gerar) */}
                {documentoGerado && (
                    <section
                        className={styles.blocoSecao}
                        aria-label="Documento gerado"
                    >
                        <DocumentoGerado
                            key={versaoDocumento}
                            tituloInicial={documentoGerado.titulo}
                            commitInicial={documentoGerado.commit}
                            autorInicial={documentoGerado.autor}
                            dataInicial={documentoGerado.data}
                            resumoInicial={documentoGerado.resumo}
                            preCondicoesIniciais={documentoGerado.preCondicoes}
                            criteriosIniciais={documentoGerado.criteriosAceitacao}
                            passosIniciais={documentoGerado.passos}
                            carregandoIA={executando}
                            onAssinarRoteiro={handleAssinarRoteiro}
                            onExecutarTesteIA={handleExecutarTesteIA}
                        />
                    </section>
                )}

                {/* Banner de Confirmação de Assinatura DoD */}
                {avaliacaoDod && (
                    <section
                        className={`${styles.bannerAssinatura} ${
                            avaliacaoDod.decisao === "REPROVADO_POR_QA"
                                ? styles.bannerReprovado
                                : styles.bannerAprovado
                        }`}
                        aria-label="Status de homologação digital DoD"
                    >
                        <div className={styles.bannerAssinaturaEsquerda}>
                            <ShieldCheck size={20} aria-hidden="true" />
                            <div>
                                <p className={styles.bannerTitulo}>
                                    Documento Homologado ({avaliacaoDod.decisao})
                                </p>
                                <p className={styles.bannerDetalhes}>
                                    {avaliacaoDod.avaliadoPor?.assinandoComoTexto ||
                                        avaliacaoDod.avaliadoPor?.nome ||
                                        "Avaliador QA"}{" "}
                                    • {avaliacaoDod.assinadoEmFormatado} • Hash:{" "}
                                    <code>{avaliacaoDod.hashAssinatura.slice(0, 16)}...</code>
                                </p>
                            </div>
                        </div>

                        {avaliacaoDod.assinaturaBase64 && (
                            <img
                                src={avaliacaoDod.assinaturaBase64}
                                alt="Assinatura digital registrada"
                                className={styles.bannerImagemAssinatura}
                            />
                        )}
                    </section>
                )}

                {/* Bloco 3: Monitoramento ao Vivo Playwright (/live + polling) */}
                <PlaywrightLiveMonitor
                    execucaoId={execucaoId}
                    execucaoIniciada={execucaoIniciada}
                    relatorio={relatorio}
                    frameAoVivoUrl={frameAoVivoUrl}
                    executando={executando}
                    erroExecucao={erroExecucao}
                />

                {/* Bloco 4: Resultado Final do Teste */}
                {resultadoTeste && (
                    <section
                        className={styles.blocoSecao}
                        aria-label="Resultado do teste"
                    >
                        <TestResult
                            resultado={resultadoTeste}
                            onExportarRelatorio={handleExportarRelatorio}
                        />
                    </section>
                )}
            </AppLayout>

            <ModalAssinarDocumento
                aberto={modalAssinarAberto}
                execucaoId={execucaoId}
                tituloDocumento={relatorio?.titulo || documentoGerado?.titulo}
                onFechar={() => setModalAssinarAberto(false)}
                onAssinado={registrarAssinatura}
            />
        </>
    );
}
