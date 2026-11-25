import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import "@fortawesome/fontawesome-free/css/all.min.css";

import styles from "./sideBarResponse.module.css";

import { faBars, faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ITENS_NAVEGACAO = [
  {
    id: "painel",
    label: "Painel",
    href: "/dashboard",
  },
  {
    id: "criacaoDeTeste",
    label: "Criar Teste",
    href: "/criacaoDeTeste",
  },
  {
    id: "historico",
    label: "Histórico",
    href: "/historico",
  },
  {
    id: "usuarioPermissoes",
    label: "Usuário",
    href: "/usuarioPermissoes",
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
            onClick={() => setMenuAberto((estadoAtual) => !estadoAtual)}
          >
            <FontAwesomeIcon icon={faBars} className={styles.iconeMenu} />
          </button>
        </div>

        <div className={styles.logoResponse}>
          <img src="/Logo.png" alt="" />
        </div>
      </div>

        {menuAberto && (
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
            <p className={styles.iconeAbaixoLista}>
            A
          </p>
          </div>
        // <div className={styles.barraLaranja}>
        //   <ol className={styles.listaMenu}>
        //     <li className={styles.itemMenu}>Painel</li>
        //     <li className={styles.itemMenu}>Criar Teste</li>
        //     <li className={styles.itemMenu}>Historico</li>
        //     <li className={styles.itemMenu}>Usuario</li>
        //   </ol>
        // </div>
      )}
    </>
  );
}