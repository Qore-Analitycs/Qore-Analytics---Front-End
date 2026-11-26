import { useState } from "react";
import Head from "next/head";
import AppLayout from "@/components/layout/AppLayout";
import Botao from "@/components/botao/botao";
import Card from "@/components/card/card";
import FiltroPesquisa, {
  type DadosFiltro,
} from "@/components/filtroPesquisa/filtroPesquisa";
import type { OpcaoSelect } from "@/components/select/select";
import Lista from "@/components/lista/lista";
import ModalUsuario from "@/components/modalUsuario/ModalUsuario";
import { useUsuario } from "@/hooks/useUsuario";
import { converterFiltrosUsuarioParaApi } from "@/services/usuarioService";
import styles from "./usuarioPermissoes.module.css";

const OPCOES_EMPRESA_USUARIOS: OpcaoSelect[] = [
  { valor: "nenhuma", texto: "Nenhuma selecionada" },
  { valor: "1", texto: "Alfa Soluções" },
  { valor: "2", texto: "Beta Sistemas" },
  { valor: "3", texto: "Gama Tecnologia" },
];

export default function UsuarioPermissoes() {
  const [modalAberto, setModalAberto] = useState(false);

  const { u, carregando, filtrosAtivos, buscarUsuarios, listarU } = useUsuario({
    buscarPerfilLogado: false,
  });

  const handleBuscarUsuarios = (filtrosFormulario: DadosFiltro) => {
    const filtrosApi = converterFiltrosUsuarioParaApi(filtrosFormulario);
    void buscarUsuarios(filtrosApi);
  };

  const handleUsuarioCriado = () => {
    setModalAberto(false);
    void listarU(filtrosAtivos);
  };

  return (
    <>
      <main className={`${styles.main} ${modalAberto ? styles.mainBlur : ""}`}>
        <Head>
          <title>Usuário e Permissões | Qore Analytics</title>
        </Head>

        <AppLayout maxWidth="1520px" containerClassName={styles.container}>
          <header className={styles.containerTexto}>
            <div className={styles.texto}>
              <h1 className={styles.titulo}>Gerenciamento de Usuário</h1>
            </div>
            <div className={styles.containerBotao}>
              <Botao
                texto="Criar novo usuário"
                tamanho="compacto"
                onPress={() => setModalAberto(true)}
              />
            </div>
          </header>

          <Card />

          <FiltroPesquisa
            variante="usuarios"
            opcoesEmpresa={OPCOES_EMPRESA_USUARIOS}
            onBuscar={handleBuscarUsuarios}
          />

          <Lista
            page="usuarioPermissoes"
            usuarios={u}
            carregando={carregando}
          />
        </AppLayout>
      </main>

      <ModalUsuario
        aberto={modalAberto}
        onFechar={() => setModalAberto(false)}
        onUsuarioCriado={handleUsuarioCriado}
      />
    </>
  );
}
