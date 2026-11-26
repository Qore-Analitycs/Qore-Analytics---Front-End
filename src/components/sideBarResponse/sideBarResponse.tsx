import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import "@fortawesome/fontawesome-free/css/all.min.css";

import styles from "./sideBarResponse.module.css";

import { faBars, faCheck, faTrash, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ITENS_NAVEGACAO = [
  {
    id: "painel",
    label: "Painel",
    href: "/dashboard",
    icone: "fa-solid fa-chart-line",
  },
  {
    id: "criacaoDeTeste",
    label: "Criar Teste",
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
    label: "Usuário",
    href: "/usuarioPermissoes",
    icone: "fa-solid fa-users",
  },
];

export default function SideBarResponse() {
  const [menuAberto, setMenuAberto] = useState(false);
  const router = useRouter();

  return (
    <>
      <div className={styles.container}>
        <div className={styles.menu}>
          <button
            type="button"
            aria-label="Alternar barra"
            className={styles.botaoMenu}
            onClick={() => setMenuAberto((estadoAtual) => !estadoAtual)}
          >
            <FontAwesomeIcon icon={faBars} className={styles.iconeMenu} />
          </button>
        </div>

        <div className={styles.logoResponse}>
          <img src="/Logo.png" alt="" />
        </div>
      </div>

        <div
          className={`${styles.barraLaranja} ${
            menuAberto ? styles.barraAberta : ""
          }`}
          aria-hidden={!menuAberto}
        >
          <ol className={styles.listaMenu}>
            {ITENS_NAVEGACAO.map((item) => {
              const ehAtivo = router.pathname === item.href;

              return (
                <li key={item.id} className={styles.itemMenu}>
                  <Link
                    href={item.href}
                    tabIndex={menuAberto ? 0 : -1}
                    onClick={() => setMenuAberto(false)}
                    className={`${styles.listMenu} ${
                      ehAtivo ? styles.linkAtivo : ""
                    }`}
                  >
                    {/*Adicionei isto, este bloco que corrige a exibiçao dos icones*/}
                    <span className={styles.iconeCoberto} aria-hidden="true">
                      <i className={item.icone}/>
                    </span>

                    {/*Texto de cada opção da lista*/}
                    <span className={styles.textoMenu}>
                      {item.label}
                    </span>
                  </Link>
                  {/* <Link
                    href={item.href}
                    tabIndex={menuAberto ? 0 : -1}
                    onClick={() => setMenuAberto(false)}
                    className={`${styles.linkMenu} ${
                      ehAtivo ? styles.linkAtivo : ""
                    }`}
                  >
                    {item.label}
                  </Link> */}
                </li>
              );
            })}
          </ol>

          <button
            type="button"
            className={styles.botaoFechaMenu}
            onClick={() => setMenuAberto(false)}
            aria-label="Fechar menu"
            tabIndex={menuAberto ? 0 : -1}
            disabled={!menuAberto}
          >
          <FontAwesomeIcon
            icon={faChevronUp}
            className={styles.iconeFimMenu}
            onClick={() => setMenuAberto(false)}
          />  
          </button>
        </div>
        </>
  );
}
        {/* {menuAberto && (
          <div className={styles.barraLaranja}>
            <ol className={styles.listaMenu}>
              {ITENS_NAVEGACAO.map((item) => {
                const ehAtivo = router.pathname === item.href;

                return (
                  <li key={item.id} className={styles.itemMenu}>
                    <Link
                      href={item.href}
                      onClick={() => setMenuAberto(false)}
                      className={`${styles.linkMenu} ${
                        ehAtivo ? styles.linkAtivo : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
            </ol>
            <FontAwesomeIcon icon={faChevronUp} className={styles.iconeFimMenu} />
          </div> */}

        {/* // <div className={styles.barraLaranja}>
        //   <ol className={styles.listaMenu}>
        //     <li className={styles.itemMenu}>Painel</li>
        //     <li className={styles.itemMenu}>Criar Teste</li>
        //     <li className={styles.itemMenu}>Historico</li>
        //     <li className={styles.itemMenu}>Usuario</li>
        //   </ol>
        // </div> */}
