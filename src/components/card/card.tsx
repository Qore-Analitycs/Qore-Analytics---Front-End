
import React from "react";
import { Code2, FileText, Shield, Users } from "lucide-react";

import CardMetrica, { CardMetricaProps } from "./cardMetrica";
import { useUsuario } from "@/hooks/useUsuario";
import type { Usuario } from "@/@types/usuario";

export { CardMetrica };
export type { CardMetricaProps };

type TotaisCalculados = {
    totalMembros: number;
    administradores: number;
    devsVinculados: number;
    engenheirosQa: number;
};

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

function calcularTotais(membros: Usuario[]): TotaisCalculados {
    return membros.reduce<TotaisCalculados>(
        (acc, membro) => {
            const cargo: string = String(
                membro.cargo?.nome ?? ""
            )
                .trim()
                .toUpperCase();

            acc.totalMembros++;

            if (["ADMIN", "ADMINISTRADOR"].includes(cargo)) {
                acc.administradores++;
            }

            if (["DEV", "DEVELOPER"].includes(cargo)) {
                acc.devsVinculados++;
            }

            if (["QA", "ENGENHEIRO_QA"].includes(cargo)) {
                acc.engenheirosQa++;
            }

            return acc;
        },
        {
            totalMembros: 0,
            administradores: 0,
            devsVinculados: 0,
            engenheirosQa: 0,
        }
    );
}

function montarCardsComTotais(
    totais: TotaisCalculados
): CardMetricaProps[] {
    return [
        {
            ...METRICAS_PADRAO[0],
            value: totais.totalMembros,
        },
        {
            ...METRICAS_PADRAO[1],
            value: totais.administradores,
        },
        {
            ...METRICAS_PADRAO[2],
            value: totais.devsVinculados,
        },
        {
            ...METRICAS_PADRAO[3],
            value: totais.engenheirosQa,
        },
    ];
}

type CardsMetricasGridProps = {
    cards?: CardMetricaProps[];
};

export default function Card({ cards }: CardsMetricasGridProps) {
    const { u } = useUsuario();

    const items =
        cards && cards.length > 0
            ? cards
            : montarCardsComTotais(calcularTotais(u));

    return (
        <section
            className="cards"
            aria-label="Métricas do Sistema"
        >
            {items.map((item, index) => (
                <CardMetrica
                    key={`${item.title || "card"}-${index}`}
                    {...item}
                />
            ))}
        </section>
    );
}
