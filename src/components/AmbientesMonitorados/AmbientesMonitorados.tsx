import React from "react";
import { Server } from "lucide-react";
import styles from "./AmbientesMonitorados.module.css";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export type VarianteStatusAmbiente = "saudavel" | "alerta" | "operacional";

export type AmbienteMonitorado = {
    id: string;
    titulo: string;
    subtitulo: string;
    statusTexto: string;
    exibirPonto?: boolean;
    detalheSecundario: string;
    variante: VarianteStatusAmbiente;
};

export type AmbientesMonitoradosProps = {
    ambientes?: AmbienteMonitorado[];
};

const AMBIENTES_PADRAO: AmbienteMonitorado[] = [
    {
        id: "prod-us-east-1",
        titulo: "Cluster Produção - us-east-1",
        subtitulo: "240 endpoints ativos",
        statusTexto: "100% Saudável",
        exibirPonto: true,
        detalheSecundario: "latência: 112ms",
        variante: "saudavel",
    },
    {
        id: "staging-sa-east-1",
        titulo: "Staging / Homologação - sa-east-1",
        subtitulo: "184 endpoints ativos",
        statusTexto: "98.8% Saudável",
        exibirPonto: false,
        detalheSecundario: "1 alerta menor",
        variante: "alerta",
    },
    {
        id: "sandbox-dev",
        titulo: "Sandbox Desenvolvedores",
        subtitulo: "96 mocks & stubs ativos",
        statusTexto: "Operacional",
        exibirPonto: true,
        detalheSecundario: "latência: 45ms",
        variante: "operacional",
    },
    {
        id: "api-gateway",
        titulo: "API Gateway / Edge - global",
        subtitulo: "32 rotas autenticadas",
        statusTexto: "100% Saudável",
        exibirPonto: true,
        detalheSecundario: "latência: 28ms",
        variante: "saudavel",
    },
    {
        id: "qa-regression",
        titulo: "Cluster Regressão E2E - us-west-2",
        subtitulo: "112 workers paralelos",
        statusTexto: "Operacional",
        exibirPonto: true,
        detalheSecundario: "latência: 84ms",
        variante: "operacional",
    },
];

const MAPA_CLASSES_BADGE: Record<VarianteStatusAmbiente, string> = {
    saudavel: styles.badgeSaudavel,
    alerta: styles.badgeAlerta,
    operacional: styles.badgeOperacional,
};

export default function AmbientesMonitorados({
    ambientes = AMBIENTES_PADRAO,
}: AmbientesMonitoradosProps) {
    return (
        <Card className={styles.cardContainer}>
            <CardHeader className={styles.cabecalho}>
                <CardTitle className={styles.titulo}>
                    Ambientes Monitorados
                </CardTitle>
                <span
                    className={styles.iconeTopoWrapper}
                    aria-hidden="true"
                    title="Infraestrutura e clusters monitorados"
                >
                    <Server size={17} />
                </span>
            </CardHeader>

            <CardContent className={styles.conteudo}>
                <ul className={styles.listaAmbientes}>
                    {ambientes.map((item) => (
                        <li key={item.id} className={styles.subCardAmbiente}>
                            <div className={styles.infoEsquerda}>
                                <h3 className={styles.tituloAmbiente}>
                                    {item.titulo}
                                </h3>
                                <span className={styles.subtituloAmbiente}>
                                    {item.subtitulo}
                                </span>
                            </div>

                            <div className={styles.infoDireita}>
                                <span
                                    className={`${styles.badgeStatus} ${
                                        MAPA_CLASSES_BADGE[item.variante]
                                    }`}
                                >
                                    {item.exibirPonto && (
                                        <span
                                            className={styles.pontoStatus}
                                            aria-hidden="true"
                                        >
                                            ●
                                        </span>
                                    )}
                                    {item.statusTexto}
                                </span>
                                <span className={styles.detalheStatus}>
                                    {item.detalheSecundario}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
}
