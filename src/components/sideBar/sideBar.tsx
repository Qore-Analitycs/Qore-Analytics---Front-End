import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import styles from "./sideBar.module.css";

export type SideBarProps = {
    expandida?: boolean;
    onExpandidaChange?: (expandida: boolean) => void;
    avatarUrl?: string;
    nomeUsuario?: string;
    cargoUsuario?: string;
};

const ITENS_NAVEGACAO = [
    {
        id: "painel",
        label: "Painel",
        href: "#",
        icone: "fa-solid fa-chart-line",
    },
    {
        id: "criacao-teste",
        label: "Criação de Teste",
        href: "/criacaoTeste",
        icone: "fa-solid fa-clipboard",
    },
    {
        id: "historico",
        label: "Histórico",
        href: "#",
        icone: "fa-solid fa-list",
    },
    {
        id: "usuarios",
        label: "Usuários",
        href: "#",
        icone: "fa-solid fa-users",
    },
];

const obterIniciais = (nome: string) => {
    const partes = nome.trim().split(/\s+/);
    if (partes.length === 0) return "QA";
    if (partes.length === 1) return partes[0].slice(0, 2).toUpperCase();
    return `${partes[0][0]}${partes[partes.length - 1][0]}`.toUpperCase();
};

export default function SideBar({
    expandida,
    onExpandidaChange,
    avatarUrl,
    nomeUsuario = "Marina Silva",
    cargoUsuario = "QA Lead",
}: SideBarProps) {
    const router = useRouter();
    const [expandidaInterna, setExpandidaInterna] = useState(false);
    const [fixada, setFixada] = useState(false);

    const estaExpandida =
        expandida !== undefined ? expandida : expandidaInterna;

    const definirExpandida = (novoValor: boolean) => {
        if (expandida === undefined) {
            setExpandidaInterna(novoValor);
        }
        onExpandidaChange?.(novoValor);
    };

    const handleMouseEnter = () => {
        if (!fixada) {
            definirExpandida(true);
        }
    };

    const handleMouseLeave = () => {
        if (!fixada) {
            definirExpandida(false);
        }
    };

    const handleAlternarFixacao = () => {
        const proximoEstado = !estaExpandida;
        setFixada(proximoEstado);
        definirExpandida(proximoEstado);
    };

    return (
        <aside
            className={`${styles.sideBar} ${estaExpandida ? styles.expandida : ""
                }`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            aria-label="Barra lateral de navegação"
        >
            <div className={styles.parteSuperior}>
                <div className={styles.topoCabecalho}>
                    <div className={styles.logoContainer}>
                        <img
                            src="/imgs/LogoMinimalista.png"
                            alt="Qore Analytics"
                            className={styles.logoImg}
                        />
                    </div>

                </div>

                <nav className={styles.navegacao}>
                    {ITENS_NAVEGACAO.map((item) => {
                        const ehAtivo =
                            item.href !== "#" &&
                            router.pathname === item.href;

                        return (
                            <Link
                                key={item.id}
                                href={item.href}
                                onClick={(e) => {
                                    if (item.href === "#") e.preventDefault();
                                }}
                                className={`${styles.link} ${ehAtivo ? styles.linkAtivo : ""
                                    }`}
                                title={!estaExpandida ? item.label : undefined}
                            >
                                <span
                                    className={styles.iconeWrapper}
                                    aria-hidden="true"
                                >
                                    <i className={item.icone} />
                                </span>
                                <span className={styles.span}>
                                    {item.label}
                                </span>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className={styles.containerPerfil}>
                <hr className={styles.linhaPerfil} />
                <a
                    href="#perfil"
                    onClick={(e) => e.preventDefault()}
                    className={styles.perfilLink}
                    title={!estaExpandida ? nomeUsuario : undefined}
                >
                    <div className={styles.perfil}>
                        {avatarUrl ? (
                            <img
                                src={avatarUrl}
                                alt={nomeUsuario}
                                className={styles.avatarImg}
                            />
                        ) : (
                            <span
                                className={styles.avatarFallback}
                                aria-hidden="true"
                            >
                                {obterIniciais(nomeUsuario)}
                            </span>
                        )}
                    </div>
                    <div className={styles.informacoesPerfil}>
                        <span className={styles.nomePerfil}>{nomeUsuario}</span>
                        <span className={styles.cargoPerfil}>
                            {cargoUsuario}
                        </span>
                    </div>
                </a>
            </div>
        </aside>
    );
}
