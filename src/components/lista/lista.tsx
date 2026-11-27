import { useUsuario } from "@/hooks/useUsuario";
import Item, { ItemHistorico } from "../item/item";
import styles from "./lista.module.css";
import { Usuario } from "@/@types/usuario";
import type { ColunaTabelaProjeto, ProjetoItem } from "@/@types/projeto";
import type { ColunaTabelaEmpresa, EmpresaItem } from "@/@types/empresa";

export type ListaVariante =
  | "listaHistorico"
  | "usuarioPermissoes"
  | "projetos"
  | "empresas";

export const COLUNAS_LISTA_PROJETOS: ColunaTabelaProjeto[] = [
  { key: "projeto", label: "Projeto", align: "left" },
  { key: "empresa", label: "Empresa", align: "left" },
  { key: "nUsuarios", label: "N Ususario", align: "center" },
  { key: "status", label: "Status", align: "center" },
];

export const COLUNAS_LISTA_EMPRESAS: ColunaTabelaEmpresa[] = [
  { key: "empresa", label: "Empresa", align: "left" },
  { key: "nProjetos", label: "N Projeto", align: "center" },
  { key: "status", label: "Status", align: "center" },
];

export type ListaHistoricoProps = {
  page: "listaHistorico";
  variant?: never;
  itensHistorico?: ItemHistorico[];
  projetos?: never;
  empresas?: never;
  isLoading?: never;
  emptyMessage?: never;
  onProjetoClick?: never;
  onEmpresaClick?: never;
};

export type ListaUsuariosProps = {
  page: "usuarioPermissoes";
  variant?: never;
  usuarios?: Usuario[];
  carregando?: boolean;
  emptyMessage?: string;
  itensHistorico?: never;
  projetos?: never;
  empresas?: never;
  isLoading?: never;
  onProjetoClick?: never;
  onEmpresaClick?: never;
};

export type ListaProjetosProps = {
  page?: "projetos";
  variant?: "projetos";
  projetos: ProjetoItem[];
  isLoading?: boolean;
  emptyMessage?: string;
  onProjetoClick?: (projeto: ProjetoItem) => void;
  itensHistorico?: never;
  empresas?: never;
  onEmpresaClick?: never;
};

export type ListaEmpresasProps = {
  page?: "empresas";
  variant?: "empresas";
  empresas: EmpresaItem[];
  isLoading?: boolean;
  emptyMessage?: string;
  onEmpresaClick?: (empresa: EmpresaItem) => void;
  itensHistorico?: never;
  projetos?: never;
  onProjetoClick?: never;
};

export type ListaProps =
  | ListaHistoricoProps
  | ListaUsuariosProps
  | ListaProjetosProps
  | ListaEmpresasProps;

const ehListaProjetos = (props: ListaProps): props is ListaProjetosProps =>
  props.page === "projetos" ||
  props.variant === "projetos" ||
  ("projetos" in props && props.projetos !== undefined);

const ehListaEmpresas = (props: ListaProps): props is ListaEmpresasProps =>
  props.page === "empresas" ||
  props.variant === "empresas" ||
  ("empresas" in props && props.empresas !== undefined);

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

export default function Lista(props: ListaProps) {
  const usaHookInternoUsuarios =
    props.page === "usuarioPermissoes" && props.usuarios === undefined;

  const { u: usuariosInternos, carregando: carregandoInterno } = useUsuario({
    carregarAutomaticamente: usaHookInternoUsuarios,
    buscarPerfilLogado: false,
  });

  const listaUsuarios =
    props.page === "usuarioPermissoes" && props.usuarios !== undefined
      ? props.usuarios
      : usuariosInternos;

  const carregandoUsuarios =
    props.page === "usuarioPermissoes"
      ? props.carregando ?? (usaHookInternoUsuarios ? carregandoInterno : false)
      : false;

  const itensHistorico =
    props.page === "listaHistorico"
      ? props.itensHistorico ?? ITENS_HISTORICO_PADRAO
      : ITENS_HISTORICO_PADRAO;

  const renderizarTabelaCatalogo = ({
    colunas,
    isLoading,
    loadingMessage,
    emptyMessage,
    isEmpty,
    children,
  }: {
    colunas: readonly { key: string; label: string; align?: "left" | "center" }[];
    isLoading?: boolean;
    loadingMessage: string;
    emptyMessage: string;
    isEmpty: boolean;
    children: React.ReactNode;
  }) => (
    <section className={styles.section}>
      <div className={styles.tabelaWrapper}>
        <table className={styles.tabelaLista}>
          <thead>
            <tr>
              {colunas.map((coluna) => (
                <th
                  key={coluna.key}
                  className={
                    coluna.align === "left"
                      ? styles.thAlinhadoEsquerda
                      : undefined
                  }
                >
                  {coluna.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr className={styles.linhaEstado}>
                <td colSpan={colunas.length} className={styles.celulaEstado}>
                  {loadingMessage}
                </td>
              </tr>
            ) : isEmpty ? (
              <tr className={styles.linhaEstado}>
                <td colSpan={colunas.length} className={styles.celulaEstado}>
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              children
            )}
          </tbody>
        </table>
      </div>
    </section>
  );

  return (
    <>
      {props.page === "listaHistorico" && (
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

      {props.page === "usuarioPermissoes" && (
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
                {carregandoUsuarios ? (
                  <tr className={styles.linhaEstado}>
                    <td colSpan={4} className={styles.celulaEstado}>
                      Carregando usuários...
                    </td>
                  </tr>
                ) : listaUsuarios.length === 0 ? (
                  <tr className={styles.linhaEstado}>
                    <td colSpan={4} className={styles.celulaEstado}>
                      {props.emptyMessage ??
                        "Nenhum usuário encontrado para os filtros aplicados."}
                    </td>
                  </tr>
                ) : (
                  listaUsuarios.map((usuario) => (
                    <Item
                      key={usuario.id}
                      page="usuarioPermissoes"
                      usuario={usuario}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {ehListaProjetos(props) &&
        renderizarTabelaCatalogo({
          colunas: COLUNAS_LISTA_PROJETOS,
          isLoading: props.isLoading,
          loadingMessage: "Carregando projetos...",
          emptyMessage:
            props.emptyMessage ??
            "Nenhum projeto encontrado para os filtros selecionados.",
          isEmpty: props.projetos.length === 0,
          children: props.projetos.map((projeto) => (
            <Item
              key={projeto.id}
              page="projetos"
              itemProjeto={projeto}
              onClick={props.onProjetoClick}
            />
          )),
        })}

      {ehListaEmpresas(props) &&
        renderizarTabelaCatalogo({
          colunas: COLUNAS_LISTA_EMPRESAS,
          isLoading: props.isLoading,
          loadingMessage: "Carregando empresas...",
          emptyMessage:
            props.emptyMessage ??
            "Nenhuma empresa encontrada para os filtros selecionados.",
          isEmpty: props.empresas.length === 0,
          children: props.empresas.map((empresa) => (
            <Item
              key={empresa.id}
              page="empresas"
              itemEmpresa={empresa}
              onClick={props.onEmpresaClick}
            />
          )),
        })}
    </>
  );
}
