import React, { useEffect, useId, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import styles from "./select.module.css";

export type OpcaoSelect = {
    valor: string;
    texto: string;
};

export type SelectProps = {
    id?: string;
    label?: string;
    placeholder?: string;
    opcoes?: OpcaoSelect[];
    value?: string;
    valor?: string;
    onChange?: (novoValor: string) => void;
    icone?: IconDefinition;
    erro?: string;
    disabled?: boolean;
    tamanho?: "padrao" | "compacto";
    className?: string;
};

const Select = ({
    id,
    label,
    placeholder = "Todos os Tipos",
    opcoes = [],
    value,
    valor,
    onChange,
    icone,
    erro,
    disabled = false,
    tamanho = "padrao",
    className = "",
}: SelectProps) => {
    const [aberto, setAberto] = useState(false);
    const [valorInterno, setValorInterno] = useState("");
    const wrapperRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const generatedId = useId();
    const triggerId = id || `select-${generatedId}`;
    const listboxId = `${triggerId}-listbox`;

    // Aceita tanto 'value' quanto 'valor' para manter compatibilidade com os consumidores existentes
    const valorControlado = value !== undefined ? value : valor;
    const valorAtual =
        valorControlado !== undefined ? valorControlado : valorInterno;

    // Fecha o dropdown ao clicar fora (mousedown) ou pressionar Escape
    useEffect(() => {
        if (!aberto) return;

        const fecharAoClicarFora = (event: MouseEvent) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target as Node)
            ) {
                setAberto(false);
            }
        };

        const fecharAoPressionarEsc = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                event.stopImmediatePropagation();
                setAberto(false);
                triggerRef.current?.focus();
            }
        };

        document.addEventListener("mousedown", fecharAoClicarFora);
        document.addEventListener("keydown", fecharAoPressionarEsc);
        return () => {
            document.removeEventListener("mousedown", fecharAoClicarFora);
            document.removeEventListener("keydown", fecharAoPressionarEsc);
        };
    }, [aberto]);

    const opcaoAtual = opcoes.find((op) => op.valor === valorAtual);

    const handleSelecionar = (novoValor: string) => {
        if (valorControlado === undefined) {
            setValorInterno(novoValor);
        }
        onChange?.(novoValor);
        setAberto(false);
    };

    const ehCompacto = tamanho === "compacto";
    const classeTamanhoTrigger = ehCompacto ? styles.triggerCompacto : "";
    const classeTamanhoOpcao = ehCompacto ? styles.opcaoCompacto : "";
    const classeTamanhoContainer = ehCompacto ? styles.containerCompacto : "";
    const classeTamanhoLabel = ehCompacto ? styles.labelCompacto : "";

    const errorId = erro ? `${triggerId}-erro` : undefined;

    return (
        <div
            className={`${styles.container} ${classeTamanhoContainer} ${className}`.trim()}
        >
            {label && (
                <label
                    htmlFor={triggerId}
                    className={`${styles.label} ${classeTamanhoLabel}`}
                >
                    {label}
                </label>
            )}

            <div className={styles.selectWrapper} ref={wrapperRef}>
                {/* Gatilho customizado com o mesmo padrão visual do Input */}
                <button
                    ref={triggerRef}
                    id={triggerId}
                    type="button"
                    disabled={disabled}
                    aria-haspopup="listbox"
                    aria-expanded={aberto}
                    aria-controls={listboxId}
                    aria-describedby={errorId}
                    className={`${styles.selectTrigger} ${
                        aberto ? styles.selectTriggerAberto : ""
                    } ${erro ? styles.selectErro : ""} ${classeTamanhoTrigger}`}
                    onClick={() => !disabled && setAberto((prev) => !prev)}
                >
                    <span className={styles.conteudoEsquerda}>
                        {icone && (
                            <span className={styles.icone} aria-hidden="true">
                                <FontAwesomeIcon icon={icone} />
                            </span>
                        )}

                        <span
                            className={
                                opcaoAtual
                                    ? styles.textoSelecionado
                                    : styles.placeholder
                            }
                        >
                            {opcaoAtual ? opcaoAtual.texto : placeholder}
                        </span>
                    </span>

                    <span
                        className={`${styles.iconeSeta} ${
                            aberto ? styles.iconeSetaAberto : ""
                        }`}
                        aria-hidden="true"
                    >
                        <FontAwesomeIcon icon={faChevronDown} />
                    </span>
                </button>

                {/* Lista do Dropdown colada e 100% alinhada embaixo */}
                {aberto && (
                    <ul
                        id={listboxId}
                        role="listbox"
                        aria-labelledby={triggerId}
                        className={styles.dropdownLista}
                    >
                        {opcoes.map((opcao) => {
                            const estaSelecionada = opcao.valor === valorAtual;

                            return (
                                <li
                                    key={opcao.valor}
                                    role="option"
                                    aria-selected={estaSelecionada}
                                    className={`${styles.opcao} ${
                                        estaSelecionada
                                            ? styles.opcaoSelecionada
                                            : ""
                                    } ${classeTamanhoOpcao}`}
                                    onClick={() =>
                                        handleSelecionar(opcao.valor)
                                    }
                                >
                                    {opcao.texto}
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>

            {erro && (
                <span id={errorId} className={styles.mensagemErro}>
                    {erro}
                </span>
            )}
        </div>
    );
};

export default Select;
