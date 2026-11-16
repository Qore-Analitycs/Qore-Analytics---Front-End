import React from "react";
import styles from "./card.module.css";

export type VarianteCardMetrica =
    | "azul"
    | "neutro"
    | "laranja"
    | "ciano"
    | "blue"
    | "neutral"
    | "orange"
    | "cyan";

export type CardMetricaProps = {
    title?: string;
    titulo?: string;
    value?: string | number;
    valor?: string | number;
    description?: string;
    descricao?: string;
    icon?: React.ReactNode;
    icone?: React.ReactNode;
    variant?: VarianteCardMetrica;
    variante?: VarianteCardMetrica;
    className?: string;
};

const MAPA_VARIANTES: Record<string, string> = {
    azul: styles.varianteAzul,
    blue: styles.varianteAzul,
    neutro: styles.varianteNeutro,
    neutral: styles.varianteNeutro,
    laranja: styles.varianteLaranja,
    orange: styles.varianteLaranja,
    ciano: styles.varianteCiano,
    cyan: styles.varianteCiano,
};

export default function CardMetrica({
    title,
    titulo,
    value,
    valor,
    description,
    descricao,
    icon,
    icone,
    variant = "azul",
    variante,
    className = "",
}: CardMetricaProps) {
    const tituloFinal = title ?? titulo ?? "";
    const valorFinal = value ?? valor ?? "";
    const descricaoFinal = description ?? descricao ?? "";
    const iconeFinal = icon ?? icone;
    const varianteFinal = variante ?? variant;

    const classeVariante =
        MAPA_VARIANTES[varianteFinal] || styles.varianteAzul;

    return (
        /* Reutiliza estritamente o container base .card de style/const (const.css) */
        <article className={`card ${className}`.trim()}>
            <div className={styles.cardInterno}>
                {/* Lado Esquerdo: Ícone com container quadrado arredondado */}
                {iconeFinal && (
                    <div
                        className={`${styles.iconeContainer} ${classeVariante}`}
                        aria-hidden="true"
                    >
                        {iconeFinal}
                    </div>
                )}

                {/* Lado Direito: Textos e Métricas */}
                <div className={styles.infoContainer}>
                    <span className={styles.titulo}>{tituloFinal}</span>

                    <div className={styles.linhaValores}>
                        <strong className={styles.valor}>{valorFinal}</strong>
                        {descricaoFinal && (
                            <span className={styles.descricao}>
                                {descricaoFinal}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </article>
    );
}

