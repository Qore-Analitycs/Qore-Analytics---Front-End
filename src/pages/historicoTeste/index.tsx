import Lista from "@/components/lista/lista";
import styles from "./historicoTeste.module.css";
import GrupoCards from "@/components/grupoCards/grupoCards";

export default function HistoricoTeste() {
  return (
    <>
      <main className={styles.main}>
        <h1>Listagem de testes</h1>
        <div className={styles.superior}>
          <div className={styles.textos}>
            <h2>Histórico de Testes</h2>
            <p>
              Repositório unificado de auditoria, execuções automatizadas (Web
              E2E & APIs) e rastreabilidade contínua de suítes de teste.
            </p>
          </div>
          <div className={styles.botoes}>
            <button className={`${styles.botaoHistorico} ${styles.btnGerar}`}>
              Gerar Relatório
            </button>
            <button
              className={`${styles.botaoHistorico} ${styles.btnExecutar}`}
            >
              Nova Execução
            </button>
          </div>
        </div>
        <section className={styles.cards}>
          <GrupoCards page="historicoTeste" />
        </section>
        <section className={styles.containerFiltro}>
          <div className={styles.filtro}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <button></button>
          </div>
        </section>
        <section>
          <Lista page="listaHistorico" />
        </section>
      </main>
    </>
  );
}