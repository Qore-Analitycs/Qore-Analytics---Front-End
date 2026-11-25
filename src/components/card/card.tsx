import React from "react";
import { Code2, FileText, Shield, Users } from "lucide-react";

import CardMetrica, { CardMetricaProps } from "./cardMetrica";
import { useCardParametros } from "@/hooks/useCardParametros";

export { CardMetrica };
export type { CardMetricaProps };

export default function Card() {

    const {
        totalMembros,
        totalAdministradores,
        totalDevs,
        totalQA
    } = useCardParametros();

    const metricas: CardMetricaProps[] = [
        {
            title: "TOTAL DE MEMBROS",
            value: totalMembros,
            description: "Contas do sistema",
            icon: <Users size={22} />,
            variant: "azul",
        },
        {
            title: "ADMINISTRADORES",
            value: totalAdministradores,
            description: "Acesso Irrestrito",
            icon: <Shield size={22} />,
            variant: "neutro",
        },
        {
            title: "DEVS VINCULADOS",
            value: totalDevs,
            description: "Empresas Matriz",
            icon: <Code2 size={22} />,
            variant: "laranja",
        },
        {
            title: "ENGENHEIROS DE QA",
            value: totalQA,
            description: "Contas ativas",
            icon: <FileText size={22} />,
            variant: "ciano",
        },
    ];

    return (
        <section className="cards" aria-label="Métricas do Sistema">
            {metricas.map((item) => (
                <CardMetrica
                    key={item.title}
                    {...item}
                />
            ))}
        </section>
    );
}