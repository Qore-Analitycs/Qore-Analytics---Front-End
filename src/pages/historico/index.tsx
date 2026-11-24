import Head from "next/head";
import AppLayout from "@/components/layout/AppLayout";
import Botao from "@/components/botao/botao";
import CardsTestes from "@/components/card/card2";
import FiltroPesquisa from "@/components/filtroPesquisa/filtroPesquisa";
import Lista from "@/components/lista/lista";
import styles from "./historicoTeste.module.css";

export default function HistoricoTeste() {
  return (
    <>
      <Head>
        <title>Histórico de Testes | Qore Analytics</title>
      </Head>

      <AppLayout maxWidth="1520px" containerClassName={styles.container}>
        {/* 1. Cabeçalho Superior com Título e Ações */}
        <header className={styles.superior}>
          <div className={styles.superiorTexto}>
            <span className={styles.categoriaMenor}>Listagem de Testes</span>
            <h1 className={styles.titulo}>Histórico de Testes</h1>
            <p className={styles.descricaoPagina}>
              Repositório unificado de auditoria, execuções automatizadas
              (Web E2E &amp; APIs) e rastreabilidade contínua de suítes de teste.
            </p>
          </div>
          <div className={styles.botoes}>
            <div className={styles.containerBotao}>
              <Botao texto="Nova Execução" tamanho="compacto" />
            </div>
          </div>
        </header>

        {/* 2. Cards de Métricas de Testes (4 Colunas Fluidas) */}
        <CardsTestes />

        {/* 3. Filtro de Pesquisa (Barra 100px com campos proporcionais) */}
        <FiltroPesquisa />

        {/* 4. Tabela de Listagem de Execuções */}
        <Lista page="listaHistorico" />
      </AppLayout>
    </>
  );
}
