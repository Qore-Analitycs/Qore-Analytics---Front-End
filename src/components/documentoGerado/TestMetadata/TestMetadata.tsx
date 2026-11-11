import React, { useState } from "react";
import { Check, Pencil, X } from "lucide-react";
import Select, { OpcaoSelect } from "../../select/select";
import { ResumoRoteiro } from "../types";
import styles from "./TestMetadata.module.css";

const OPCOES_IMPACTO: OpcaoSelect[] = [
    { valor: "Baixo", texto: "Baixo" },
    { valor: "Médio", texto: "Médio" },
    { valor: "Alto", texto: "Alto" },
    { valor: "Crítico", texto: "Crítico" },
];

export type TestMetadataProps = {
    resumo: ResumoRoteiro;
    onAlterarResumo?: (novoResumo: ResumoRoteiro) => void;
};

const TestMetadata = ({
    resumo,
    onAlterarResumo,
}: TestMetadataProps) => {
    const [editando, setEditando] = useState(false);
    const [rascunho, setRascunho] = useState<ResumoRoteiro>(resumo);

    const handleSalvar = () => {
        if (onAlterarResumo) {
            onAlterarResumo(rascunho);
        }
        setEditando(false);
    };

    const handleCancelar = () => {
        setRascunho(resumo);
        setEditando(false);
    };

    return (
        <section className={styles.cardMetadados}>
            <div className={styles.cabecalhoSecao}>
                <span className={styles.tagSecao}>Resumo do Teste</span>
                <div className={styles.acoesSecao}>
                    {editando ? (
                        <>
                            <button
                                type="button"
                                onClick={handleSalvar}
                                className={`${styles.btnIcone} ${styles.btnSalvar}`}
                                title="Salvar metadados"
                            >
                                <Check size={16} />
                            </button>
                            <button
                                type="button"
                                onClick={handleCancelar}
                                className={`${styles.btnIcone} ${styles.btnCancelar}`}
                                title="Cancelar edição"
                            >
                                <X size={16} />
                            </button>
                        </>
                    ) : (
                        <button
                            type="button"
                            onClick={() => {
                                setRascunho(resumo);
                                setEditando(true);
                            }}
                            className={styles.btnIconeEditar}
                            title="Editar resumo"
                        >
                            <Pencil size={15} />
                        </button>
                    )}
                </div>
            </div>

            <div className={styles.gradeColunas}>
                {/* Coluna 1: Foco do teste */}
                <div className={styles.coluna}>
                    <span className={styles.rotulo}>Foco do teste</span>
                    {editando ? (
                        <input
                            type="text"
                            value={rascunho.focoTeste}
                            onChange={(e) =>
                                setRascunho({
                                    ...rascunho,
                                    focoTeste: e.target.value,
                                })
                            }
                            className={styles.inputMetadado}
                            placeholder="Ex: Caminho Feliz"
                        />
                    ) : (
                        <div className={styles.valorLinha}>
                            <span className={styles.pontoLaranja}>●</span>
                            <span className={styles.valorTexto}>
                                {resumo.focoTeste}
                            </span>
                        </div>
                    )}
                </div>

                {/* Divisor vertical */}
                <div className={styles.separadorVertical} />

                {/* Coluna 2: Arquivos Alterados */}
                <div className={styles.coluna}>
                    <span className={styles.rotulo}>Arquivos Alterados</span>
                    {editando ? (
                        <input
                            type="text"
                            value={rascunho.arquivosAlterados}
                            onChange={(e) =>
                                setRascunho({
                                    ...rascunho,
                                    arquivosAlterados: e.target.value,
                                })
                            }
                            className={styles.inputMetadado}
                            placeholder="Ex: 4 Arquivos alterados"
                        />
                    ) : (
                        <div className={styles.valorLinha}>
                            <span className={styles.pontoLaranja}>●</span>
                            <span className={styles.valorTexto}>
                                {resumo.arquivosAlterados}
                            </span>
                        </div>
                    )}
                </div>

                {/* Divisor vertical */}
                <div className={styles.separadorVertical} />

                {/* Coluna 3: Impacto */}
                <div className={styles.coluna}>
                    <span className={styles.rotulo}>Impacto</span>
                    {editando ? (
                        <div className={styles.selectWrapperCompacto}>
                            <Select
                                tamanho="compacto"
                                opcoes={OPCOES_IMPACTO}
                                valor={rascunho.impacto}
                                onChange={(novoValor) =>
                                    setRascunho({
                                        ...rascunho,
                                        impacto: novoValor,
                                    })
                                }
                            />
                        </div>
                    ) : (
                        <div className={styles.valorLinha}>
                            <span className={styles.pontoLaranja}>●</span>
                            <span className={styles.valorTexto}>
                                {resumo.impacto}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default TestMetadata;

