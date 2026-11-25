import { useUsuario } from "@/hooks/useUsuario";
import Item, { ItemHistorico } from "../item/item";
import styles from "./lista.module.css";
import { Usuario } from "@/@types/usuario";

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

const USUARIOS_PADRAO: Usuario[] = [
  {
    id: "usr-1",
    nome: "Marina Silva",
    email: "marina.silva@qore.io",
    cargo: { id: 1, nome: "QA Lead" },
    ativo: true,
    imagem: "",
  },
  {
    id: "usr-2",
    nome: "Allan Barbosa",
    email: "allan.barbosa@qore.io",
    cargo: { id: 2, nome: "Tech Lead" },
    ativo: true,
    imagem: "",
  },
  {
    id: "usr-3",
    nome: "Raphael Oliveira",
    email: "raphael.dev@qore.io",
    cargo: { id: 3, nome: "Desenvolvedor" },
    ativo: true,
    imagem: "",
  },
  {
    id: "usr-4",
    nome: "Lucas Andrade",
    email: "lucas.andrade@qore.io",
    cargo: { id: 4, nome: "Engenheiro de QA" },
    ativo: true,
    imagem: "",
  },
  {
    id: "usr-5",
    nome: "Beatriz Santos",
    email: "beatriz.santos@qore.io",
    cargo: { id: 3, nome: "Desenvolvedor" },
    ativo: false,
    imagem: "",
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
                  <th className={styles.thAlinhadoEsquerda}>Case de Teste</th>
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
