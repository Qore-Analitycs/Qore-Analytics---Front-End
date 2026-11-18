import Botao from "@/components/botao/botao";
import CardsTestes from "@/components/card/card2";
import FiltroPesquisa from "@/components/filtroPesquisa/filtroPesquisa";
import Lista from "@/components/lista/lista";
import SideBar from "@/components/sideBar/sideBar";
import styles from "./historicoTeste.module.css";
import { useState } from "react";
import ModalPerfil from "@/components/ModalPerfil/ModalPerfil";

export default function HistoricoTeste() {
  const [sidebarExpandida, setSidebarExpandida] = useState(false);

  return (
    <>
      <main className={styles.main}>
        <div
          className={`${styles.layoutShell} ${
            sidebarExpandida ? styles.layoutShellExpandido : ""
          }`}
        >
          <div className={styles.sidebarContainer}>
            <SideBar
              expandida={sidebarExpandida}
              onExpandidaChange={setSidebarExpandida}
            />
          </div>
          <section className={styles.ladoDireito}>
            <div className={styles.container}>
              <div className={styles.superior}>
                <div className={styles.superiorTexto}>
                  <h1>Listagem de Testes</h1>
                  <h1 className={styles.titulo}>Histórico de Testes</h1>
                  <p>
                    Repositório unificado de auditoria, execuções automatizadas
                    (Web E2E & APIs) e rastreabilidade contínua de suítes de
                    teste.
                  </p>
                </div>
                <div className={styles.botoes}>
                  <div className={styles.containerBotao}>
                    <Botao
                      texto="Gerar Relatório"
                      tamanho="compacto"
                      variante="branco"
                    />
                  </div>
                  <div className={styles.containerBotao}>
                    <Botao texto="Nova Execução" tamanho="compacto" />
                  </div>
                </div>
              </div>
              <CardsTestes />
              <FiltroPesquisa />
              <Lista page="listaHistorico" />
            </div>
          </section>
        </div>
      </main>
      
    </>
  );
}
