import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import "@fortawesome/fontawesome-free/css/all.min.css";

import styles from "./sideBarResponse.module.css";

import { faBars, faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SideBarResponse() {
  const [menuAberto, setMenuAberto] = useState(false);

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

      {menuAberto && <div className={styles.barraLaranja} />}
    </>
  );
}