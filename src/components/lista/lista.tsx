import { useUsuario } from "@/hooks/useUsuario";
import styles from "./lista.module.css";
import { Usuario } from "@/@types/usuario";
import Item from "../item/item";
import { ProjetoService } from "@/services/projetoService";
import { useProjeto } from "@/hooks/useProjeto";

type ListaProps = {
  page?: string;
};

export default function Lista({ page }: ListaProps) {
  const { u } = useUsuario();
  const { projetos } = useProjeto();

  return (
    <>
      {page === "listaHistorico" && (
        <section className={styles.section}>
          <div className={styles.tabelaWrapper}>
            <table className={styles.tabelaLista}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th className={styles.thAlinhadoEsquerda}>Case de Teste</th>
                  <th>Tipo</th>
                  <th>Responsável</th>
                  <th>Data</th>
                  <th>Status</th>
                </tr>
              </thead>

              {/* <tbody>
                {itensHistorico.map((item) => (
                  <Item
                    key={item.id}
                    page="listaHistorico"
                    itemHistorico={item}
                  />
                ))}
              </tbody> */}
            </table>
          </div>
        </section>
      )}

      {page === "projetos" && (
        <section className={styles.section}>
          <div className={styles.tabelaWrapper}>
            <table className={styles.tabelaLista}>
              <thead>
                <tr>
                  <th className={styles.thAlinhadoEsquerda}>Projeto</th>
                  <th className={styles.thAlinhadoEsquerda}>Empresa</th>
                  <th>N Usuarios</th>
                  <th>Status</th>
                </tr>
              </thead>
              {projetos.map((projeto) => (
                <Item key={projeto.id} page="projetos" projeto={projeto} />
              ))}
              <tbody></tbody>
            </table>
          </div>
        </section>
      )}
      {page === "usuarioPermissoes" && (
        <section className={styles.section}>
          <div className={styles.tabelaWrapper}>
            <table className={styles.tabelaLista}>
              <thead>
                <tr>
                  <th className={styles.thAlinhadoEsquerda}>Usuário</th>
                  <th className={styles.thAlinhadoEsquerda}>Cargo</th>
                  <th>Empresa</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {u.map((usuario) => (
                  <Item
                    key={usuario.id}
                    page="usuarioPermissoes"
                    usuario={usuario}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </>
  );
}
