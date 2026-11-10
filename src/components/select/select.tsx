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
};

const Select = ({
    label,
    placeholder = "Todos os Tipos",
    opcoes = [],
    valor,
    onChange,
    disabled = false,
}: SelectProps) => {
    const [aberto, setAberto] = useState(false);
    const [valorInterno, setValorInterno] = useState(valor || "");
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Sincroniza caso o valor venha controlado de fora pela página
    useEffect(() => {
        if (valor !== undefined) {
            setValorInterno(valor);
        }
    }, [valor]);

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

    const opcaoAtual = opcoes.find((op) => op.valor === valorInterno);

    const handleSelecionar = (novoValor: string) => {
        setValorInterno(novoValor);
        if (onChange) {
            onChange(novoValor);
        }
        setAberto(false);
    };

    return (
        <>
            <div className={styles.container}>
                {label && <label className={styles.label}>{label}</label>}

                <div className={styles.selectWrapper} ref={wrapperRef}>
                    {/* Botão principal do Select */}
                    <button
                        type="button"
                        disabled={disabled}
                        className={`${styles.selectTrigger} ${
                            aberto ? styles.selectTriggerAberto : ""
                        }`}
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
                                        }`}
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
