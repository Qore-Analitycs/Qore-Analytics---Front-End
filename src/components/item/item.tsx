import styles from "./item.module.css"

type ItemProps = {
  page?: string;
};

const Item = ({ page }: ItemProps) => {
  return (
    <>
      {page === "listaHistorico" && (
        <tr className={styles.trCard}>
          <td>#01</td>
          <td>Teste Front-end Commit #003</td>
          <td>
            <i className="fa-solid fa-desktop" style={{ color: "rgb(232, 122, 17" }}></i>
            Web
          </td>
          <td>Raphael - Dev</td>
          <td>16/10/2001</td>
          <td>Sucesso</td>
        </tr>
      )}
    </>
  );
};

export default Item;