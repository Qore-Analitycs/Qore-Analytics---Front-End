import React from "react";
import { useRouter } from "next/router";
import styles from "./item.module.css";
import { Usuario } from "@/@types/usuario";
import type { ProjetoItem } from "@/@types/projeto";

export type ItemHistorico = {
  id: string;
  casoTeste: string;
  tipo: "Web" | "API";
  responsavel: string;
  data: string;
  status: "Sucesso" | "Falha" | "Em execução";
};

export type ItemHistoricoProps = {
  page: "listaHistorico";
  itemHistorico?: ItemHistorico;
  usuario?: never;
  itemProjeto?: never;
};

export type ItemUsuarioProps = {
  page: "usuarioPermissoes";
  usuario?: Usuario;
  itemHistorico?: never;
  itemProjeto?: never;
};

export type ItemProjetoProps = {
  page: "projetos";
  itemProjeto: ProjetoItem;
  onClick?: (projeto: ProjetoItem) => void;
  usuario?: never;
  itemHistorico?: never;
};

export type ItemProps =
  | ItemHistoricoProps
  | ItemUsuarioProps
  | ItemProjetoProps;

const MAPA_CLASSES_STATUS: Record<string, string> = {
  Sucesso: styles.badgeSucesso,
  Falha: styles.badgeFalha,
  "Em execução": styles.badgeEmExecucao,
};

/**
 * Normaliza o identificador do item (ex: "#01" -> "01") para uso seguro na URL dinâmica.
 */
const normalizarIdRota = (idBruto?: string): string => {
  if (!idBruto) return "";
  return idBruto.replace(/^#+/, "").trim();
};

const formatarCargo = (cargo: unknown): string => {
  if (!cargo) return "Não informado";
  if (typeof cargo === "object" && "nome" in cargo) {
    return String((cargo as { nome?: string }).nome || "Não informado");
  }
  return String(cargo);
};

const formatarEmpresa = (empresa?: Usuario["empresa"]): string => {
  if (!empresa) return "Empresa Matriz";
  if (typeof empresa === "object" && "nome" in empresa) {
    return empresa.nome?.trim() || "Empresa Matriz";
  }
  return String(empresa);
};

const Item = (props: ItemProps) => {
  const router = useRouter();
  const page = props.page;
  const usuario = props.page === "usuarioPermissoes" ? props.usuario : undefined;

  const dadosHistorico: ItemHistorico =
    (props.page === "listaHistorico" ? props.itemHistorico : undefined) ?? {
      id: "#01",
      casoTeste: "Teste Front-end Commit #003",
      tipo: "Web",
      responsavel: "Raphael - Dev",
      data: "20/10/2026",
      status: "Sucesso",
    };

  const classeBadgeHistorico =
    MAPA_CLASSES_STATUS[dadosHistorico.status] || styles.badgeSucesso;

  const ehListaHistorico = page === "listaHistorico";
  const idRota = ehListaHistorico ? normalizarIdRota(dadosHistorico.id) : "";
  const podeNavegarParaDetalhe = ehListaHistorico && idRota.length > 0;

  const navegarParaDetalheTeste = () => {
    if (!podeNavegarParaDetalhe) return;
    router.push(`/DetalhesTeste/${encodeURIComponent(idRota)}`);
  };

  const handleRowClick = (e: React.MouseEvent<HTMLTableRowElement>) => {
    if (!podeNavegarParaDetalhe) return;

    const alvo = e.target as HTMLElement | null;
    if (
      alvo?.closest(
        "a, button, input, select, textarea, [role='button'], [data-no-row-nav='true']",
      )
    ) {
      return;
    }

    navegarParaDetalheTeste();
  };

  const handleRowKeyDown = (e: React.KeyboardEvent<HTMLTableRowElement>) => {
    if (!podeNavegarParaDetalhe) return;

    if (e.target !== e.currentTarget) return;

    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      navegarParaDetalheTeste();
    }
  };

  return (
    <>
      {page === "listaHistorico" && (
        <tr
          className={`${styles.trCard} ${
            podeNavegarParaDetalhe ? styles.trCardClicavel : ""
          }`}
          onClick={podeNavegarParaDetalhe ? handleRowClick : undefined}
          onKeyDown={podeNavegarParaDetalhe ? handleRowKeyDown : undefined}
          tabIndex={podeNavegarParaDetalhe ? 0 : undefined}
          aria-label={
            podeNavegarParaDetalhe
              ? `Abrir detalhes do teste ${dadosHistorico.casoTeste} (${dadosHistorico.id})`
              : undefined
          }
        >
          <td className={styles.celulaId}>{dadosHistorico.id}</td>
          <td className={styles.celulaCasoTeste}>{dadosHistorico.casoTeste}</td>
          <td>
            <span className={styles.celulaTipo}>
              {dadosHistorico.tipo === "Web" ? (
                <i className={`fa-solid fa-desktop ${styles.iconeWeb}`} />
              ) : (
                <i className={`fa-solid fa-network-wired ${styles.iconeApi}`} />
              )}
              {dadosHistorico.tipo}
            </span>
          </td>
          <td className={styles.celulaResponsavel}>
            {dadosHistorico.responsavel}
          </td>
          <td className={styles.celulaData}>{dadosHistorico.data}</td>
          <td>
            <span className={`${styles.badgeStatus} ${classeBadgeHistorico}`}>
              {dadosHistorico.status}
            </span>
          </td>
        </tr>
      )}

      {page === "usuarioPermissoes" && usuario && (
        <tr className={styles.trCard}>
          <td className={styles.celulaUsuario}>
            <div className={styles.infoUsuario}>
              <span className={styles.nomeUsuario}>{usuario.nome}</span>
              {usuario.email && (
                <span className={styles.emailUsuario}>{usuario.email}</span>
              )}
            </div>
          </td>
          <td className={styles.celulaCargo}>{formatarCargo(usuario.cargo)}</td>
          <td className={styles.celulaEmpresa}>
            {formatarEmpresa(usuario.empresa)}
          </td>
          <td>
            <span
              className={`${styles.badgeStatus} ${
                usuario.ativo ? styles.badgeSucesso : styles.badgeInativo
              }`}
            >
              {usuario.ativo ? "Ativo" : "Inativo"}
            </span>
          </td>
        </tr>
      )}

      {props.page === "projetos" && (
        <tr
          className={`${styles.trCard} ${
            props.onClick ? styles.trCardClicavel : ""
          }`}
          onClick={
            props.onClick
              ? () => props.onClick?.(props.itemProjeto)
              : undefined
          }
          onKeyDown={
            props.onClick
              ? (event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    props.onClick?.(props.itemProjeto);
                  }
                }
              : undefined
          }
          tabIndex={props.onClick ? 0 : undefined}
        >
          <td className={styles.celulaProjeto}>{props.itemProjeto.projeto}</td>
          <td className={styles.celulaEmpresaTexto}>
            {props.itemProjeto.empresa}
          </td>
          <td className={styles.celulaNUsuarios}>
            {props.itemProjeto.nUsuarios}
          </td>
          <td>
            <span
              className={`${styles.badgeStatus} ${
                props.itemProjeto.status === "Ativo"
                  ? styles.badgeSucesso
                  : styles.badgeInativo
              }`}
            >
              {props.itemProjeto.status}
            </span>
          </td>
        </tr>
      )}
    </>
  );
};

export default Item;
