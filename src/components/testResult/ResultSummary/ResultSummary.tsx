import React from "react";
import styles from "./ResultSummary.module.css";

export type ResultSummaryProps = {
    total: number;
    passaram: number;
    naoPassaram: number;
    taxaSucesso: number;
};

const ResultSummary = ({
    total,
    passaram,
    naoPassaram,
    taxaSucesso,
}: ResultSummaryProps) => {
    const percentualSucesso = total > 0 ? (passaram / total) * 100 : 0;
    const percentualFalha = total > 0 ? (naoPassaram / total) * 100 : 0;

    return (
        <header className={styles.cabecalho}>
            <h2 className={styles.titulo}>Resultado do Teste</h2>

            <div className={styles.cardsGrid}>
                <div className={styles.cardMetrica}>
                    <div className={styles.rotuloLinha}>
                        <span
                            className={`${styles.indicador} ${styles.indicadorLaranja}`}
                            aria-hidden="true"
                        />
                        <span className={styles.rotulo}>Taxa de Aderência</span>
                    </div>
                    <strong className={styles.valor}>
                        {taxaSucesso}% ({passaram}/{total})
                    </strong>
                </div>

                <div className={styles.cardMetrica}>
                    <div className={styles.rotuloLinha}>
                        <span
                            className={`${styles.indicador} ${styles.indicadorVerde}`}
                            aria-hidden="true"
                        />
                        <span className={styles.rotulo}>Passaram</span>
                    </div>
                    <strong className={styles.valor}>
                        {passaram} {passaram === 1 ? "Teste" : "Testes"}
                    </strong>
                </div>

                <div className={styles.cardMetrica}>
                    <div className={styles.rotuloLinha}>
                        <span
                            className={`${styles.indicador} ${styles.indicadorVermelho}`}
                            aria-hidden="true"
                        />
                        <span className={styles.rotulo}>Não Passaram</span>
                    </div>
                    <strong className={styles.valor}>
                        {naoPassaram} {naoPassaram === 1 ? "Teste" : "Testes"}
                    </strong>
                </div>
            </div>

            <div
                className={styles.barraProgresso}
                role="progressbar"
                aria-label="Proporção de testes aprovados e reprovados"
                aria-valuenow={taxaSucesso}
                aria-valuemin={0}
                aria-valuemax={100}
            >
                {percentualSucesso > 0 && (
                    <div
                        className={styles.barraSucesso}
                        style={{ width: `${percentualSucesso}%` }}
                    />
                )}
                {percentualFalha > 0 && (
                    <div
                        className={styles.barraFalha}
                        style={{ width: `${percentualFalha}%` }}
                    />
                )}
            </div>
        </header>
    );
};

export default ResultSummary;

