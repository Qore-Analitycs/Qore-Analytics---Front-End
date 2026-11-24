import React from "react";
import { Code2, FileText, Shield, Users } from "lucide-react";
import CardMetrica, { CardMetricaProps } from "./cardMetrica";

export { CardMetrica };
export type { CardMetricaProps };

const METRICAS_PADRAO: CardMetricaProps[] = [
  {
    title: "TOTAL DE MEMBROS",
    value: 0,
    description: "Contas do sistema",
    icon: <Users size={22} />,
    variant: "azul",
  },
  {
    title: "ADMINISTRADORES",
    value: 0,
    description: "Acesso Irrestrito",
    icon: <Shield size={22} />,
    variant: "neutro",
  },
  {
    title: "DEVS VINCULADOS",
    value: 0,
    description: "Empresas Matriz",
    icon: <Code2 size={22} />,
    variant: "laranja",
  },
  {
    title: "ENGENHEIROS DE QA",
    value: 0,
    description: "Contas ativas",
    icon: <FileText size={22} />,
    variant: "ciano",
  },
];

type CardsMetricasGridProps = {
  cards?: CardMetricaProps[];
};

export default function Card({ cards = METRICAS_PADRAO }: CardsMetricasGridProps) {
  return (
    <section className="cards" aria-label="Métricas do Sistema">
      {cards.map((item, index) => (
        <CardMetrica
          key={`${item.title || item.titulo || "card"}-${index}`}
          {...item}
        />
      ))}
    </section>
  );
}