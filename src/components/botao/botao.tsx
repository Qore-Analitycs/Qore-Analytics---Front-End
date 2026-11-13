import React from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import styles from "./botao.module.css";

export type BotaoVariante =
    | "laranja"
    | "branco"
    | "cancelar"
    | "assinar"
    | "alternativo"
    | "verde"
    | "vermelho";

export type BotaoTamanho = "padrao" | "compacto";

type BotaoProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    page?: string;
    texto?: string;
    variante?: BotaoVariante;
    tamanho?: BotaoTamanho;
    icone?: IconDefinition;
    onPress?: () => void;
};

const Botao = ({
    page,
    texto,
    variante = "laranja",
    tamanho = "padrao",
    icone,
    onPress,
    onClick,
    children,
    className,
    ...rest
}: BotaoProps) => {
    const router = useRouter();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (onPress) onPress();
        if (onClick) onClick(e);
        if (page) router.push(page);
    };

    const classeTamanho = tamanho === "compacto" ? styles.compacto : "";

    return (
        <>
            <div className={styles.container}>
                <button
                    className={`${styles.botao} ${styles[variante]} ${classeTamanho} ${className || ""}`}
                    onClick={handleClick}
                    {...rest}
                >
                    {icone && (
                        <span className={styles.icone}>
                            <FontAwesomeIcon icon={icone} />
                        </span>
                    )}
                    <span>{texto || children || "Entrar"}</span>
                </button>
            </div>
        </>
    );
};

export default Botao;