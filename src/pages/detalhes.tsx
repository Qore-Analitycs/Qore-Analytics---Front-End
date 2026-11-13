import React from 'react';
import Head from 'next/head';
import styles from '../styles/detalhes.module.css';

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
          
          {/* Logotipo principal */}
          <div className={styles.logo}>
            Logo
          </div>

          {/* Grupo de botões de navegação */}
          <div className={styles.navGroup}>
            {/* <img src="/side-clipboard.png"/>
            <img src="/side-graf.png" />
            <img src="/side-list.png" />
            <img src="/side-users.png" /> */}
            <div className={styles.navItem}></div>
            <div className={styles.navItem}></div>
            <div className={styles.navItem}></div>
          </div>

          {/* Ícone de rodapé */}
          <div className={styles.footerImg}>
            img
          </div>

        </aside>

        {/* =====================================================================
            SEÇÃO 2: ÁREA DE CONTEÚDO PRINCIPAL (DIREITA)
            ===================================================================== */}
        <main className={styles.mainContent}>

          {/* -----------------------------------------------------------------
              2.1 CABEÇALHO DO RELATÓRIO E BOTÕES DE AÇÃO SUPERIORES
              ----------------------------------------------------------------- */}
          <div className={styles.headerRow}>
            
            {/* Títulos e descrição */}
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

            {/* Botões de Ação do Topo */}
            <div className={styles.actionButtons}>
              <button type="button" className={styles.btnCompartilhar}>
                <img src="/share-nodes.png" alt="Gauge" className={styles.gaugeSmall} />
                Compartilhar
              </button>
              <button type="button" className={styles.btnVideo}>
                <img src="download.png" alt="" />
                Vídeo.(mp4)
              </button>
            </div>

          </div>

          {/* -----------------------------------------------------------------
              2.2 CONTAINER CENTRAL: PLAYER DE VÍDEO E TELEMETRIA
              ----------------------------------------------------------------- */}
          <div className={styles.videoContainer}>
            
            {/* Cabeçalho do player */}
            <div className={styles.videoHeader}>
              <div className={styles.videoHeaderLeft}>
                <span className={styles.dotOrange}></span>
                <span>Gravação Contínua da Sessão Web (00:04.8)</span>
                <span className={styles.badgeHd}>HD 1080P</span>
              </div>
              <div className={styles.videoHeaderRight}>
                <img src="/calendar.png" />
                <span>17 de Outubro 2018, 09 : 41 BRT</span>
                
              </div>
            </div>

            {/* ------------------------------------------------------------------------
            
            Barra interna de mini-métricas técnicas 

            Ficava aqui

            Talvez não precise
            
            ---------------------------------------------------------------------------*/}
            

            {/* Área de exibição do vídeo */}
            <div className={styles.videoScreen}>
              [Simulação do Replay do Teste E2E]
            </div>

          </div>

          {/* -----------------------------------------------------------------
              2.3 SEÇÃO INFERIOR: TIMELINE DE PASSOS E MÉTRICAS
              ----------------------------------------------------------------- */}
          <div className={styles.gridInferior}>

            {/* Coluna Esquerda: Timeline de Passos */}
            <div className={styles.timelineCard}>
              
              <div className={styles.timelineHeader}>
                <div className={styles.timelineTitleWrapper}>
                  <img src="/list-check.png" alt="Gauge" className={styles.gaugeLarge} />
                  <h2 className={styles.timelineTitle}>
                    Timeline de Passos &amp; Funcionalidades Avaliadas
                  </h2>
                </div>
                <span className={styles.stepsBadge}>4 de 4 passos validados</span>
              </div>

              {/* Bloco de Passo #1 */}
              <div className={styles.stepBox}>
                <div className={styles.stepHeader}>
                  <div className={styles.stepInfoLeft}>
                    <span className={styles.stepNumber}>1</span>
                    <span className={styles.stepName}>Nome do caso de teste com o que foi realizado</span>
                  </div>
                  <span className={styles.successBadge}>Sucesso</span>
                </div>

                <div className={styles.stepContentBody}>
                  {/* Thumbnail */}
                  <div className={styles.stepThumbnail}>
                    <span className={styles.thumbResolution}>1920x1080</span>
                  </div>

                  {/* Detalhes e asserções */}
                  <div className={styles.stepDetailsText}>
                    <p className={styles.actionText}>
                      <strong className={styles.actionHighlight}>Ação Executada:</strong> O app navega para tela de cadastro após executar um click no botão, HTTP 200
                    </p>

                    <div className={styles.validationsBox}>
                      <p className={styles.validationsTitle}>Validações Executadas:</p>
                      <ul className={styles.validationsList}>
                        <li className={styles.validationItem}>
                          <img src="/circle-check.png" alt="Gauge" className={styles.gaugeSmall} />
                          <span>Elemento <code className={styles.validationCode}>#checkout-form</code> visível e acessível no DOM</span>
                        </li>
                        <li className={styles.validationItem}>
                          <img src="/circle-check.png" alt="Gauge" className={styles.gaugeSmall} />
                          <span>Título da página confere com &ldquo;Checkout Seguro&rdquo;</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Coluna Direita: Painel de Métricas */}
            <div className={styles.metricsCard}>
              
              <div className={styles.metricsHeader}>
                <div className={styles.metricsTitleWrapper}>
                  <img src="/gauge.png" alt="Gauge" className={styles.gaugeMedium} />
                  <h3 className={styles.metricsTitle}>Métricas</h3>
                </div>
                <span className={styles.successBadge}>Sucesso</span>
              </div>

              {/* Métrica 1 */}
              <div className={styles.metricCardBox}>
                <span className={styles.metricCardTitle}>Taxa de Sucesso</span>
                <div className={styles.metricCardValueRow}>
                  <span className={styles.metricCardNumber}>96%</span>
                  <span style={{ color: '#168344', fontWeight: 600, fontSize: '10px' }}>( &gt; 90%)</span>
                </div>
                <div className={styles.progressBarBg}>
                  <div className={styles.progressBarFillGreen} style={{ width: '96%' }}></div>
                </div>
              </div>

              {/* Métrica 2 */}
              <div className={styles.metricCardBox}>
                <span className={styles.metricCardTitle}>Duração</span>
                <div className={styles.metricCardValueRow}>
                  <span className={styles.metricCardNumber}>4.8s</span>
                  <span style={{ color: '#168344', fontWeight: 600, fontSize: '10px' }}>( Rápido )</span>
                </div>
                <div className={styles.progressBarBg}>
                  <div className={styles.progressBarFillGreen} style={{ width: '80%' }}></div>
                </div>
              </div>

              {/* Métrica 3 */}
              <div className={styles.metricCardBox}>
                <span className={styles.metricCardTitle}>Taxa de Erro</span>
                <div className={styles.metricCardValueRow}>
                  <span className={styles.metricCardNumber}>4%</span>
                  <span style={{ color: '#C0392B', fontWeight: 600, fontSize: '10px' }}>( &lt; 10%)</span>
                </div>
                <div className={styles.progressBarBg}>
                  <div className={styles.progressBarFillRed} style={{ width: '15%' }}></div>
                </div>
              </div>

              {/* Métrica 4 */}
              <div className={styles.metricCardBox}>
                <span className={styles.metricCardTitle}>Quantidade de Requisições</span>
                <div className={styles.metricCardValueRow}>
                  <span className={styles.metricCardNumber}>37</span>
                </div>
              </div>

            </div>

          </div>

        </main>

      </div>
    </>
  );
}