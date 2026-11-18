import Card from "../card/card";
import Item from "../item/item";
import styles from "./lista.module.css";

type ListaProps = {
  page?: string;
  usuarios?: any[];
};

interface Usuario {
  id: string;
  nome: string;
  email: string;
  estaAtivo: boolean;
  perfil?: {
    nome: string;
  };
}

export default function Lista({ page, usuarios = [] }: ListaProps) {
  // Se a página for a de Usuário e Permissões, exibe a tabela dinâmica
  if (page === "usuarioPermissoes") {
    return (
      <div className={styles.tabelaContainer}>
        {/* Cabeçalho */}
        <div className={styles.tabelaHeader}>
          <span>Usuário</span>
          <span>Cargo</span>
          <span>Empresa</span>
          <span>Status</span>
        </div>

        {/* Linhas vindas do Banco de Dados via API */}
        {usuarios.map((usuario) => (
          <div className={styles.tabelaLinha} key={usuario.id}>
            <span>{usuario.nome}</span>
            <span>{usuario.perfil?.nome || "Membro"}</span>
            <span>Vektor Tech</span>
            <span className={usuario.estaAtivo ? styles.ativo : styles.inativo}>
              {usuario.estaAtivo ? "Ativo" : "Inativo"}
            </span>
          </div>
        ))}

        {usuarios.length === 0 && (
          <p style={{ padding: "20px", textAlign: "center" }}>Nenhum usuário encontrado na API.</p>
        )}
      </div>
    );
  }

  return null;




  // return (
  //   <>
  //     {page === "listaHistorico" && (
  //       <section className={styles.section}>
  //         <table className={styles.tabelaLista}>
  //           <thead id={styles.thead}>
  //             <tr>
  //               <th>ID</th>
  //               <th>Case de Teste</th>
  //               <th>Tipo</th>
  //               <th>Responsável</th>
  //               <th>Data</th>
  //               <th>Status</th>
  //             </tr>
  //           </thead>

  //           <tbody id={styles.tbody}>
  //             {/* Linha Divisória do Cabeçalho */}
  //             <tr className={styles.linhaDivisoria}>
  //               <td colSpan={6}>
  //                 <div className={styles.hrDivisoria}></div>
  //               </td>
  //             </tr>

  //             {/* Itens com linha divisória após cada um */}
  //             <Item page="listaHistorico" />
  //             <tr className={styles.linhaDivisoria}>
  //               <td colSpan={6}>
  //                 <div className={styles.hrDivisoria}></div>
  //               </td>
  //             </tr>

  //             <Item page="listaHistorico" />
  //             <tr className={styles.linhaDivisoria}>
  //               <td colSpan={6}>
  //                 <div className={styles.hrDivisoria}></div>
  //               </td>
  //             </tr>

  //             <Item page="listaHistorico" />
  //             <tr className={styles.linhaDivisoria}>
  //               <td colSpan={6}>
  //                 <div className={styles.hrDivisoria}></div>
  //               </td>
  //             </tr>

  //             <Item page="listaHistorico" />
  //             <tr className={styles.linhaDivisoria}>
  //               <td colSpan={6}>
  //                 <div className={styles.hrDivisoria}></div>
  //               </td>
  //             </tr>

  //             <Item page="listaHistorico" />
  //             <tr className={styles.linhaDivisoria}>
  //               <td colSpan={6}>
  //                 <div className={styles.hrDivisoria}></div>
  //               </td>
  //             </tr>

  //             <Item page="listaHistorico" />
  //             <tr className={styles.linhaDivisoria}>
  //               <td colSpan={6}>
  //                 <div className={styles.hrDivisoria}></div>
  //               </td>
  //             </tr>
  //           </tbody>
  //         </table>
  //       </section>
  //     )}
  //     {page === "usuarioPermissoes" && (
  //       <section className={styles.section}>
  //         <table className={styles.tabelaLista}>
  //           <thead id={styles.thead}>
  //             <tr>
  //               <th>Usuário</th>
  //               <th>Cargo</th>
  //               <th>Empresa</th>
  //               <th>Status</th>
  //             </tr>
  //           </thead>

  //           <tbody id={styles.tbody}>
  //             {/* Linha Divisória do Cabeçalho */}
  //             <tr className={styles.linhaDivisoria}>
  //               <td colSpan={6}>
  //                 <div className={styles.hrDivisoria}></div>
  //               </td>
  //             </tr>

  //             {/* Itens com linha divisória após cada um */}
  //             <Item page="UsuarioPermissoes" />
  //             <tr className={styles.linhaDivisoria}>
  //               <td colSpan={6}>
  //                 <div className={styles.hrDivisoria}></div>
  //               </td>
  //             </tr>
  //             <Item page="UsuarioPermissoes" />
  //             <tr className={styles.linhaDivisoria}>
  //               <td colSpan={6}>
  //                 <div className={styles.hrDivisoria}></div>
  //               </td>
  //             </tr>
  //             <Item page="UsuarioPermissoes" />
  //             <tr className={styles.linhaDivisoria}>
  //               <td colSpan={6}>
  //                 <div className={styles.hrDivisoria}></div>
  //               </td>
  //             </tr>
  //             <Item page="UsuarioPermissoes" />
  //             <tr className={styles.linhaDivisoria}>
  //               <td colSpan={6}>
  //                 <div className={styles.hrDivisoria}></div>
  //               </td>
  //             </tr>
  //             <Item page="UsuarioPermissoes" />
  //             <tr className={styles.linhaDivisoria}>
  //               <td colSpan={6}>
  //                 <div className={styles.hrDivisoria}></div>
  //               </td>
  //             </tr>
  //             <Item page="UsuarioPermissoes" />
  //             <tr className={styles.linhaDivisoria}>
  //               <td colSpan={6}>
  //                 <div className={styles.hrDivisoria}></div>
  //               </td>
  //             </tr>
  //             <Item page="UsuarioPermissoes" />
  //             <tr className={styles.linhaDivisoria}>
  //               <td colSpan={6}>
  //                 <div className={styles.hrDivisoria}></div>
  //               </td>
  //             </tr>
  //           </tbody>
  //         </table>
  //       </section>
  //     )}
  //   </>
  // );
 }
