import { useUsuario } from "@/hooks/useUsuario";
import Item, { ItemHistorico } from "../item/item";
import styles from "./lista.module.css";
import { Fragment } from "react";

type ListaProps = {
  page?: string;
  itensHistorico?: ItemHistorico[];
};

const ITENS_HISTORICO_PADRAO: ItemHistorico[] = [
  {
    id: "#01",
    casoTeste: "Teste Front-end Commit #003",
    tipo: "Web",
    responsavel: "Raphael - Dev",
    data: "20/10/2026",
    status: "Sucesso",
  },
  {
    id: "#02",
    casoTeste: "Validação Checkout & Gateway Pix",
    tipo: "API",
    responsavel: "Allan - QA Lead",
    data: "20/10/2026",
    status: "Falha",
  },
  {
    id: "#03",
    casoTeste: "Fluxo de Autenticação JWT & Refresh Token",
    tipo: "API",
    responsavel: "Marina - QA",
    data: "19/10/2026",
    status: "Sucesso",
  },
  {
    id: "#04",
    casoTeste: "Regressão de Permissões de Acesso RBAC",
    tipo: "Web",
    responsavel: "Lucas - Dev",
    data: "19/10/2026",
    status: "Sucesso",
  },
  {
    id: "#05",
    casoTeste: "Teste de Carga /api/pedidos (10k req/s)",
    tipo: "API",
    responsavel: "Allan - QA Lead",
    data: "18/10/2026",
    status: "Sucesso",
  },
  {
    id: "#06",
    casoTeste: "Upload de Evidências em Bucket S3",
    tipo: "Web",
    responsavel: "Raphael - Dev",
    data: "18/10/2026",
    status: "Em execução",
  },
];

export default function Lista({
  page,
  itensHistorico = ITENS_HISTORICO_PADRAO,
}: ListaProps) {
  const { u } = useUsuario();

  return (
    <>
      {page === "listaHistorico" && (
        <section className={styles.section}>
          <div className={styles.tabelaWrapper}>
            <table className={styles.tabelaLista}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Case de Teste</th>
                  <th>Tipo</th>
                  <th>Responsável</th>
                  <th>Data</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {itensHistorico.map((item) => (
                  <Item
                    key={item.id}
                    page="listaHistorico"
                    itemHistorico={item}
                  />
                ))}
              </tbody>
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
                  <th>Usuário</th>
                  <th>Cargo</th>
                  <th>Empresa</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {u.map((usuario) => (
                  <Fragment key={usuario.id}>
                    <Item
                      page="usuarioPermissoes"
                      usuario={usuario}
                    />
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </>
  );
}
