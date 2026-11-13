import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import styles from "./select.module.css";

export type OpcaoSelect = {
    valor: string;
    texto: string;
};

type SelectProps = {
    label?: string;
    placeholder?: string;
    opcoes?: OpcaoSelect[];
    valor?: string;
    onChange?: (novoValor: string) => void;
    disabled?: boolean;
    tamanho?: "padrao" | "compacto";
};

const Select = ({
    label,
    placeholder = "Todos os Tipos",
    opcoes = [],
    valor,
    onChange,
    disabled = false,
    tamanho = "padrao",
}: SelectProps) => {
    const [aberto, setAberto] = useState(false);
    const [valorInterno, setValorInterno] = useState("");
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Se vier controlado via props 'valor', usa ele; senão usa o estado interno
    const valorAtual = valor !== undefined ? valor : valorInterno;

    // Fecha o dropdown automaticamente se o usuário clicar fora dele
    useEffect(() => {
        const fecharAoClicarFora = (event: MouseEvent) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target as Node)
            ) {
                setAberto(false);
            }
        };

        document.addEventListener("mousedown", fecharAoClicarFora);
        return () => {
            document.removeEventListener("mousedown", fecharAoClicarFora);
        };
    }, []);

    const opcaoAtual = opcoes.find((op) => op.valor === valorAtual);

    const handleSelecionar = (novoValor: string) => {
        setValorInterno(novoValor);
        if (onChange) {
            onChange(novoValor);
        }
        setAberto(false);
    };

    const classeTamanhoTrigger =
        tamanho === "compacto" ? styles.triggerCompacto : "";
    const classeTamanhoOpcao =
        tamanho === "compacto" ? styles.opcaoCompacto : "";
    const classeTamanhoContainer =
        tamanho === "compacto" ? styles.containerCompacto : "";
    const classeTamanhoLabel =
        tamanho === "compacto" ? styles.labelCompacto : "";

    return (
        <>
            <div className={`${styles.container} ${classeTamanhoContainer}`}>
                {label && (
                    <label className={`${styles.label} ${classeTamanhoLabel}`}>
                        {label}
                    </label>
                )}

                <div className={styles.selectWrapper} ref={wrapperRef}>
                    {/* Botão principal do Select */}
                    <button
                        type="button"
                        disabled={disabled}
                        className={`${styles.selectTrigger} ${
                            aberto ? styles.selectTriggerAberto : ""
                        } ${classeTamanhoTrigger}`}
                        onClick={() => setAberto(!aberto)}
                    >
                        <span
                            className={
                                opcaoAtual
                                    ? styles.textoSelecionado
                                    : styles.placeholder
                            }
                        >
                            {opcaoAtual ? opcaoAtual.texto : placeholder}
                        </span>

                        <span
                            className={`${styles.iconeSeta} ${
                                aberto ? styles.iconeSetaAberto : ""
                            }`}
                        >
                            <FontAwesomeIcon icon={faChevronDown} />
                        </span>
                    </button>

                    {/* Lista do Dropdown colada e 100% alinhada embaixo */}
                    {aberto && (
                        <ul className={styles.dropdownLista}>
                            {opcoes.map((opcao) => {
                                const estaSelecionada =
                                    opcao.valor === valorInterno;

                                return (
                                    <li
                                        key={opcao.valor}
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
            </div>
        </>
    );
};

export default Select;
