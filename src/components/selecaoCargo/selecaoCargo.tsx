import React from "react";
import styles from "./selecaoCargo.module.css";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export type VarianteSelecaoCargo =
    | "laranja"
    | "branco"
    | "orange"
    | "white";

export type TamanhoSelecaoCargo =
    | "padrao"
    | "compacto"
    | "default"
    | "compact";

export type SelecaoCargoProps = {
    text?: string;
    texto?: string;
    selected?: boolean;
    selecionado?: boolean;
    variant?: VarianteSelecaoCargo;
    variante?: VarianteSelecaoCargo;
    size?: TamanhoSelecaoCargo;
    tamanho?: TamanhoSelecaoCargo;
    icon?: React.ReactNode | IconDefinition;
    icone?: React.ReactNode | IconDefinition;
    onPress?: () => void;
    onClick?: () => void;
    className?: string;
};

const MAPA_VARIANTES: Record<string, string> = {
    laranja: styles.laranja,
    orange: styles.laranja,
    branco: styles.branco,
    white: styles.branco,
};

const MAPA_TAMANHOS: Record<string, string> = {
    padrao: "",
    default: "",
    compacto: styles.compacto,
    compact: styles.compacto,
};

function isIconDefinition(
    icone: React.ReactNode | IconDefinition
): icone is IconDefinition {
    return (
        typeof icone === "object" &&
        icone !== null &&
        "iconName" in icone &&
        "prefix" in icone
    );
}

export default function SelecaoCargo({
    text,
    texto,
    selected,
    selecionado,
    variant = "branco",
    variante,
    size = "padrao",
    tamanho,
    icon,
    icone,
    onPress,
    onClick,
    className = "",
}: SelecaoCargoProps) {
    const textoFinal = text ?? texto ?? "";
    const selecionadoFinal = selected ?? selecionado ?? false;
    const varianteFinal = variante ?? variant;
    const tamanhoFinal = tamanho ?? size;
    const iconeFinal = icon ?? icone;
    const acaoClique = onPress ?? onClick;

    const classeVariante = MAPA_VARIANTES[varianteFinal] || styles.branco;
    const classeTamanho = MAPA_TAMANHOS[tamanhoFinal] || "";
    const classeSelecionado = selecionadoFinal ? styles.selecionado : "";

    return (
        <button
            type="button"
            className={`${styles.cargo} ${classeVariante} ${classeTamanho} ${classeSelecionado} ${className}`.trim()}
            onClick={acaoClique}
            aria-pressed={selecionadoFinal}
        >
            {iconeFinal && (
                <span className={styles.icone} aria-hidden="true">
                    {isIconDefinition(iconeFinal) ? (
                        <FontAwesomeIcon icon={iconeFinal} />
                    ) : (
                        iconeFinal
                    )}
                </span>
            )}
            <span className={styles.texto}>{textoFinal}</span>
        </button>
    );
}