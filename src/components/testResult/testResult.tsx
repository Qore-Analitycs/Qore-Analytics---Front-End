import React, { useState } from "react";
import Botao from "../botao/botao";
import ResultSummary from "./ResultSummary/ResultSummary";
import ResultStepList from "./ResultStepList/ResultStepList";
import { DadosResultadoTeste, FiltroResultado } from "./types";
import styles from "./testResult.module.css";

export type TestResultProps = {
    resultado: DadosResultadoTeste;
    onExportarRelatorio?: (resultado: DadosResultadoTeste) => void;
};

const TestResult = ({ resultado, onExportarRelatorio }: TestResultProps) => {
    const [filtroAtivo, setFiltroAtivo] = useState<FiltroResultado>("TODOS");

    const total = resultado.passos.length;
    const passaram = resultado.passos.filter(
        (passo) => passo.status === "PASSOU"
    ).length;
    const naoPassaram = total - passaram;
    const taxaSucesso = total > 0 ? Math.round((passaram / total) * 100) : 0;

    return (
        <section className={styles.folhaSulfite} aria-label="Resultado do Teste">
            <ResultSummary
                total={total}
                passaram={passaram}
                naoPassaram={naoPassaram}
                taxaSucesso={taxaSucesso}
            />

            <div className={styles.abasFiltro} role="tablist" aria-label="Filtrar resultados por status">
                <button
                    type="button"
                    role="tab"
                    aria-selected={filtroAtivo === "TODOS"}
                    className={`${styles.aba} ${
                        filtroAtivo === "TODOS" ? styles.abaAtiva : ""
                    }`}
                    onClick={() => setFiltroAtivo("TODOS")}
                >
                    Todos ({total})
                </button>

                <button
                    type="button"
                    role="tab"
                    aria-selected={filtroAtivo === "PASSOU"}
                    className={`${styles.aba} ${
                        filtroAtivo === "PASSOU" ? styles.abaAtiva : ""
                    }`}
                    onClick={() => setFiltroAtivo("PASSOU")}
                >
                    Passaram ({passaram})
                </button>

                <button
                    type="button"
                    role="tab"
                    aria-selected={filtroAtivo === "NAO_PASSOU"}
                    className={`${styles.aba} ${
                        filtroAtivo === "NAO_PASSOU" ? styles.abaAtiva : ""
                    }`}
                    onClick={() => setFiltroAtivo("NAO_PASSOU")}
                >
                    Não Passaram ({naoPassaram})
                </button>
            </div>

            <ResultStepList
                passos={resultado.passos}
                filtroAtivo={filtroAtivo}
            />

            <footer className={styles.rodape}>
                <div className={styles.botaoWrapper}>
                    <Botao
                        type="button"
                        texto="Exportar Relatório"
                        variante="laranja"
                        tamanho="compacto"
                        onPress={() => onExportarRelatorio?.(resultado)}
                    />
                </div>
            </footer>
        </section>
    );
};

export default TestResult;

