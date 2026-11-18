import Botao from "@/components/botao/botao";
import Card from "@/components/card/card";
import FiltroPesquisa from "@/components/filtroPesquisa/filtroPesquisa";
import Lista from "@/components/lista/lista";
import SideBar from "@/components/sideBar/sideBar";
import styles from "@/pages/usuarioPermissoes/usuarioPermissoes.module.css";
import { useState, useEffect } from "react";

export default function UsuarioPermissoes() {
  const [sidebarExpandida, setSidebarExpandida] = useState(false);
  const [usuarios, setUsuarios] = useState([]);

  // Busca os dados da API do C# assim que a página abre
  useEffect(() => {
    async function carregarUsuarios() {
      try {
        const resposta = await fetch("http://172.16.24.23:5044/api/usuarios");
        const dados = await resposta.json();
        setUsuarios(dados);
      } catch (erro) {
        console.error("Erro ao carregar usuários:", erro);
      }
    }
    carregarUsuarios();
  }, []);

  return (
    <main className={styles.main}>
      <div
        className={`${styles.layoutShell} ${
          sidebarExpandida ? styles.layoutShellExpandido : ""
        }`}
      >
        <div className={styles.sidebarContainer}>
          <SideBar
            expandida={sidebarExpandida}
            onExpandidaChange={setSidebarExpandida}
          />
        </div>

        <section className={styles.conteudo}>
          <div className={styles.container}>
            <div className={styles.containerTexto}>
              <div className={styles.texto}>
                <h1>Usuário e Permissões</h1>
                <h2>Gerenciamento de Usuário & Controle de Acesso</h2>
              </div>
              <div className={styles.containerBotao}>
                <Botao texto="Criar novo usuário" tamanho="compacto" />
              </div>
            </div>

            <Card />
            <FiltroPesquisa variante="usuarios" />
            <Lista page="usuarioPermissoes" usuarios={usuarios} />
          </div>
        </section>
      </div> 
    </main>
  );
}