import React, { useState } from "react";
import { Check, Pencil, Plus, Trash2, X } from "lucide-react";
import { ItemCondicao } from "../types";
import styles from "./ConditionList.module.css";

export type ConditionListProps = {
    titulo: string;
    itens: ItemCondicao[];
    placeholderNovo?: string;
    onChangeItens: (novosItens: ItemCondicao[]) => void;
};

const ConditionList = ({
    titulo,
    itens,
    placeholderNovo = "Descreva a condição...",
    onChangeItens,
}: ConditionListProps) => {
    const [idEmEdicao, setIdEmEdicao] = useState<string | null>(null);
    const [textoRascunho, setTextoRascunho] = useState("");
    const [isNovoItem, setIsNovoItem] = useState(false);
    const [erroTexto, setErroTexto] = useState(false);

    const iniciarEdicao = (item: ItemCondicao) => {
        setIdEmEdicao(item.id);
        setTextoRascunho(item.texto);
        setIsNovoItem(false);
        setErroTexto(false);
    };

    const salvarEdicao = (id: string) => {
        if (!textoRascunho.trim()) {
            setErroTexto(true);
            return;
        }

        const itensAtualizados = itens.map((item) =>
            item.id === id ? { ...item, texto: textoRascunho.trim() } : item
        );

        onChangeItens(itensAtualizados);
        setIdEmEdicao(null);
        setIsNovoItem(false);
        setErroTexto(false);
        setTextoRascunho("");
    };

    const cancelarEdicao = (id: string) => {
        if (isNovoItem) {
            onChangeItens(itens.filter((item) => item.id !== id));
        }

        setIdEmEdicao(null);
        setIsNovoItem(false);
        setErroTexto(false);
        setTextoRascunho("");
    };

    const excluirItem = (id: string) => {
        if (idEmEdicao === id) {
            setIdEmEdicao(null);
            setIsNovoItem(false);
            setErroTexto(false);
        }

        onChangeItens(itens.filter((item) => item.id !== id));
    };

    const adicionarNovoItem = () => {
        if (isNovoItem && idEmEdicao) return;

        const novoId = `condicao-${Date.now()}`;
        const novoItem: ItemCondicao = {
            id: novoId,
            texto: "",
        };

        onChangeItens([...itens, novoItem]);
        setIdEmEdicao(novoId);
        setTextoRascunho("");
        setIsNovoItem(true);
        setErroTexto(false);
    };

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        id: string
    ) => {
        if (e.key === "Enter") salvarEdicao(id);
        if (e.key === "Escape") cancelarEdicao(id);
    };

    return (
        <section className={styles.secao}>
            <div className={styles.cabecalhoSecao}>
                <h3 className={styles.titulo}>{titulo}</h3>
                <button
                    type="button"
                    onClick={adicionarNovoItem}
                    className={styles.btnAdicionar}
                >
                    <Plus size={14} />
                    <span>Adicionar condição</span>
                </button>
            </div>

            <div className={styles.listaContainer}>
                {itens.length === 0 ? (
                    <div className={styles.estadoVazio}>
                        Nenhuma condição cadastrada. Clique em{" "}
                        <strong>Adicionar condição</strong> para incluir.
                    </div>
                ) : (
                    itens.map((item, index) => {
                        const estaEditando = idEmEdicao === item.id;

                        return (
                            <div
                                key={item.id}
                                className={`${styles.cartaoItem} ${
                                    estaEditando ? styles.cartaoEditando : ""
                                }`}
                            >
                                <span className={styles.numero}>
                                    {index + 1}.
                                </span>

                                <div className={styles.conteudoCentro}>
                                    {estaEditando ? (
                                        <div
                                            className={styles.campoEdicaoWrapper}
                                        >
                                            <input
                                                type="text"
                                                value={textoRascunho}
                                                onChange={(e) => {
                                                    setTextoRascunho(
                                                        e.target.value
                                                    );
                                                    if (erroTexto)
                                                        setErroTexto(false);
                                                }}
                                                onKeyDown={(e) =>
                                                    handleKeyDown(e, item.id)
                                                }
                                                placeholder={placeholderNovo}
                                                className={`${styles.inputEdicao} ${
                                                    erroTexto
                                                        ? styles.inputErro
                                                        : ""
                                                }`}
                                                autoFocus
                                            />
                                            {erroTexto && (
                                                <span
                                                    className={styles.textoErro}
                                                >
                                                    O texto não pode ficar
                                                    vazio.
                                                </span>
                                            )}
                                        </div>
                                    ) : (
                                        <p className={styles.textoItem}>
                                            {item.texto}
                                        </p>
                                    )}
                                </div>

                                <div className={styles.acoesGrupo}>
                                    {estaEditando ? (
                                        <>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    salvarEdicao(item.id)
                                                }
                                                className={`${styles.btnIcone} ${styles.btnSalvar}`}
                                                title="Salvar condição"
                                                aria-label="Salvar"
                                            >
                                                <Check size={16} />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    cancelarEdicao(item.id)
                                                }
                                                className={`${styles.btnIcone} ${styles.btnCancelar}`}
                                                title="Cancelar edição"
                                                aria-label="Cancelar"
                                            >
                                                <X size={16} />
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    iniciarEdicao(item)
                                                }
                                                className={`${styles.btnIcone} ${styles.btnEditar}`}
                                                title="Editar condição"
                                                aria-label="Editar"
                                            >
                                                <Pencil size={15} />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    excluirItem(item.id)
                                                }
                                                className={`${styles.btnIcone} ${styles.btnExcluir}`}
                                                title="Excluir condição"
                                                aria-label="Excluir"
                                            >
                                                <Trash2 size={15} />
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </section>
    );
};

export default ConditionList;

