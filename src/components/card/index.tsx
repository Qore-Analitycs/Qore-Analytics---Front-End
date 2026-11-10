import { transferableAbortController } from "util";
import styles from "./card.module.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Card() {
  return (
    <>
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
    </>
  );
}

