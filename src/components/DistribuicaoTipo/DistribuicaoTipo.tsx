import React from "react";
import { PieChart as PieChartIcon } from "lucide-react";
import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import styles from "./DistribuicaoTipo.module.css";

export type ItemDistribuicaoTipo = {
    id: string;
    nome: string;
    percentual: number;
    cor: string;
};

export type DistribuicaoTipoProps = {
    dados?: ItemDistribuicaoTipo[];
    coberturaTotal?: string;
    rotuloCentral?: string;
};

const DADOS_PADRAO: ItemDistribuicaoTipo[] = [
    {
        id: "automatizados",
        nome: "Testes Automatizados",
        percentual: 58,
        cor: "#E87A11",
    },
    {
        id: "manuais",
        nome: "Testes manuais",
        percentual: 24,
        cor: "#2563EB",
    },
    {
        id: "aplicacao-completa",
        nome: "Testes de aplicação completa",
        percentual: 12,
        cor: "#7C3AED",
    },
    {
        id: "por-commit",
        nome: "Testes Por Commit",
        percentual: 6,
        cor: "#334155",
    },
];

type CustomTooltipProps = {
    active?: boolean;
    payload?: Array<{
        payload: ItemDistribuicaoTipo;
    }>;
};

const TooltipCustomizado = ({ active, payload }: CustomTooltipProps) => {
    if (!active || !payload || payload.length === 0) return null;

    const item = payload[0].payload;

    return (
        <div className={styles.tooltipCard}>
            <span
                className={styles.tooltipPonto}
                style={{ backgroundColor: item.cor }}
            />
            <span className={styles.tooltipNome}>{item.nome}:</span>
            <span className={styles.tooltipPercentual}>{item.percentual}%</span>
        </div>
    );
};

export default function DistribuicaoTipo({
    dados = DADOS_PADRAO,
    coberturaTotal = "100%",
    rotuloCentral = "COBERTURA",
}: DistribuicaoTipoProps) {
    const dadosGrafico = dados.map((item) => ({
        ...item,
        fill: item.cor,
    }));

    return (
        <Card className={styles.cardContainer}>
            <CardHeader className={styles.cabecalho}>
                <CardTitle className={styles.titulo}>
                    Distribuição por Tipo
                </CardTitle>
                <span
                    className={styles.iconeTopoWrapper}
                    aria-hidden="true"
                    title="Distribuição por modalidade de teste"
                >
                    <PieChartIcon size={17} />
                </span>
            </CardHeader>

            <CardContent className={styles.conteudo}>
                <div className={styles.graficoWrapper}>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={dadosGrafico}
                                dataKey="percentual"
                                nameKey="nome"
                                cx="50%"
                                cy="50%"
                                innerRadius={62}
                                outerRadius={88}
                                paddingAngle={3}
                                cornerRadius={4}
                                stroke="none"
                            />
                            <Tooltip content={<TooltipCustomizado />} />
                        </PieChart>
                    </ResponsiveContainer>

                    <div className={styles.centroRosca}>
                        <strong className={styles.valorCentro}>
                            {coberturaTotal}
                        </strong>
                        <span className={styles.rotuloCentro}>
                            {rotuloCentral}
                        </span>
                    </div>
                </div>

                <ul className={styles.listaLegenda}>
                    {dados.map((item) => (
                        <li key={item.id} className={styles.itemLegenda}>
                            <div className={styles.infoEsquerda}>
                                <span
                                    className={styles.marcadorCircular}
                                    style={{ backgroundColor: item.cor }}
                                    aria-hidden="true"
                                />
                                <span className={styles.nomeTipo}>
                                    {item.nome}
                                </span>
                            </div>
                            <strong className={styles.percentualTipo}>
                                {item.percentual}%
                            </strong>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
}

