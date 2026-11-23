import React, { useMemo } from "react";
import { Code2, FileText, Shield, Users } from "lucide-react";
import CardMetrica, { CardMetricaProps } from "./cardMetrica";
import { useUsuario } from "@/hooks/useUsuario";

export { CardMetrica };
export type { CardMetricaProps };

type MembroApi = {
    id: string | number;
    cargo?: string;
};

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

function calcularTotais(membros: MembroApi[]): TotaisCalculados {
    return membros.reduce<TotaisCalculados>(
        (acc, membro) => {
            const cargo = (membro.cargo ?? "").toUpperCase();

            acc.totalMembros += 1;

            if (cargo === "ADMIN" || cargo === "ADMINISTRADOR") {
                acc.administradores += 1;
            }

            if (cargo === "DEV" || cargo === "DEVELOPER") {
                acc.devsVinculados += 1;
            }

            if (cargo === "QA" || cargo === "ENGENHEIRO_QA") {
                acc.engenheirosQa += 1;
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

function montarCardsComTotais(totais: TotaisCalculados): CardMetricaProps[] {
    return [
        { ...METRICAS_PADRAO[0], value: totais.totalMembros },
        { ...METRICAS_PADRAO[1], value: totais.administradores },
        { ...METRICAS_PADRAO[2], value: totais.devsVinculados },
        { ...METRICAS_PADRAO[3], value: totais.engenheirosQa },
    ];
}

type CardsMetricasGridProps = {
    cards?: CardMetricaProps[];
};

export default function Card({ cards }: CardsMetricasGridProps) {
    const { u } = useUsuario();

    const items = useMemo(() => {
        if (cards) return cards;
        if (!Array.isArray(u) || u.length === 0) {
            return METRICAS_PADRAO;
        }
        const totais = calcularTotais(u);
        return montarCardsComTotais(totais);
    }, [cards, u]);

    return (
        <section className="cards" aria-label="Métricas do Sistema">
            {items.map((item, index) => (
                <CardMetrica
                    key={`${item.title || item.titulo || "card"}-${index}`}
                    {...item}
                />
            ))}
        </section>
    );
}