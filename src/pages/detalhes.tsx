import React from 'react';
import Head from 'next/head';
import styles from '../styles/detalhes.module.css'; // Importação do arquivo CSS Module

export default function DetalhesPage() {
  return (
    <>
      <Head>
        <title>Detalhe do Teste - Qore Analytics</title>
      </Head>

      {/* =====================================================================
          CONTAINER PRINCIPAL DA TELA
          ===================================================================== */}
      <div className={styles.container}>

        {/* =====================================================================
            SEÇÃO 1: BARRA LATERAL ESQUERDA (SIDEBAR)
            ===================================================================== */}
        <aside className={styles.sidebar}>
          
          {/* Logo principal */}
          <div className={`${styles.blocoVermelho} ${styles.logo}`}>
            Logo
          </div>

          {/* Grupo de botões de navegação */}
          <div className={styles.navGroup}>
            <div className={`${styles.blocoVermelho} ${styles.navItem}`}></div>
            <div className={`${styles.blocoVermelho} ${styles.navItem}`}></div>
            <div className={`${styles.blocoVermelho} ${styles.navItem}`}></div>
          </div>

          {/* Imagem / Ícone de rodapé */}
          <div className={`${styles.blocoVermelho} ${styles.footerImg}`}>
            img
          </div>

        </aside>

        {/* =====================================================================
            SEÇÃO 2: ÁREA DE CONTEÚDO PRINCIPAL (DIREITA)
            ===================================================================== */}
        <main className={styles.mainContent}>

          {/* Cabeçalho do relatório e botões superiores */}
          <div className={styles.headerRow}>
            
            <div>
              <span className={styles.subtitulo}>
                Detalhe do teste
              </span>
              <h1 className={styles.titulo}>
                Relatório do fluxo completo de checkout de login
              </h1>
              <p className={styles.descricao}>
                Inspeção detalhada de telemetria visual, rastreamento de interação Playwright e validações de estado do DOM
              </p>
            </div>

            {/* Botões de Ação Superiores */}
            <div className={styles.actionButtons}>
              <div className={`${styles.blocoVermelho} ${styles.actionButton}`}></div>
              <div className={`${styles.blocoVermelho} ${styles.actionButton}`}></div>
            </div>

          </div>

          {/* Container central do player de vídeo */}
          <div className={`${styles.blocoVermelho} ${styles.videoContainer}`}>
            {/* Espaço reservado para o player de vídeo */}
          </div>

          {/* Seção inferior com dois blocos */}
          <div className={styles.gridInferior}>

            {/* Coluna Esquerda */}
            <div className={`${styles.blocoVermelho} ${styles.cardEsquerdo}`}>
              {/* Timeline de passos */}
            </div>

            {/* Coluna Direita */}
            <div className={`${styles.blocoVermelho} ${styles.cardDireito}`}>
              {/* Painel de métricas */}
            </div>

          </div>

        </main>

      </div>
    </>
  );
}