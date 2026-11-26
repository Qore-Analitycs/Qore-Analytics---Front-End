import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import styles from "./sideBar.module.css";
import ModalPerfil from "../ModalPerfil/ModalPerfil";
import { UsuarioService } from "@/services/usuarioService";
import { toast } from "react-toastify";

export type SideBarProps = {
  expandida?: boolean;
  onExpandidaChange?: (expandida: boolean) => void;
  avatarUrl?: string;
  nomeUsuario?: string;
  cargoUsuario?: string;
  aberto?: boolean;
  onFechar?: () => void;
};

const ITENS_NAVEGACAO = [
  {
    id: "painel",
    label: "Painel",
    href: "/dashboard",
    icone: "fa-solid fa-chart-line",
  },
  {
    id: "criacaoDeTeste",
    label: "Criação de Teste",
    href: "/criacaoDeTeste",
    icone: "fa-solid fa-clipboard",
  },
  {
    id: "historico",
    label: "Histórico",
    href: "/historico",
    icone: "fa-solid fa-list",
  },
  {
    id: "usuarioPermissoes",
    label: "Usuário / Permissões",
    href: "/usuarioPermissoes",
    icone: "fa-solid fa-users",
  },
  {
    id: "projetos",
    label: "Projetos",
    href: "/projetos",
    icone: "fa-solid fa-diagram-project",
  },
];

const obterIniciais = (nome: string) => {
  const nomeLimpo = nome.trim();
  if (!nomeLimpo) return "QA";
  const partes = nomeLimpo.split(/\s+/);
  if (partes.length === 1) return partes[0].slice(0, 2).toUpperCase();
  return `${partes[0][0]}${partes[partes.length - 1][0]}`.toUpperCase();
};

const formatarCargo = (cargo: unknown): string => {
  if (!cargo) return "";
  if (typeof cargo === "object" && "nome" in cargo) {
    return String((cargo as { nome?: string }).nome || "");
  }
  return String(cargo);
};

export default function SideBar({
  expandida,
  onExpandidaChange,
  avatarUrl,
  nomeUsuario = "",
  cargoUsuario = "",
}: SideBarProps) {
  const router = useRouter();
  const [expandidaInterna, setExpandidaInterna] = useState(false);
  const [fixada, setFixada] = useState(false);
  const [nome, setNome] = useState<string>(nomeUsuario);
  const [cargo, setCargo] = useState<string>(cargoUsuario);
  const [pathFoto, setPathFoto] = useState<string | null>(avatarUrl || null);
  const [modalAberto, setModalAberto] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const estaExpandida = expandida !== undefined ? expandida : expandidaInterna;

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

  async function getMe() {
    try {
      setCarregando(true);
      const dados = await UsuarioService.getMe();

      setNome(dados.nome || dados.Nome || "");
      setCargo(formatarCargo(dados.cargo || dados.Cargo));
      setPathFoto(dados.pathFoto || dados.PathFoto || null);
    } catch (error) {
      console.error(error);
      toast.error("Erro ao carregar os dados do perfil.");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    getMe();
  }, []);

  const nomeExibicao = nome || (carregando ? "Carregando..." : "Usuário");
  const cargoExibicao = cargo || (carregando ? "" : "Cargo não informado");
  const fotoExibicao = pathFoto || avatarUrl;

  return (
    <>
      <aside
        className={`${styles.sideBar} ${estaExpandida ? styles.expandida : ""}`}
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

            <div className={styles.topoExpandido}>
              <span className={styles.marcaTexto}>Qore QA</span>
              <button
                type="button"
                className={styles.btnAlternar}
                onClick={handleAlternarFixacao}
                title={
                  fixada ? "Recolher barra lateral" : "Fixar barra lateral"
                }
                aria-label={
                  fixada ? "Recolher barra lateral" : "Fixar barra lateral"
                }
                aria-pressed={fixada}
              >
                {fixada ? (
                  <PanelLeftClose size={16} />
                ) : (
                  <PanelLeftOpen size={16} />
                )}
              </button>
            </div>
          </div>

          <nav className={styles.navegacao}>
            {ITENS_NAVEGACAO.map((item) => {
              const ehAtivo =
                item.href !== "#" && router.pathname === item.href;

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={(e) => {
                    if (item.href === "#") e.preventDefault();
                  }}
                  className={`${styles.link} ${
                    ehAtivo ? styles.linkAtivo : ""
                  }`}
                  title={!estaExpandida ? item.label : undefined}
                >
                  <span className={styles.iconeWrapper} aria-hidden="true">
                    <i className={item.icone} />
                  </span>
                  <span className={styles.span}>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div
          className={styles.containerPerfil}
          onClick={() => setModalAberto(true)}
        >
          <hr className={styles.linhaPerfil} />
          <a
            href="#perfil"
            onClick={(e) => e.preventDefault()}
            className={styles.perfilLink}
            title={!estaExpandida ? nomeExibicao : undefined}
          >
            <div className={styles.perfil}>
              {fotoExibicao ? (
                <img
                  src={fotoExibicao}
                  alt={nomeExibicao}
                  className={styles.avatarImg}
                />
              ) : (
                <span className={styles.avatarFallback} aria-hidden="true">
                  {obterIniciais(nome)}
                </span>
              )}
            </div>
            <div className={styles.informacoesPerfil}>
              <span className={styles.nomePerfil}>{nomeExibicao}</span>
              <span className={styles.cargoPerfil}>{cargoExibicao}</span>
            </div>
          </a>
        </div>
      </aside>
      <ModalPerfil
        aberto={modalAberto}
        onFechar={() => {
          setModalAberto(false);
          getMe();
        }}
      />
    </>
  );
}