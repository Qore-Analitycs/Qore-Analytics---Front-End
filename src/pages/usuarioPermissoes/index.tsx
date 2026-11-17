import Botao from "@/components/botao/botao";
import Card, { CardMetrica } from "@/components/card/card";
import FiltroPesquisa from "@/components/filtroPesquisa/filtroPesquisa";
import Lista from "@/components/lista/lista";
import SideBar from "@/components/sideBar/sideBar";
import styles from "@/pages/usuarioPermissoes/usuarioPermissoes.module.css";
import { useState } from "react";

export default function UsuarioPermissoes() {
  const [sidebarExpandida, setSidebarExpandida] = useState(false);

  return (
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

        <section className={styles.conteudo}>
          <div className={styles.container}>
            <div className={styles.containerTexto}>
              <div className={styles.texto}>
                <h1>Usuário e Permissões</h1>
                <h2>Gerenciamento de Usuário & Controle de Acesso</h2>
              </div>
              <div className={styles.containerBotao}>
                <Botao texto="Criar novo usuário" tamanho="compacto" />
              </div>
            </div>
            <aside className={styles.cards}>
              <Card />
            </aside>
            <FiltroPesquisa
              variante="usuarios" />
            <Lista page="usuarioPermissoes" />
          </div>
        </section>
      </div> 
    </main>
  );
}