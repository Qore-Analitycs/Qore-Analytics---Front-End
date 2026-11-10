import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import styles from "./input.module.css";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    placeholder?: string;
    icone?: IconDefinition;
    temIcone?: boolean;
    erro?: string;
};

const Input = ({
    label,
    placeholder,
    icone,
    temIcone = true,
    erro,
    id,
    ...rest
}: InputProps) => {
    return (
        <>
            <div className={styles.container}>
                {label && (
                    <label htmlFor={id} className={styles.label}>
                        {label}
                    </label>
                )}

                <div
                    className={`${styles.inputWrapper} ${
                        erro ? styles.inputErro : ""
                    }`}
                >
                    {temIcone && icone && (
                        <span className={styles.icone}>
                            <FontAwesomeIcon icon={icone} />
                        </span>
                    )}

                    <input
                        id={id}
                        className={styles.input}
                        placeholder={placeholder}
                        {...rest}
                    />
                </div>

                {erro && <span className={styles.mensagemErro}>{erro}</span>}
            </div>
        </>
    );
};

export default Input;
