import { useMemo, useState } from "react";
import Head from "next/head";
import AppLayout from "@/components/layout/AppLayout";
import Botao from "@/components/botao/botao";
import FiltroPesquisa from "@/components/filtroPesquisa/filtroPesquisa";
import Lista from "@/components/lista/lista";
import ModalCriarProjeto from "@/components/modalCriarProjeto/ModalCriarProjeto";
import { toastSucesso } from "@/utils/toast";
import type {
  CriarProjetoPayload,
  DadosFiltroProjetos,
  OpcaoEmpresaProjeto,
  ProjetoItem,
} from "@/@types/projeto";
import styles from "./projetos.module.css";

const EMPRESAS_SISTEMA: string[] = [
  "Vektor Tech (HQ)",
  "Fintech Core Corp",
  "Qore Cloud Systems",
  "Nexus Pagamentos",
];

const PROJETOS_INICIAIS: ProjetoItem[] = [
  {
    id: "proj-1",
    projeto: "Portal Checkout E-commerce",
    empresa: "Vektor Tech (HQ)",
    nUsuarios: 9,
    status: "Ativo",
  },
  {
    id: "proj-2",
    projeto: "Gateway Pagamentos Pix",
    empresa: "Fintech Core Corp",
    nUsuarios: 5,
    status: "Ativo",
  },
  {
    id: "proj-3",
    projeto: "Painel Analítico Corporativo",
    empresa: "Qore Cloud Systems",
    nUsuarios: 12,
    status: "Ativo",
  },
  {
    id: "proj-4",
    projeto: "Motor de Conciliação Bancária",
    empresa: "Fintech Core Corp",
    nUsuarios: 4,
    status: "Ativo",
  },
  {
    id: "proj-5",
    projeto: "Onboarding Digital Mobile",
    empresa: "Nexus Pagamentos",
    nUsuarios: 7,
    status: "Inativo",
  },
];

const FILTROS_INICIAIS: DadosFiltroProjetos = {
  buscaRapida: "",
  empresa: "",
  status: "",
};

const OPCOES_STATUS_PROJETO = [
  { valor: "todos", texto: "Todos os status" },
  { valor: "Ativo", texto: "Ativo" },
  { valor: "Inativo", texto: "Inativo" },
];

export default function GerenciamentoProjetos() {
  const [projetos, setProjetos] = useState<ProjetoItem[]>(PROJETOS_INICIAIS);
  const [modalAberto, setModalAberto] = useState(false);
  const [filtrosRascunho, setFiltrosRascunho] =
    useState<DadosFiltroProjetos>(FILTROS_INICIAIS);
  const [filtrosAplicados, setFiltrosAplicados] =
    useState<DadosFiltroProjetos>(FILTROS_INICIAIS);

  const empresasDisponiveis = useMemo(() => {
    const mapa = new Set<string>(EMPRESAS_SISTEMA);
    projetos.forEach((item) => {
      if (item.empresa.trim()) {
        mapa.add(item.empresa.trim());
      }
    });
    return Array.from(mapa);
  }, [projetos]);

  const opcoesEmpresaFiltro = useMemo<OpcaoEmpresaProjeto[]>(
    () => [
      { valor: "nenhuma", texto: "Nenhuma selecionada" },
      ...empresasDisponiveis,
    ],
    [empresasDisponiveis]
  );

  const projetosFiltrados = useMemo(() => {
    const termoBusca = filtrosAplicados.buscaRapida.trim().toLowerCase();
    const empresaFiltro = filtrosAplicados.empresa.trim().toLowerCase();
    const statusFiltro = filtrosAplicados.status.trim().toLowerCase();

    return projetos.filter((item) => {
      const correspondeBusca =
        !termoBusca ||
        item.projeto.toLowerCase().includes(termoBusca) ||
        item.empresa.toLowerCase().includes(termoBusca);

      const correspondeEmpresa =
        !empresaFiltro ||
        empresaFiltro === "nenhuma" ||
        empresaFiltro === "nenhuma selecionada" ||
        item.empresa.toLowerCase() === empresaFiltro;

      const correspondeStatus =
        !statusFiltro ||
        statusFiltro === "todos" ||
        statusFiltro === "todos os status" ||
        item.status.toLowerCase() === statusFiltro;

      return correspondeBusca && correspondeEmpresa && correspondeStatus;
    });
  }, [projetos, filtrosAplicados]);

  const handleCriarProjeto = (dados: CriarProjetoPayload) => {
    const novoProjeto: ProjetoItem = {
      id: `proj-${Date.now()}`,
      projeto: dados.projeto,
      empresa: dados.empresa,
      nUsuarios: dados.nUsuarios ?? 0,
      status: dados.status ?? "Ativo",
    };

    setProjetos((prev) => [novoProjeto, ...prev]);
    setFiltrosRascunho(FILTROS_INICIAIS);
    setFiltrosAplicados(FILTROS_INICIAIS);
    setModalAberto(false);
    toastSucesso(`Projeto "${dados.projeto}" criado com sucesso!`);
  };

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
            buscaRapida={filtrosRascunho.buscaRapida}
            empresa={filtrosRascunho.empresa}
            status={filtrosRascunho.status}
            opcoesEmpresa={opcoesEmpresaFiltro}
            opcoesStatus={OPCOES_STATUS_PROJETO}
            onChange={(filtros) => setFiltrosRascunho(filtros)}
            onSearch={(filtros) => setFiltrosAplicados(filtros)}
          />

          <Lista
            variant="projetos"
            projetos={projetosFiltrados}
            emptyMessage="Nenhum projeto encontrado para os filtros aplicados."
          />
        </AppLayout>
      </main>

      <ModalCriarProjeto
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
        onCreate={handleCriarProjeto}
        empresas={empresasDisponiveis}
      />
    </>
  );
}
