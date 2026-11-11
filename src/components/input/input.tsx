import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import styles from "./input.module.css";

type BaseInputProps = {
    label?: string;
    placeholder?: string;
    icone?: IconDefinition;
    temIcone?: boolean;
    erro?: string;
    multiline?: boolean;
    rows?: number;
};

type InputProps = BaseInputProps &
    React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>;

const Input = ({
    label,
    placeholder,
    icone,
    temIcone = true,
    erro,
    multiline = false,
    rows = 4,
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
                    className={`${styles.inputWrapper} ${multiline ? styles.textareaWrapper : ""
                        } ${erro ? styles.inputErro : ""}`}
                >
                    {temIcone && icone && (
                        <span className={styles.icone}>
                            <FontAwesomeIcon icon={icone} />
                        </span>
                    )}

                    {multiline ? (
                        <textarea
                            id={id}
                            rows={rows}
                            className={`${styles.input} ${styles.textarea}`}
                            placeholder={placeholder}
                            {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
                        />
                    ) : (
                        <input
                            id={id}
                            className={styles.input}
                            placeholder={placeholder}
                            {...(rest as React.InputHTMLAttributes<HTMLInputElement>)}
                        />
                    )}
                </div>

                {erro && <span className={styles.mensagemErro}>{erro}</span>}
            </div>
        </>
    );
};

export default Input;
