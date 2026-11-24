import React from "react";
import CardTeste, { CardTesteProps } from "./cardTeste";
import styles from "./card2.module.css";

export { CardTeste };
export type { CardTesteProps };

const TESTES_PADRAO: CardTesteProps[] = [
    {
        title: "Total de Testes Executados",
        value: "19.280",
        percentage: "+15%",
        comparisonText: "em relação ao último mês",
        icon: <i className="fa-solid fa-list-ul" />,
        trendIcon: <i className="fa-solid fa-arrow-trend-up" />,
        variant: "laranja",
    },
    {
        title: "Testes Aprovados",
        value: "18.140",
        percentage: "+8%",
        comparisonText: "em relação ao último mês",
        icon: <i className="fa-solid fa-check" />,
        trendIcon: <i className="fa-solid fa-arrow-trend-up" />,
        variant: "verde",
    },
    {
        title: "Falhas Detectadas",
        value: "1.140",
        percentage: "-4%",
        comparisonText: "em relação ao último mês",
        icon: <i className="fa-solid fa-bug" />,
        trendIcon: <i className="fa-solid fa-arrow-trend-down" />,
        variant: "vermelho",
    },
    {
        title: "Cobertura de Código",
        value: "94,2%",
        percentage: "+2.1%",
        comparisonText: "em relação ao último mês",
        icon: <i className="fa-solid fa-shield-halved" />,
        trendIcon: <i className="fa-solid fa-arrow-trend-up" />,
        variant: "azul",
    },
];

type CardsTestesGridProps = {
    cards?: CardTesteProps[];
    className?: string;
};

export default function CardsTestes({
    cards = TESTES_PADRAO,
    className = "",
}: CardsTestesGridProps) {
    return (
        <section
            className={`${styles.gradeCards} ${className}`.trim()}
            aria-label="Indicadores de Testes"
        >
            {cards.map((item, index) => (
                <CardTeste
                    key={`${item.title || item.titulo || "card-teste"}-${index}`}
                    {...item}
                />
            ))}
        </section>
    );
}
