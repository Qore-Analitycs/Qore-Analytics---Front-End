import { useMemo, useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import Botao from "@/components/botao/botao";
import FiltroPesquisa from "@/components/filtroPesquisa/filtroPesquisa";
import Lista from "@/components/lista/lista";
import ModalCriarEmpresa from "@/components/modalCriarEmpresa/ModalCriarEmpresa";
import {
  CriarEmpresaPayload,
  DadosFiltroEmpresas,
  EmpresaItem,
} from "@/@types/empresa";
import { toastSucesso } from "@/utils/toast";
import styles from "./empresas.module.css";

const EMPRESAS_INICIAIS: EmpresaItem[] = [
  {
    id: "emp-1",
    empresa: "Vektor Tech (HQ)",
    nProjetos: 5,
    status: "Ativo",
  },
  {
    id: "emp-2",
    empresa: "Fintech Core Corp",
    nProjetos: 3,
    status: "Ativo",
  },
  {
    id: "emp-3",
    empresa: "Qore Cloud Systems",
    nProjetos: 4,
    status: "Ativo",
  },
  {
    id: "emp-4",
    empresa: "Nexus Pagamentos",
    nProjetos: 2,
    status: "Ativo",
  },
  {
    id: "emp-5",
    empresa: "Alfa Soluções",
    nProjetos: 1,
    status: "Inativo",
  },
];

const FILTRO_INICIAL: DadosFiltroEmpresas = {
  buscaRapida: "",
  status: "",
};

const OPCOES_STATUS_EMPRESA = [
  { valor: "todos", texto: "Todos os status" },
  { valor: "Ativo", texto: "Ativo" },
  { valor: "Inativo", texto: "Inativo" },
];

/**
 * Tela de Gerenciamento de Empresa: busca rápida, filtro de status, listagem e criação de empresas.
 */
export default function EmpresasPage() {
  const [empresas, setEmpresas] = useState<EmpresaItem[]>(EMPRESAS_INICIAIS);
  const [modalAberto, setModalAberto] = useState(false);
  const [erroCriacao, setErroCriacao] = useState<string | null>(null);
  const [filtrosDigitados, setFiltrosDigitados] =
    useState<DadosFiltroEmpresas>(FILTRO_INICIAL);
  const [filtrosAplicados, setFiltrosAplicados] =
    useState<DadosFiltroEmpresas>(FILTRO_INICIAL);

  const empresasFiltradas = useMemo(() => {
    const termo = filtrosAplicados.buscaRapida.trim().toLowerCase();
    const statusFiltro = filtrosAplicados.status.trim().toLowerCase();

    return empresas.filter((item) => {
      const correspondeBusca =
        !termo || item.empresa.toLowerCase().includes(termo);

      const correspondeStatus =
        !statusFiltro ||
        statusFiltro === "todos" ||
        statusFiltro === "todos os status" ||
        item.status.toLowerCase() === statusFiltro;

      return correspondeBusca && correspondeStatus;
    });
  }, [empresas, filtrosAplicados]);

  const handleAlterarFiltros = (novosFiltros: DadosFiltroEmpresas) => {
    setFiltrosDigitados(novosFiltros);
    if (!novosFiltros.buscaRapida.trim() && filtrosAplicados.buscaRapida) {
      setFiltrosAplicados((atual) => ({ ...atual, buscaRapida: "" }));
    }
  };

  const handleCriarEmpresa = ({
    empresa,
    nProjetos = 0,
    status = "Ativo",
  }: CriarEmpresaPayload) => {
    const nomeNormalizado = empresa.trim().toLowerCase();
    const empresaDuplicada = empresas.some(
      (item) => item.empresa.trim().toLowerCase() === nomeNormalizado
    );

    if (empresaDuplicada) {
      setErroCriacao("Já existe uma empresa cadastrada com esse nome.");
      return;
    }

    const novaEmpresa: EmpresaItem = {
      id: `emp-${Date.now()}`,
      empresa,
      nProjetos,
      status,
    };

    setEmpresas((listaAtual) => [novaEmpresa, ...listaAtual]);
    setFiltrosDigitados(FILTRO_INICIAL);
    setFiltrosAplicados(FILTRO_INICIAL);
    setErroCriacao(null);
    setModalAberto(false);
    toastSucesso("Empresa criada com sucesso!");
  };

  return (
    <>
      <div className={modalAberto ? styles.mainBlur : undefined}>
        <AppLayout maxWidth="1520px" containerClassName={styles.container}>
          <header className={styles.cabecalho}>
            <h1 className={styles.titulo}>Gerenciamento de Empresa</h1>

            <div className={styles.containerBotao}>
              <Botao
                variante="laranja"
                tamanho="compacto"
                aria-label="Criar novo Empresa"
                onPress={() => {
                  setErroCriacao(null);
                  setModalAberto(true);
                }}
              >
                <span className={styles.conteudoBotaoCriar}>
                  <span aria-hidden="true">+</span>
                  <span>Criar novo Empresa</span>
                </span>
              </Botao>
            </div>
          </header>

          <div className={styles.conteudo}>
            <FiltroPesquisa
              variant="empresas"
              buscaRapida={filtrosDigitados.buscaRapida}
              status={filtrosDigitados.status}
              opcoesStatus={OPCOES_STATUS_EMPRESA}
              onChange={handleAlterarFiltros}
              onSearch={setFiltrosAplicados}
            />

            <Lista
              page="empresas"
              empresas={empresasFiltradas}
              emptyMessage="Nenhuma empresa encontrada para os filtros informados."
            />
          </div>
        </AppLayout>
      </div>

      <ModalCriarEmpresa
        isOpen={modalAberto}
        onClose={() => {
          setErroCriacao(null);
          setModalAberto(false);
        }}
        onCreate={handleCriarEmpresa}
        errorMessage={erroCriacao}
      />
    </>
  );
}
