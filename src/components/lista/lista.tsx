import { useUsuario } from "@/hooks/useUsuario";
import Card from "../card/card";
import Item from "../item/item";
import styles from "./lista.module.css";
import { Fragment } from "react/jsx-runtime";

type ListaProps = {
  page?: string;
};

export default function Lista({ page }: ListaProps) {

  const {u} = useUsuario();

  console.log("usuarios recebidos", u)

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
              {/* Linha Divisória do Cabeçalho */}
              <tr className={styles.linhaDivisoria}>
                <td colSpan={6}>
                  <div className={styles.hrDivisoria}></div>
                </td>
              </tr>

              {/* Itens com linha divisória após cada um */}
              <Item page="listaHistorico" />
              <tr className={styles.linhaDivisoria}>
                <td colSpan={6}>
                  <div className={styles.hrDivisoria}></div>
                </td>
              </tr>

              <Item page="listaHistorico" />
              <tr className={styles.linhaDivisoria}>
                <td colSpan={6}>
                  <div className={styles.hrDivisoria}></div>
                </td>
              </tr>

              <Item page="listaHistorico" />
              <tr className={styles.linhaDivisoria}>
                <td colSpan={6}>
                  <div className={styles.hrDivisoria}></div>
                </td>
              </tr>

              <Item page="listaHistorico" />
              <tr className={styles.linhaDivisoria}>
                <td colSpan={6}>
                  <div className={styles.hrDivisoria}></div>
                </td>
              </tr>

              <Item page="listaHistorico" />
              <tr className={styles.linhaDivisoria}>
                <td colSpan={6}>
                  <div className={styles.hrDivisoria}></div>
                </td>
              </tr>

              <Item page="listaHistorico" />
              <tr className={styles.linhaDivisoria}>
                <td colSpan={6}>
                  <div className={styles.hrDivisoria}></div>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      )}
      {page === "usuarioPermissoes" && (
        <section className={styles.section}>
          <table className={styles.tabelaLista}>
            <thead id={styles.thead}>
              <tr>
                <th>Usuário</th>
                <th>Cargo</th>
                <th>Empresa</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody id={styles.tbody}>
              {/* Linha Divisória do Cabeçalho */}
             <tr className={styles.linhaDivisoria}>
                <td colSpan={4}>
                  <div className={styles.hrDivisoria}></div>
                </td>
              </tr>

              {u.map((usuario) => (
                <Fragment key={usuario.id}>
                  <Item
                    page="usuarioPermissoes"
                    usuario={usuario}
                  />

                  <tr className={styles.linhaDivisoria}>
                    <td colSpan={4}>
                      <div className={styles.hrDivisoria}></div>
                    </td>
                  </tr>
                </Fragment>
              ))}

            
            </tbody>
          </table>
        </section>
      )}
    </>
  );
}
