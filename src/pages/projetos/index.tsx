import { useMemo, useState } from "react";
import Head from "next/head";
import AppLayout from "@/components/layout/AppLayout";
import Botao from "@/components/botao/botao";
import FiltroPesquisa from "@/components/filtroPesquisa/filtroPesquisa";
import Lista from "@/components/lista/lista";
// import ModalCriarProjeto from "@/components/modalCriarProjeto/ModalCriarProjeto";
import { toastSucesso } from "@/utils/toast";
// import type {
//   CriarProjetoPayload,
//   DadosFiltroProjetos,
//   OpcaoEmpresaProjeto,
//   ProjetoItem,
// } from "@/@types/projeto";
import styles from "./projetos.module.css";
import { useProjeto } from "@/hooks/useProjeto";

export default function GerenciamentoProjetos() {
  // const [projetos, setProjetos] = useState<ProjetoItem[]>(PROJETOS_INICIAIS);
  const [modalAberto, setModalAberto] = useState(false);
  // const [filtrosRascunho, setFiltrosRascunho] =
    // useState<DadosFiltroProjetos>(FILTROS_INICIAIS);
  // const [filtrosAplicados, setFiltrosAplicados] =
    // useState<DadosFiltroProjetos>(FILTROS_INICIAIS);

  const {projetos, carregandoProjetos} = useProjeto()

  // const handleCriarProjeto = (dados: CriarProjetoPayload) => {
  //   const novoProjeto: ProjetoItem = {
  //     id: `proj-${Date.now()}`,
  //     projeto: dados.projeto,
  //     empresa: dados.empresa,
  //     nUsuarios: dados.nUsuarios ?? 0,
  //     status: dados.status ?? "Ativo",
  //   };

  //   setProjetos((prev) => [novoProjeto, ...prev]);
  //   setFiltrosRascunho(FILTROS_INICIAIS);
  //   setFiltrosAplicados(FILTROS_INICIAIS);
  //   setModalAberto(false);
  //   toastSucesso(`Projeto "${dados.projeto}" criado com sucesso!`);
  // }

  return (
    <>
      <Head>
        <title>Gerenciamento de Projeto | Qore Analytics</title>
      </Head>

      <main className={modalAberto ? styles.mainBlur : undefined}>
        <AppLayout maxWidth="1520px" containerClassName={styles.container}>
          <header className={styles.cabecalho}>
            <div className={styles.cabecalhoTexto}>
              <h1 className={styles.titulo}>Gerenciamento de Projeto</h1>
            </div>

            <div className={styles.containerBotao}>
              <Botao
                texto="+ Criar novo Projeto"
                variante="laranja"
                tamanho="compacto"
                onPress={() => setModalAberto(true)}
              />
            </div>
          </header>

          <FiltroPesquisa
            variant="projetos"
            tamanho="compacto"
          />

          <Lista
            variant="projetos"
            projetos={projetos}
            emptyMessage="Nenhum projeto encontrado para os filtros aplicados."
          />
        </AppLayout>
      </main>

      {/* <ModalCriarProjeto
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
        onCreate={handleCriarProjeto}
        empresas={empresasDisponiveis}
      /> */}
    </>
  );
}
