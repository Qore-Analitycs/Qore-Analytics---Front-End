import React, { useState } from "react";
import { Check, Pencil, PlusCircle, Trash2, X } from "lucide-react";
import Botao from "../../botao/botao";
import { PassoValidacao } from "../types";
import styles from "./ValidationTable.module.css";

export type ValidationTableProps = {
    passos: PassoValidacao[];
    onChangePassos: (novosPassos: PassoValidacao[]) => void;
    onAssinarRoteiro?: () => void;
    onExecutarTesteIA?: () => void;
    carregandoIA?: boolean;
};

type RascunhoPasso = {
    acao: string;
    dadoEntrada: string;
    resultadoEsperado: string;
    focoDiff: boolean;
};

const RASCUNHO_VAZIO: RascunhoPasso = {
    acao: "",
    dadoEntrada: "",
    resultadoEsperado: "",
    focoDiff: false,
};

const ValidationTable = ({
    passos,
    onChangePassos,
    onAssinarRoteiro,
    onExecutarTesteIA,
    carregandoIA = false,
}: ValidationTableProps) => {
    const [idEmEdicao, setIdEmEdicao] = useState<string | null>(null);
    const [isNovoPasso, setIsNovoPasso] = useState(false);
    const [rascunho, setRascunho] = useState<RascunhoPasso>(RASCUNHO_VAZIO);
    const [erroAcao, setErroAcao] = useState(false);

    const iniciarEdicao = (passo: PassoValidacao) => {
        setIdEmEdicao(passo.id);
        setIsNovoPasso(false);
        setErroAcao(false);
        setRascunho({
            acao: passo.acao,
            dadoEntrada: passo.dadoEntrada,
            resultadoEsperado: passo.resultadoEsperado,
            focoDiff: Boolean(passo.focoDiff),
        });
    };

    const salvarEdicao = (id: string) => {
        if (!rascunho.acao.trim()) {
            setErroAcao(true);
            return;
        }

        const passosAtualizados = passos.map((passo) =>
            passo.id === id
                ? {
                      ...passo,
                      acao: rascunho.acao.trim(),
                      dadoEntrada: rascunho.dadoEntrada.trim(),
                      resultadoEsperado: rascunho.resultadoEsperado.trim(),
                      focoDiff: rascunho.focoDiff,
                  }
                : passo
        );

        onChangePassos(passosAtualizados);
        setIdEmEdicao(null);
        setIsNovoPasso(false);
        setErroAcao(false);
    };

    const cancelarEdicao = (id: string) => {
        if (isNovoPasso) {
            onChangePassos(passos.filter((passo) => passo.id !== id));
        }

        setIdEmEdicao(null);
        setIsNovoPasso(false);
        setErroAcao(false);
        setRascunho(RASCUNHO_VAZIO);
    };

    const excluirPasso = (id: string) => {
        if (idEmEdicao === id) {
            setIdEmEdicao(null);
            setIsNovoPasso(false);
            setErroAcao(false);
        }

        onChangePassos(passos.filter((passo) => passo.id !== id));
    };

    const adicionarPassoManual = () => {
        if (isNovoPasso && idEmEdicao) {
            return;
        }

        const novoId = `passo-${Date.now()}`;
        const novoPasso: PassoValidacao = {
            id: novoId,
            acao: "",
            dadoEntrada: "",
            resultadoEsperado: "",
            focoDiff: false,
        };

        onChangePassos([...passos, novoPasso]);
        setIdEmEdicao(novoId);
        setIsNovoPasso(true);
        setErroAcao(false);
        setRascunho(RASCUNHO_VAZIO);
    };

    const handleKeyDownLinha = (
        e: React.KeyboardEvent<HTMLTableRowElement>,
        id: string
    ) => {
        if (e.key === "Escape") {
            cancelarEdicao(id);
        }
    };

    return (
        <section className={styles.cardTabela}>
            <h2 className={styles.titulo}>
                Roteiro Detalhado de Validação Manual
            </h2>

            <div className={styles.tabelaWrapper}>
                <table className={styles.tabela}>
                    <thead>
                        <tr>
                            <th className={styles.colNumero}>Nº</th>
                            <th className={styles.colAcao}>AÇÃO / INSTRUÇÃO</th>
                            <th className={styles.colDado}>DADO DE ENTRADA</th>
                            <th className={styles.colResultado}>
                                RESULTADO ESPERADO
                            </th>
                            <th className={styles.colAcoes}>AÇÕES</th>
                        </tr>
                    </thead>

                    <tbody>
                        {passos.length === 0 ? (
                            <tr>
                                <td colSpan={5} className={styles.estadoVazio}>
                                    Nenhum passo cadastrado. Clique em{" "}
                                    <strong>Adicionar Passo Manualmente</strong>{" "}
                                    para incluir uma etapa de validação.
                                </td>
                            </tr>
                        ) : (
                            passos.map((passo, index) => {
                                const estaEditando = idEmEdicao === passo.id;

                                return (
                                    <tr
                                        key={passo.id}
                                        className={
                                            estaEditando
                                                ? styles.linhaEditando
                                                : undefined
                                        }
                                        onKeyDown={(e) =>
                                            estaEditando &&
                                            handleKeyDownLinha(e, passo.id)
                                        }
                                    >
                                        <td className={styles.celulaNumero}>
                                            {index + 1}.
                                        </td>

                                        <td>
                                            {estaEditando ? (
                                                <div
                                                    className={
                                                        styles.campoEdicaoStack
                                                    }
                                                >
                                                    <textarea
                                                        className={`${styles.textareaInline} ${erroAcao ? styles.textareaErro : ""}`}
                                                        placeholder="Descreva a ação ou instrução do passo..."
                                                        value={rascunho.acao}
                                                        autoFocus
                                                        onChange={(e) => {
                                                            setRascunho({
                                                                ...rascunho,
                                                                acao: e.target
                                                                    .value,
                                                            });
                                                            if (erroAcao) {
                                                                setErroAcao(
                                                                    false
                                                                );
                                                            }
                                                        }}
                                                    />
                                                    {erroAcao && (
                                                        <span
                                                            className={
                                                                styles.textoErro
                                                            }
                                                        >
                                                            Informe a ação do
                                                            passo.
                                                        </span>
                                                    )}
                                                    <label
                                                        className={
                                                            styles.checkboxFoco
                                                        }
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            checked={
                                                                rascunho.focoDiff
                                                            }
                                                            onChange={(e) =>
                                                                setRascunho({
                                                                    ...rascunho,
                                                                    focoDiff:
                                                                        e.target
                                                                            .checked,
                                                                })
                                                            }
                                                        />
                                                        <span>
                                                            Destacar como FOCO
                                                            DO DIFF
                                                        </span>
                                                    </label>
                                                </div>
                                            ) : (
                                                <div
                                                    className={
                                                        styles.celulaAcaoConteudo
                                                    }
                                                >
                                                    <p
                                                        className={
                                                            styles.textoAcao
                                                        }
                                                    >
                                                        {passo.acao}
                                                    </p>
                                                    {passo.focoDiff && (
                                                        <span
                                                            className={
                                                                styles.badgeFocoDiff
                                                            }
                                                        >
                                                            FOCO DO DIFF
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                        </td>

                                        <td>
                                            {estaEditando ? (
                                                <textarea
                                                    className={`${styles.textareaInline} ${styles.textareaCodigo}`}
                                                    placeholder="Ex: URL: /checkout&#10;order_id=9841"
                                                    value={rascunho.dadoEntrada}
                                                    onChange={(e) =>
                                                        setRascunho({
                                                            ...rascunho,
                                                            dadoEntrada:
                                                                e.target.value,
                                                        })
                                                    }
                                                />
                                            ) : passo.dadoEntrada ? (
                                                <div
                                                    className={
                                                        styles.badgeDadoEntrada
                                                    }
                                                >
                                                    {passo.dadoEntrada}
                                                </div>
                                            ) : (
                                                <span
                                                    className={
                                                        styles.dadoVazio
                                                    }
                                                >
                                                    —
                                                </span>
                                            )}
                                        </td>

                                        <td>
                                            {estaEditando ? (
                                                <textarea
                                                    className={
                                                        styles.textareaInline
                                                    }
                                                    placeholder="Descreva o resultado esperado..."
                                                    value={
                                                        rascunho.resultadoEsperado
                                                    }
                                                    onChange={(e) =>
                                                        setRascunho({
                                                            ...rascunho,
                                                            resultadoEsperado:
                                                                e.target.value,
                                                        })
                                                    }
                                                />
                                            ) : (
                                                <p
                                                    className={
                                                        styles.textoResultado
                                                    }
                                                >
                                                    {passo.resultadoEsperado ||
                                                        "—"}
                                                </p>
                                            )}
                                        </td>

                                        <td>
                                            <div className={styles.acoesGrupo}>
                                                {estaEditando ? (
                                                    <>
                                                        <button
                                                            type="button"
                                                            className={`${styles.btnIcone} ${styles.btnSalvar}`}
                                                            onClick={() =>
                                                                salvarEdicao(
                                                                    passo.id
                                                                )
                                                            }
                                                            title="Salvar alterações"
                                                            aria-label="Salvar alterações"
                                                        >
                                                            <Check size={16} />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className={`${styles.btnIcone} ${styles.btnCancelar}`}
                                                            onClick={() =>
                                                                cancelarEdicao(
                                                                    passo.id
                                                                )
                                                            }
                                                            title="Cancelar edição"
                                                            aria-label="Cancelar edição"
                                                        >
                                                            <X size={16} />
                                                        </button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <button
                                                            type="button"
                                                            className={`${styles.btnIcone} ${styles.btnEditar}`}
                                                            onClick={() =>
                                                                iniciarEdicao(
                                                                    passo
                                                                )
                                                            }
                                                            title="Editar passo"
                                                            aria-label="Editar passo"
                                                        >
                                                            <Pencil size={15} />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className={`${styles.btnIcone} ${styles.btnExcluir}`}
                                                            onClick={() =>
                                                                excluirPasso(
                                                                    passo.id
                                                                )
                                                            }
                                                            title="Excluir passo"
                                                            aria-label="Excluir passo"
                                                        >
                                                            <Trash2 size={15} />
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            <div className={styles.rodapeTabela}>
                <button
                    type="button"
                    className={styles.btnAdicionarPasso}
                    onClick={adicionarPassoManual}
                >
                    <PlusCircle size={15} />
                    <span>Adicionar Passo Manualmente</span>
                </button>

                <div className={styles.botoesAcao}>
                    <div className={styles.botaoWrapper}>
                        <Botao
                            type="button"
                            texto="Assinar Roteiro"
                            variante="assinar"
                            tamanho="compacto"
                            onPress={onAssinarRoteiro}
                        />
                    </div>

                    <div className={styles.botaoWrapper}>
                        <Botao
                            type="button"
                            texto={
                                carregandoIA
                                    ? "Executando..."
                                    : "Executar Teste com IA"
                            }
                            variante="laranja"
                            tamanho="compacto"
                            disabled={carregandoIA}
                            onPress={onExecutarTesteIA}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ValidationTable;

