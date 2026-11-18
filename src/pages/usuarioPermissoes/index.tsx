import { useState } from "react";
import Head from "next/head";
import AppLayout from "@/components/layout/AppLayout";
import Botao from "@/components/botao/botao";
import Card from "@/components/card/card";
import FiltroPesquisa from "@/components/filtroPesquisa/filtroPesquisa";
import Lista from "@/components/lista/lista";
import ModalUsuario from "@/components/modalUsuario/ModalUsuario";
import styles from "./usuarioPermissoes.module.css";

export default function UsuarioPermissoes() {
  const [modalAberto, setModalAberto] = useState(false);

  return (
    <>
      <Head>
        <title>Usuário e Permissões | Qore Analytics</title>
      </Head>

      <AppLayout maxWidth="1520px">
        {/* Cabeçalho da Página com Título e Botão de Criação */}
        <header className={styles.containerTexto}>
          <div className={styles.texto}>
            <span className={styles.categoriaMenor}>Usuário e Permissões</span>
            <h1 className={styles.titulo}>
              Gerenciamento de Usuário &amp; Controle de Acesso
            </h1>
          </div>
          <div
            className={styles.containerBotao}
            onClick={() => setModalAberto(true)}
          >
            <Botao texto="Criar novo usuário" tamanho="compacto" />
          </div>
        </header>

        {/* Cards de Métricas de Membros */}
        <Card />

        {/* Filtro de Pesquisa de Usuários */}
        <FiltroPesquisa variante="usuarios" />

        {/* Listagem de Usuários e Permissões */}
        <Lista page="usuarioPermissoes" />
      </AppLayout>

      <ModalUsuario aberto={modalAberto} onFechar={() => setModalAberto(false)} />
    </>
  );
}
