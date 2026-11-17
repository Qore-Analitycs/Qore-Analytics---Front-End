import { useUsuario } from "@/hooks/useUsuario";
import styles from "./item.module.css";
import { ListarUsuario } from "@/@types/usuario";

type ItemProps = {
  page?: string;
  usuario?: ListarUsuario;
};

const Item = ({ page, usuario }: ItemProps) => {
  return (
    <>
      {page === "listaHistorico" && (
        <tr className={styles.trCard}>
          <td>#01</td>
          <td>Teste Front-end Commit #003</td>
          <td>
            <i
              className="fa-solid fa-desktop"
              style={{ color: "rgb(232, 122, 17" }}
            ></i>
            Web
          </td>
          <td>Raphael - Dev</td>
          <td>16/10/2001</td>
          <td>Sucesso</td>
        </tr>
      )}
       {page === "usuarioPermissoes" && usuario && (
        <tr className={styles.trCard}>
          <td>{usuario.nome}</td>
          <td>{usuario.cargo}</td>
          <td>Empresa</td>
          <td>{usuario.ativo ? "Ativo" : "Inativo"}</td>
        </tr>
      )}
    </>
  );
};

export default Item;
