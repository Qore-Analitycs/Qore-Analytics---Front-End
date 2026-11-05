import styles from "./grupoCards.module.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

type ListaProps = {
  page?: string;
};

export default function GrupoCards({ page }: ListaProps) {
  return (
    <>
      {page === "historicoTeste"}
      <div className={styles.lista}>
        <ul className={styles.containerCard}>
          <li className={styles.card}>
            <article>
              <div className={styles.superiorCard}>
                <h1>Total de Testes Executados</h1>
                <div className={styles.iconeCard}>
                  <i
                    className="fa-solid fa-list-ul"
                    style={{ color: "rgb(232, 122, 17" }}
                  ></i>
                </div>
              </div>
              <h2 className={styles.valor}>19.280</h2>
              <div className={styles.parametros}>
                <i
                  className="fa-solid fa-arrow-trend-up"
                  style={{ color: "rgb(232, 122, 17" }}
                ></i>
                <h3>
                  <p>+15%</p> em relação ao útlimo mês
                </h3>
              </div>
            </article>
          </li>

          <li className={styles.card}>
            <article>
              <div className={styles.superiorCard}>
                <h1>Total de Testes Executados</h1>
                <div className={styles.iconeCard}>
                  <i
                    className="fa-solid fa-list-ul"
                    style={{ color: "rgb(232, 122, 17" }}
                  ></i>
                </div>
              </div>
              <h2 className={styles.valor}>19.280</h2>
              <div className={styles.parametros}>
                <i
                  className="fa-solid fa-arrow-trend-up"
                  style={{ color: "rgb(232, 122, 17" }}
                ></i>
                <h3>
                  <p>+15%</p> em relação ao útlimo mês
                </h3>
              </div>
            </article>
          </li>

          <li className={styles.card}>
            <article>
              <div className={styles.superiorCard}>
                <h1>Total de Testes Executados</h1>
                <div className={styles.iconeCard}>
                  <i
                    className="fa-solid fa-list-ul"
                    style={{ color: "rgb(232, 122, 17" }}
                  ></i>
                </div>
              </div>
              <h2 className={styles.valor}>19.280</h2>
              <div className={styles.parametros}>
                <i
                  className="fa-solid fa-arrow-trend-up"
                  style={{ color: "rgb(232, 122, 17" }}
                ></i>
                <h3>
                  <p>+15%</p> em relação ao útlimo mês
                </h3>
              </div>
            </article>
          </li>

          <li className={styles.card}>
            <article>
              <div className={styles.superiorCard}>
                <h1>Total de Testes Executados</h1>
                <div className={styles.iconeCard}>
                  <i
                    className="fa-solid fa-list-ul"
                    style={{ color: "rgb(232, 122, 17" }}
                  ></i>
                </div>
              </div>
              <h2 className={styles.valor}>19.280</h2>
              <div className={styles.parametros}>
                <i
                  className="fa-solid fa-arrow-trend-up"
                  style={{ color: "rgb(232, 122, 17" }}
                ></i>
                <h3>
                  <p>+15%</p> em relação ao útlimo mês
                </h3>
              </div>
            </article>
          </li>
        </ul>
      </div>
    </>
  );
}