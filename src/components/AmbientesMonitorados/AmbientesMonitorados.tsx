import React from "react";
import { Server } from "lucide-react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import styles from "./AmbientesMonitorados.module.css";

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
    limite?: number;
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
        id: "gateway-us-east-2",
        titulo: "Gateway Pagamentos - us-east-2",
        subtitulo: "62 endpoints ativos",
        statusTexto: "100% Saudável",
        exibirPonto: true,
        detalheSecundario: "latência: 88ms",
        variante: "saudavel",
    },
    {
        id: "auth-sa-east-1",
        titulo: "Cluster Autenticação & SSO",
        subtitulo: "48 endpoints ativos",
        statusTexto: "Operacional",
        exibirPonto: true,
        detalheSecundario: "latência: 54ms",
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
    limite = 5,
}: AmbientesMonitoradosProps) {
    const listaExibida = limite ? ambientes.slice(0, limite) : ambientes;

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
                    {listaExibida.map((ambiente) => {
                        const classeBadge =
                            MAPA_CLASSES_BADGE[ambiente.variante] ||
                            styles.badgeOperacional;

                        return (
                            <li
                                key={ambiente.id}
                                className={styles.subCardAmbiente}
                            >
                                <div className={styles.infoEsquerda}>
                                    <h4 className={styles.tituloAmbiente}>
                                        {ambiente.titulo}
                                    </h4>
                                    <p className={styles.subtituloAmbiente}>
                                        {ambiente.subtitulo}
                                    </p>
                                </div>

                                <div className={styles.infoDireita}>
                                    <span
                                        className={`${styles.badgeStatus} ${classeBadge}`}
                                    >
                                        {ambiente.exibirPonto && (
                                            <span
                                                className={styles.pontoStatus}
                                                aria-hidden="true"
                                            >
                                                ●
                                            </span>
                                        )}
                                        <span>{ambiente.statusTexto}</span>
                                    </span>

                                    <span className={styles.detalheStatus}>
                                        {ambiente.detalheSecundario}
                                    </span>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </CardContent>
        </Card>
    );
}
