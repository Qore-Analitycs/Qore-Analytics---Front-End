import Card from "../card/card";
import styles from "./lista.module.css";

type ListaProps = {
  page?: string;
};

export default function Lista({ page }: ListaProps) {
  return (
    <>
      {page === "listaHistorico" && (
        <section className={styles.section}>
          <table className={styles.tabelaLista}>
            <thead id={styles.thead}>
              <tr>
                <th>ID</th>
                <th>Case de Teste</th>
                <th>Tipo</th>
                <th>Responsável</th>
                <th>Data</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody id={styles.tbody}>
                <Card page="listaHistorico"/>
                <Card page="listaHistorico"/>
                <Card page="listaHistorico"/>
                <Card page="listaHistorico"/>
                <Card page="listaHistorico"/>
                <Card page="listaHistorico"/>
                <Card page="listaHistorico"/>
            </tbody>
          </table>
        </section>
      )}
    </>
  );
}