import Botao from "@/components/botao/botao";
import Card from "@/components/card/card";
import FiltroPesquisa from "@/components/filtroPesquisa/filtroPesquisa";
import Lista from "@/components/lista/lista";
import SideBar from "@/components/sideBar/sideBar";
import styles from "@/pages/usuarioPermissoes/usuarioPermissoes.module.css";
export default function UsuarioPermissoes() {
  return (
    <>
      <main className={styles.main}>
        <SideBar />
        <section className={styles.conteudo}>
          <div className={styles.container}>
            <div className={styles.containerTexto}>
              <div className={styles.texto}>
                <h1>Usuario e Permissões</h1>
                <h2>Gerenciamento de Usuário & Controle de Acesso</h2>
              </div>
              <div className={styles.containerBotao}>
                <Botao texto="Criar novo usuário" tamanho="compacto"/>
              </div>
            </div>
            <aside className={styles.cards}>
              <Card />
            </aside>
            <FiltroPesquisa/>
            <Lista page="usuarioPermissoes" />
          </div>
        </section>
      </main>
    </>
  );
}
