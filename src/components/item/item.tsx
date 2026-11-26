import React from "react";
import styles from "./item.module.css";
import { Usuario } from "@/@types/usuario";
import { Projeto } from "@/@types/projeto";


type ItemProps = {
  page?: string;
  usuario?: Usuario;
  projeto?: Projeto;
};

const formatarCargo = (cargo: unknown): string => {
  if (!cargo) return "Não informado";
  if (typeof cargo === "object" && "nome" in cargo) {
    return String((cargo as { nome?: string }).nome || "Não informado");
  }
  return String(cargo);
};

const Item = ({ page, usuario, projeto}: ItemProps) => {

  return (
    <>
        {page === "historicoTestes" && usuario && (
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
          <td className={styles.celulaEmpresa}>Empresa Matriz</td>
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
          <td className={styles.celulaEmpresa}>Empresa Matriz</td>
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
       {page === "projetos" && projeto && (
        <tr className={styles.trCard}>
          <td className={styles.celulaProjeto}>{projeto.nome}</td>
          <td className={styles.celulaEmpresaTexto}>
            {projeto.empresa}
          </td>
          <td className={styles.celulaNUsuarios}>
            {projeto.totalUsuarios ?? projeto.usuarios?.length ?? 0}
          </td>
          <td>
            <span
              className={`${styles.badgeStatus} ${
                projeto.ativo ? styles.badgeSucesso : styles.badgeInativo
              }`}
            >
              {projeto.status || (projeto.ativo ? "Ativo" : "Inativo")}
            </span>
          </td>
        </tr>
      )}
    </>
  );
};

export default Item;