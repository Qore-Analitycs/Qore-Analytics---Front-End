import React from "react";
import { AlertCircle, CheckCircle2, Clock, XCircle } from "lucide-react";
import { FiltroResultado, ResultadoPasso } from "../types";
import styles from "./ResultStepList.module.css";

export type ResultStepListProps = {
    passos: ResultadoPasso[];
    filtroAtivo: FiltroResultado;
};

const ResultStepList = ({ passos, filtroAtivo }: ResultStepListProps) => {
    const passosFiltrados = passos.filter((passo) => {
        if (filtroAtivo === "TODOS") return true;
        return passo.status === filtroAtivo;
    });

    if (passosFiltrados.length === 0) {
        return (
            <div className={styles.estadoVazio}>
                Nenhum passo encontrado para o filtro selecionado.
            </div>
        );
    }

    return (
        <ul className={styles.lista}>
            {passosFiltrados.map((passo) => {
                const passou = passo.status === "PASSOU";
                const numeroFormatado = String(passo.numero).padStart(2, "0");

                return (
                    <li
                        key={passo.id}
                        className={`${styles.cardPasso} ${
                            passou ? styles.cardSucesso : styles.cardFalha
                        }`}
                    >
                        <div className={styles.linhaPrincipal}>
                            <div className={styles.infoEsquerda}>
                                <span
                                    className={`${styles.iconeStatus} ${
                                        passou
                                            ? styles.iconeSucesso
                                            : styles.iconeFalha
                                    }`}
                                    aria-hidden="true"
                                >
                                    {passou ? (
                                        <CheckCircle2 size={20} />
                                    ) : (
                                        <XCircle size={20} />
                                    )}
                                </span>

                                <h3 className={styles.tituloPasso}>
                                    #{numeroFormatado} - {passo.titulo}
                                </h3>
                            </div>

                            <div className={styles.infoDireita}>
                                <span className={styles.tempoExecucao}>
                                    <Clock size={13} aria-hidden="true" />
                                    <span>{passo.tempoExecucaoMs}ms</span>
                                </span>

                                <span
                                    className={`${styles.badgeStatus} ${
                                        passou
                                            ? styles.badgePassou
                                            : styles.badgeNaoPassou
                                    }`}
                                >
                                    {passou ? "PASSOU" : "NÃO PASSOU"}
                                </span>
                            </div>
                        </div>

                        {!passou && (passo.erroDetalhe || (passo.tags && passo.tags.length > 0)) && (
                            <div className={styles.detalheFalha}>
                                {passo.erroDetalhe && (
                                    <div className={styles.caixaErro}>
                                        <AlertCircle
                                            size={16}
                                            className={styles.iconeErro}
                                            aria-hidden="true"
                                        />
                                        <p className={styles.textoErro}>
                                            {passo.erroDetalhe}
                                        </p>
                                    </div>
                                )}

                                {passo.tags && passo.tags.length > 0 && (
                                    <div className={styles.tagsRodape}>
                                        {passo.tags.map((tag, index) => (
                                            <span
                                                key={`${passo.id}-tag-${index}`}
                                                className={`${styles.tag} ${
                                                    index === 0
                                                        ? styles.tagDestaque
                                                        : styles.tagCritico
                                                }`}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </li>
                );
            })}
        </ul>
    );
};

export default ResultStepList;

