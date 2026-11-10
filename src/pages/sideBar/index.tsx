import styles from "./sideBar.module.css";

export default function SideBar() {
  return (
      <aside className={styles.sideBar}>
        <div className={styles.parteSuperior}>
          <img src="../imgs/LogoMinimalista.png" alt="" />
          <nav className={styles.navegacao}>
            <a href="" className={styles.link}>
              <i
                className="fa-solid fa-chart-line"
                style={{ color: "rgb(216, 218, 220" }}
              ></i>
              <span className={styles.span}>Painel</span>
            </a>
             <a href="" className={styles.link}>
              <i
                className="fa-solid fa-clipboard"
                style={{ color: "rgb(216, 218, 220" }}
              ></i>
              <span className={styles.span}>Painel</span>
            </a>
            <a href="" className={styles.link}>
              <i
                className="fa-solid fa-list"
                style={{ color: "rgb(216, 218, 220" }}
              ></i>
              <span className={styles.span}>Painel</span>
            </a>
            <a href="" className={styles.link}>
              <i
                className="fa-solid fa-users"
                style={{ color: "rgb(216, 218, 220" }}
              ></i>
              <span className={styles.span}>Painel</span>
            </a>
          </nav>
        </div>
        <div className={styles.containerPerfil}>
          <hr className={styles.linhaPerfil} />
          <a href="" className={styles.perfilLink}>
            <div className={styles.perfil}>
              <img src="" alt="" className={styles.avatarImg}/>
            </div>
            <div className={styles.informacoesPerfil}>
              <h1 className={styles.nomePerfil}>Marina Silva</h1>
              <h2 className={styles.cargoPerfil}>QA Lead</h2>
            </div>
          </a>
        </div>
      </aside>
  );
}
