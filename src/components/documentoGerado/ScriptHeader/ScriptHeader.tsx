import React, { useState } from "react";
import { Check, Pencil, X } from "lucide-react";
import styles from "./ScriptHeader.module.css";

export type ScriptHeaderProps = {
    titulo: string;
    commit: string;
    autor: string;
    data: string;
    onAlterarTitulo?: (novoTitulo: string) => void;
};

const ScriptHeader = ({
    titulo,
    commit,
    autor,
    data,
    onAlterarTitulo,
}: ScriptHeaderProps) => {
    const [editando, setEditando] = useState(false);
    const [rascunhoTitulo, setRascunhoTitulo] = useState(titulo);

    const handleSalvar = () => {
        if (rascunhoTitulo.trim() && onAlterarTitulo) {
            onAlterarTitulo(rascunhoTitulo.trim());
        }
        setEditando(false);
    };

    const handleCancelar = () => {
        setRascunhoTitulo(titulo);
        setEditando(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") handleSalvar();
        if (e.key === "Escape") handleCancelar();
    };

    return (
        <header className={styles.cabecalho}>
            <div className={styles.tituloLinha}>
                {editando ? (
                    <div className={styles.edicaoTituloWrapper}>
                        <input
                            type="text"
                            value={rascunhoTitulo}
                            onChange={(e) => setRascunhoTitulo(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className={styles.inputTitulo}
                            autoFocus
                        />
                        <button
                            type="button"
                            onClick={handleSalvar}
                            className={`${styles.btnIcone} ${styles.btnSalvar}`}
                            title="Salvar título"
                        >
                            <Check size={20} />
                        </button>
                        <button
                            type="button"
                            onClick={handleCancelar}
                            className={`${styles.btnIcone} ${styles.btnCancelar}`}
                            title="Cancelar edição"
                        >
                            <X size={20} />
                        </button>
                    </div>
                ) : (
                    <div className={styles.tituloExibicao}>
                        <h1 className={styles.titulo}>{titulo}</h1>
                        <button
                            type="button"
                            onClick={() => {
                                setRascunhoTitulo(titulo);
                                setEditando(true);
                            }}
                            className={styles.btnIconeEditar}
                            title="Editar título do roteiro"
                        >
                            <Pencil size={20} />
                        </button>
                    </div>
                )}
            </div>

            <div className={styles.metadadosSecundarios}>
                <span className={styles.metaItem}>
                    <strong>Commit:</strong>{" "}
                    <span className={styles.metaValor}>{commit}</span>
                </span>
                <span className={styles.metaItem}>
                    <strong>Nome:</strong>{" "}
                    <span className={styles.metaValor}>{autor}</span>
                </span>
                <span className={styles.metaItem}>
                    <strong>Data:</strong>{" "}
                    <span className={styles.metaValor}>{data}</span>
                </span>
            </div>

            <hr className={styles.divisor} />
        </header>
    );
};

export default ScriptHeader;

