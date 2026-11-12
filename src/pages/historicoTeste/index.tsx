import Botao from "@/components/botao/botao";
import SideBar from "@/components/sideBar/sideBar";
import styles from "@/pages/historicoTeste/historicoTeste.module.css";

export default function HistoricoTeste() {
  return (
    <>
      <main className={styles.main}>
        <SideBar />
        <section className={styles.ladoDireito}>
          <div className={styles.container}>
            <div className={styles.superior}>
              <div className={styles.superiorTexto}>
                <h1>Listagem de Testes</h1>
                <h1 className={styles.titulo}>
                  Relatório do fluxo completo de checkout de login
                </h1>
                <p>
                  Inspeção detalhada de telemetria visual, rastreamento de
                  interação Playwight e validações de estado do DOM
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
        </section>
      </main>
    </>
  );
}
