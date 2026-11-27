import { useMemo, useState } from "react";
import Head from "next/head";
import AppLayout from "@/components/layout/AppLayout";
import Botao from "@/components/botao/botao";
import FiltroPesquisa from "@/components/filtroPesquisa/filtroPesquisa";
import styles from "./projetos.module.css";
import Lista from "@/components/lista/lista";
import ModalCriarProjetoConteudo from "@/components/modalCriarProjeto/ModalCriarProjeto";

export default function GerenciamentoProjetos() {
  const [modalAberto, setModalAberto] = useState(false);

  return (
    <>
      <Head>
        <title>Gerenciamento de Projeto | Qore Analytics</title>
      </Head>

      <main className={modalAberto ? styles.mainBlur : undefined}>
        <AppLayout maxWidth="1520px" containerClassName={styles.container}>
          <header className={styles.cabecalho}>
            <div className={styles.cabecalhoTexto}>
              <h1 className={styles.titulo}>Gerenciamento de Projeto</h1>
            </div>

            <div className={styles.containerBotao}>
              <Botao
                texto="+ Criar novo Projeto"
                variante="laranja"
                tamanho="compacto"
                onPress={() => setModalAberto(true)}
              />
            </div>
          </header>

          <FiltroPesquisa variant="projetos" tamanho="compacto" />

          <Lista page="projetos" />
        </AppLayout>
      </main>

      <ModalCriarProjetoConteudo
        aberto={modalAberto}
        onFechar={() => setModalAberto(false)}
      />
    </>
  );
}
