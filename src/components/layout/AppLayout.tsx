import React, { useState } from "react";
import SideBar from "@/components/sideBar/sideBar";
import styles from "./AppLayout.module.css";

export type AppLayoutProps = {
  children: React.ReactNode;
  /**
   * Largura máxima do conteúdo interno (ex: "1520px", "1200px", "100%").
   * Padrão: "1520px"
   */
  maxWidth?: string | number;
  /**
   * Classe CSS adicional aplicada à tag <main>
   */
  className?: string;
  /**
   * Classe CSS adicional aplicada ao container interno (.containerInterno)
   */
  containerClassName?: string;
  /**
   * Se true, renderiza os children diretamente dentro de <main>, sem a div containerInterno
   */
  semContainerInterno?: boolean;
  /**
   * Propriedades opcionais repassadas para a SideBar
   */
  sidebarProps?: {
    avatarUrl?: string;
    nomeUsuario?: string;
    cargoUsuario?: string;
  };
};

export default function AppLayout({
  children,
  maxWidth = "1520px",
  className = "",
  containerClassName = "",
  semContainerInterno = false,
  sidebarProps,
}: AppLayoutProps) {
  const [sidebarExpandida, setSidebarExpandida] = useState(false);

  return (
    <div
      className={`${styles.layoutShell} ${
        sidebarExpandida ? styles.layoutShellExpandido : ""
      }`}
    >
      {/* 1. Barra Lateral Fixa com estado controlado */}
      <div className={styles.sidebarContainer}>
        <SideBar
          expandida={sidebarExpandida}
          onExpandidaChange={setSidebarExpandida}
          {...sidebarProps}
        />
      </div>

      {/* 2. Container Principal Rolável com padding padronizado */}
      <main className={`${styles.conteudoPrincipal} ${className}`.trim()}>
        {semContainerInterno ? (
          children
        ) : (
          <div
            className={`${styles.containerInterno} ${containerClassName}`.trim()}
            style={maxWidth ? { maxWidth } : undefined}
          >
            {children}
          </div>
        )}
      </main>
    </div>
  );
}
