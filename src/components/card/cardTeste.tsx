import React from "react";
import styles from "./cardTeste.module.css";

export type VarianteCardTeste =
    | "laranja"
    | "verde"
    | "vermelho"
    | "azul"
    | "orange"
    | "green"
    | "red"
    | "blue";

export type CardTesteProps = {
    title?: string;
    titulo?: string;
    value?: string | number;
    valor?: string | number;
    percentage?: string;
    porcentagem?: string;
    comparisonText?: string;
    textoComparacao?: string;
    icon?: React.ReactNode;
    icone?: React.ReactNode;
    trendIcon?: React.ReactNode;
    iconeTendencia?: React.ReactNode;
    variant?: VarianteCardTeste;
    variante?: VarianteCardTeste;
    className?: string;
};

const MAPA_VARIANTES: Record<string, string> = {
    laranja: styles.varianteLaranja,
    orange: styles.varianteLaranja,
    verde: styles.varianteVerde,
    green: styles.varianteVerde,
    vermelho: styles.varianteVermelho,
    red: styles.varianteVermelho,
    azul: styles.varianteAzul,
    blue: styles.varianteAzul,
};

export default function CardTeste({
    title,
    titulo,
    value,
    valor,
    percentage,
    porcentagem,
    comparisonText,
    textoComparacao,
    icon,
    icone,
    trendIcon,
    iconeTendencia,
    variant = "laranja",
    variante,
    className = "",
}: CardTesteProps) {
    const tituloFinal = title ?? titulo ?? "";
    const valorFinal = value ?? valor ?? "";
    const porcentagemFinal = percentage ?? porcentagem ?? "";
    const comparacaoFinal = comparisonText ?? textoComparacao ?? "";
    const iconeFinal = icon ?? icone;
    const iconeTendenciaFinal = trendIcon ?? iconeTendencia;
    const varianteFinal = variante ?? variant;

    const classeVariante =
        MAPA_VARIANTES[varianteFinal] || styles.varianteLaranja;

    return (
        /* Reutiliza o container base .card de style/const (const.css) */
        <article className={`card ${classeVariante} ${className}`.trim()}>
            <div className={styles.superiorCard}>
                <h3 className={styles.titulo}>{tituloFinal}</h3>

                {iconeFinal && (
                    <div className={styles.iconeCard} aria-hidden="true">
                        {iconeFinal}
                    </div>
                )}
            </div>

            <strong className={styles.valor}>{valorFinal}</strong>

            {(porcentagemFinal || comparacaoFinal) && (
                <div className={styles.parametros}>
                    {iconeTendenciaFinal && (
                        <span className={styles.iconeTendencia} aria-hidden="true">
                            {iconeTendenciaFinal}
                        </span>
                    )}
                    {porcentagemFinal && (
                        <span className={styles.porcentagem}>{porcentagemFinal}</span>
                    )}
                    {comparacaoFinal && (
                        <span className={styles.comparacao}>{comparacaoFinal}</span>
                    )}
                </div>
            )}
        </article>
    );
}