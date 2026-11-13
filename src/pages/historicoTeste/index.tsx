import Botao from "@/components/botao/botao";
import FiltroPesquisa from "@/components/filtroPesquisa/filtroPesquisa";
import Lista from "@/components/lista/lista";
import SideBar from "@/components/sideBar/sideBar";
import styles from "@/pages/historicoTeste/historicoTeste.module.css";
import { useState } from "react";

export default function HistoricoTeste() {
  const [sidebarExpandida, setSidebarExpandida] = useState(false);

  return (
    <>
      <main className={styles.main}>
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
            <section className="cards">
              <article className="card">
                <div className="superiorCard">
                  <h1>Total de Testes Executados</h1>
                  <div className="iconeCard">
                    <i
                      className="fa-solid fa-list-ul"
                      style={{ color: "rgb(232, 122, 17" }}
                    ></i>
                  </div>
                </div>
                <h2 className="valor">19.280</h2>
                <div className="parametros">
                  <i
                    className="fa-solid fa-arrow-trend-up"
                    style={{ color: "rgb(232, 122, 17" }}
                  ></i>
                  <p>+15%</p>
                  <h3>em relação ao último mês</h3>
                </div>
              </article>
              <article className="card">
                <div className="superiorCard">
                  <h1>Total de Testes Executados</h1>
                  <div className="iconeCard">
                    <i
                      className="fa-solid fa-list-ul"
                      style={{ color: "rgb(232, 122, 17" }}
                    ></i>
                  </div>
                </div>
                <h2 className="valor">19.280</h2>
                <div className="parametros">
                  <i
                    className="fa-solid fa-arrow-trend-up"
                    style={{ color: "rgb(232, 122, 17" }}
                  ></i>
                  <p>+15%</p>
                  <h3>em relação ao último mês</h3>
                </div>
              </article>
              <article className="card">
                <div className="superiorCard">
                  <h1>Total de Testes Executados</h1>
                  <div className="iconeCard">
                    <i
                      className="fa-solid fa-list-ul"
                      style={{ color: "rgb(232, 122, 17" }}
                    ></i>
                  </div>
                </div>
                <h2 className="valor">19.280</h2>
                <div className="parametros">
                  <i
                    className="fa-solid fa-arrow-trend-up"
                    style={{ color: "rgb(232, 122, 17" }}
                  ></i>
                  <p>+15%</p>
                  <h3>em relação ao último mês</h3>
                </div>
              </article>
              <article className="card">
                <div className="superiorCard">
                  <h1>Total de Testes Executados</h1>
                  <div className="iconeCard">
                    <i
                      className="fa-solid fa-list-ul"
                      style={{ color: "rgb(232, 122, 17" }}
                    ></i>
                  </div>
                </div>
                <h2 className="valor">19.280</h2>
                <div className="parametros">
                  <i
                    className="fa-solid fa-arrow-trend-up"
                    style={{ color: "rgb(232, 122, 17" }}
                  ></i>
                  <p>+15%</p>
                  <h3>em relação ao último mês</h3>
                </div>
              </article>
            </section>
            <FiltroPesquisa />
            <Lista page="listaHistorico" />
          </div>
        </section>
      </main>
    </>
  );
}
