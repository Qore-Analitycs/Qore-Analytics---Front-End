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

type BotaoProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    page?: string;
    texto?: string;
    variante?: BotaoVariante;
    icone?: IconDefinition;
    onPress?: () => void;
};

const Botao = ({
    page,
    texto,
    variante = "laranja",
    icone,
    onPress,
    onClick,
    children,
    ...rest
}: BotaoProps) => {
    const router = useRouter();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (onPress) onPress();
        if (onClick) onClick(e);
        if (page) router.push(page);
    };

    return (
        <>
            <div className={styles.container}>
                <button
                    className={`${styles.botao} ${styles[variante]}`}
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