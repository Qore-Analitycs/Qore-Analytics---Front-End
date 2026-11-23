
import React from 'react';
import Head from 'next/head';
import styles from './detalhes.module.css';

import SideBar from "../../components/sideBar/sideBar";
// Componente responsável por renderizar os ícones
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faShareNodes, faDownload, faCalendar, faListCheck, faCircleCheck, faGaugeSimpleHigh, faImage } from '@fortawesome/free-solid-svg-icons';



export default function DetalhesPage() {

  return (

    <>

      <Head>
        <title>Detalhe do Teste - Qore Analytics</title>
      </Head>

      {/* ==========================================
          CONTAINER PRINCIPAL
      ========================================== */}

      <div className={styles.container}>

        {/* ==========================================
           BARRA LATERAL
        ========================================== */}
      <div className={styles.sideBarResponsa}  ><SideBar/></div>
      
        


        {/* ==========================================
             CONTEÚDO PRINCIPAL
        ========================================== */}

        <main className={styles.mainContent}>


          {/* ==========================================
               HEADER
          ========================================== */}

          <div className={styles.headerRow}>

            <div>

              <span className={styles.subtitulo}>
                Detalhe do teste
              </span>

              <h1 className={styles.titulo}>
                Relatório do fluxo completo de checkout de login
              </h1>

              <p className={styles.descricao}>
                Inspeção detalhada de telemetria visual, rastreamento
                de interação Playwright e validações de estado do DOM
              </p>

            </div>


            {/* Botões de cima*/}

            <div className={styles.actionButtons}>

              <button type="button" className={styles.btnCompartilhar}>

                <FontAwesomeIcon
                  icon={faShareNodes}
                  className={styles.gaugeSmall}
                  aria-hidden="true"
                />

                Compartilhar

              </button>


              <button type="button" className={styles.btnVideo}>

                <FontAwesomeIcon
                  icon={faDownload}
                  className={styles.gaugeSmall}
                  aria-hidden="true"
                />

                Vídeo.(mp4)

              </button>

            </div>

          </div>


          {/* ==========================================
                PLAYER DE VÍDEO
          ========================================== */}

          <div className={styles.videoContainer}>

            {/* Cabeçalho do player */}

            <div className={styles.videoHeader}>

              <div className={styles.videoHeaderLeft}>

                <span className={styles.dotOrange}></span>

                <span>
                  Gravação Contínua da Sessão Web (00:04.8)
                </span>

                <span className={styles.badgeHd}>
                  HD 1080P
                </span>

              </div>


              <div className={styles.videoHeaderRight}>

                <FontAwesomeIcon
                  icon={faCalendar}
                  className={styles.gaugeSmall}
                  style={{ color: '#526783' }}
                  aria-hidden="true"
                />

                <span>
                  17 de Outubro 2018, 09 : 41 BRT
                </span>

              </div>

            </div>


            {/* Área pra ver vídeo */}

            <div className={styles.videoScreen}>
              [Simulação do Replay do Teste E2E]
            </div>

          </div>


          {/* ==========================================
              Linha do tempo e metricas
          ========================================== */}

          <div className={styles.gridInferior}>


            {/* ==========================================
                COLUNA ESQUERDA: linha do tempo
            ========================================== */}

            <div className={styles.timelineCard}>

              <div className={styles.timelineHeader}>

                <div className={styles.timelineTitleWrapper}>

                  <FontAwesomeIcon
                    icon={faListCheck}
                    className={styles.gaugeLarge}
                    style={{ color: '#F28C16' }}
                    aria-hidden="true"
                  />

                  <h2 className={styles.timelineTitle}>
                    Timeline de Passos &amp; Funcionalidades Avaliadas
                  </h2>

                </div>

                <span className={styles.stepsBadge}>
                  4 de 4 passos validados
                </span>

              </div>



              <div className={styles.stepBox}>

                <div className={styles.stepHeader}>

                  <div className={styles.stepInfoLeft}>

                    <span className={styles.stepNumber}>
                      1
                    </span>

                    <span className={styles.stepName}>
                      Nome do caso de teste com o que foi realizado
                    </span>

                  </div>

                  <span className={styles.successBadge}>
                    Sucesso
                  </span>

                </div>


                {/* Miniatura do teste */}

                <div className={styles.stepContentBody}>

                  <div
                    className={styles.stepThumbnail}
                    style={{
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >

                    <FontAwesomeIcon
                      icon={faImage}
                      style={{
                        fontSize: '32px',
                        color: '#888888'
                      }}
                      aria-hidden="true"
                    />

                    <span className={styles.thumbResolution}>
                      1920x1080
                    </span>

                  </div>


                  {/* Detalhes e validações */}

                  <div className={styles.stepDetailsText}>

                    <p className={styles.actionText}>

                      <strong className={styles.actionHighlight}>
                        Ação Executada:
                      </strong>

                      {' '}O app navega para tela de cadastro após executar
                      um click no botão, HTTP 200

                    </p>


                    <div className={styles.validationsBox}>

                      <p className={styles.validationsTitle}>
                        Validações Executadas:
                      </p>


                      <ul className={styles.validationsList}>

                        <li className={styles.validationItem}>

                          <FontAwesomeIcon
                            icon={faCircleCheck}
                            className={styles.gaugeSmall}
                            style={{ color: '#00B889' }}
                            aria-hidden="true"
                          />

                          <span>
                            Elemento
                            {' '}
                            <code className={styles.validationCode}>
                              #checkout-form
                            </code>
                            {' '}visível e acessível no DOM
                          </span>

                        </li>


                        <li className={styles.validationItem}>

                          <FontAwesomeIcon
                            icon={faCircleCheck}
                            className={styles.gaugeSmall}
                            style={{ color: '#00B889' }}
                            aria-hidden="true"
                          />

                          <span>
                            Título da página confere com
                            {' '}“Checkout Seguro”
                          </span>

                        </li>

                      </ul>

                    </div>

                  </div>

                </div>

              </div>

            </div>



            {/* ==========================================
                COLUNA DIREITA: MÉTRICAS
            ========================================== */}

            <div className={styles.metricsCard}>

              <div className={styles.metricsHeader}>

                <div className={styles.metricsTitleWrapper}>

                  <FontAwesomeIcon
                    icon={faGaugeSimpleHigh}
                    className={styles.gaugeMedium}
                    style={{ color: '#F28C16' }}
                    aria-hidden="true"
                  />

                  <h3 className={styles.metricsTitle}>
                    Métricas
                  </h3>

                </div>

                <span className={styles.successBadge}>
                  Sucesso
                </span>

              </div>


           

              <div className={styles.metricCardBox}>

                <span className={styles.metricCardTitle}>
                  Taxa de Sucesso
                </span>

                <div className={styles.metricCardValueRow}>

                  <span className={styles.metricCardNumber}>
                    96%
                  </span>

                  <span style={{
                    color: '#168344',
                    fontWeight: 600,
                    fontSize: '10px'
                  }}>
                    ( &gt; 90%)
                  </span>

                </div>

                <div className={styles.progressBarBg}>

                  <div
                    className={styles.progressBarFillGreen}
                    style={{ width: '96%' }}
                  ></div>

                </div>

              </div>



  

              <div className={styles.metricCardBox}>

                <span className={styles.metricCardTitle}>
                  Duração
                </span>

                <div className={styles.metricCardValueRow}>

                  <span className={styles.metricCardNumber}>
                    4.8s
                  </span>

                  <span style={{
                    color: '#168344',
                    fontWeight: 600,
                    fontSize: '10px'
                  }}>
                    ( Rápido )
                  </span>

                </div>

                <div className={styles.progressBarBg}>

                  <div
                    className={styles.progressBarFillGreen}
                    style={{ width: '80%' }}
                  ></div>

                </div>

              </div>



      

              <div className={styles.metricCardBox}>

                <span className={styles.metricCardTitle}>
                  Taxa de Erro
                </span>

                <div className={styles.metricCardValueRow}>

                  <span className={styles.metricCardNumber}>
                    4%
                  </span>

                  <span style={{
                    color: '#C0392B',
                    fontWeight: 600,
                    fontSize: '10px'
                  }}>
                    ( &lt; 10%)
                  </span>

                </div>

                <div className={styles.progressBarBg}>

                  <div
                    className={styles.progressBarFillRed}
                    style={{ width: '15%' }}
                  ></div>

                </div>

              </div>





              <div className={styles.metricCardBox}>

                <span className={styles.metricCardTitle}>
                  Quantidade de Requisições
                </span>

                <div className={styles.metricCardValueRow}>

                  <span className={styles.metricCardNumber}>
                    37
                  </span>

                </div>

              </div>

            </div>

          </div>

        </main>

      </div>

    </>

  );

}
