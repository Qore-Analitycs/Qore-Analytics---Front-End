import { useState } from "react";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Input from "@/components/input/input";
import Select, { OpcaoSelect } from "@/components/select/select";
import Botao from "@/components/botao/botao";
import type {
    DadosFiltroProjetos,
    OpcaoEmpresaProjeto,
} from "@/@types/projeto";
import styles from "./filtroPesquisa.module.css";

export type FiltroVariante = "padrao" | "usuarios" | "projetos";

export type DadosFiltro = {
    busca: string;
    tipo?: string;
    status: string;
    periodo?: string;
    responsavel?: string;
    cargo?: string;
    empresa?: string;
};

type FiltroPesquisaBaseProps = {
    tamanho?: "padrao" | "compacto";
    opcoesStatus?: OpcaoSelect[];
};

export type FiltroPesquisaPadraoProps = FiltroPesquisaBaseProps & {
    variante?: "padrao";
    variant?: never;
    context?: never;
    opcoesTipo?: OpcaoSelect[];
    opcoesPeriodo?: OpcaoSelect[];
    opcoesResponsavel?: OpcaoSelect[];
    onBuscar?: (filtros: DadosFiltro) => void;
};

export type FiltroPesquisaUsuariosProps = FiltroPesquisaBaseProps & {
    variante: "usuarios";
    variant?: never;
    context?: never;
    opcoesCargo?: OpcaoSelect[];
    opcoesEmpresa?: OpcaoSelect[];
    onBuscar?: (filtros: DadosFiltro) => void;
};

/**
 * Variação de props do FiltroPesquisa para Gerenciamento de Projetos.
 * Exibe apenas BUSCA RÁPIDA, EMPRESA e STATUS + botão Buscar (sem Cargo).
 */
export type FiltroPesquisaProjetosProps = FiltroPesquisaBaseProps & {
    variante?: "projetos";
    variant?: "projetos";
    context?: "projetos";
    buscaRapida?: string;
    empresa?: string;
    status?: string;
    opcoesEmpresa?: OpcaoEmpresaProjeto[];
    onChange?: (filtros: DadosFiltroProjetos) => void;
    onSearch?: (filtros: DadosFiltroProjetos) => void;
    onBuscar?: (filtros: DadosFiltroProjetos) => void;
    opcoesCargo?: never;
    opcoesTipo?: never;
    opcoesPeriodo?: never;
    opcoesResponsavel?: never;
};

export type FiltroPesquisaProps =
    | FiltroPesquisaPadraoProps
    | FiltroPesquisaUsuariosProps
    | FiltroPesquisaProjetosProps;

const OPCOES_TIPO_PADRAO: OpcaoSelect[] = [
    { valor: "todos", texto: "Todos os Tipos" },
    { valor: "web", texto: "Web" },
    { valor: "api", texto: "API" },
];

const OPCOES_STATUS_PADRAO: OpcaoSelect[] = [
    { valor: "todos", texto: "Todos os status" },
    { valor: "ativo", texto: "Ativo" },
    { valor: "inativo", texto: "Inativo" },
];

const OPCOES_PERIODO_PADRAO: OpcaoSelect[] = [
    { valor: "30dias", texto: "Últimos 30 dias" },
    { valor: "7dias", texto: "Últimos 7 dias" },
    { valor: "hoje", texto: "Hoje" },
];

const OPCOES_RESPONSAVEL_PADRAO: OpcaoSelect[] = [
    { valor: "nenhum", texto: "Nenhum selecionado" },
];

const OPCOES_CARGO_PADRAO: OpcaoSelect[] = [
    { valor: "todos", texto: "Todos os Cargos" },
    { valor: "techlead", texto: "Tech Lead" },
    { valor: "dev", texto: "Desenvolvedor" },
    { valor: "qa", texto: "QA" },
];

const OPCOES_EMPRESA_PADRAO: OpcaoSelect[] = [
    { valor: "nenhuma", texto: "Nenhuma selecionada" },
];

const ehFiltroProjetos = (
    props: FiltroPesquisaProps
): props is FiltroPesquisaProjetosProps =>
    props.variante === "projetos" ||
    props.variant === "projetos" ||
    props.context === "projetos";

const normalizarOpcoesEmpresa = (
    opcoes?: OpcaoEmpresaProjeto[]
): OpcaoSelect[] => {
    if (!opcoes || opcoes.length === 0) return OPCOES_EMPRESA_PADRAO;
    return opcoes.map((opcao) =>
        typeof opcao === "string" ? { valor: opcao, texto: opcao } : opcao
    );
};

const FiltroPesquisa = (props: FiltroPesquisaProps) => {
    const tamanho = props.tamanho ?? "compacto";
    const ehVarianteProjetos = ehFiltroProjetos(props);
    const ehVarianteUsuarios =
        !ehVarianteProjetos && props.variante === "usuarios";

    const opcoesStatus = props.opcoesStatus ?? OPCOES_STATUS_PADRAO;
    const opcoesTipo =
        !ehVarianteProjetos && !ehVarianteUsuarios
            ? props.opcoesTipo ?? OPCOES_TIPO_PADRAO
            : OPCOES_TIPO_PADRAO;
    const opcoesPeriodo =
        !ehVarianteProjetos && !ehVarianteUsuarios
            ? props.opcoesPeriodo ?? OPCOES_PERIODO_PADRAO
            : OPCOES_PERIODO_PADRAO;
    const opcoesResponsavel =
        !ehVarianteProjetos && !ehVarianteUsuarios
            ? props.opcoesResponsavel ?? OPCOES_RESPONSAVEL_PADRAO
            : OPCOES_RESPONSAVEL_PADRAO;
    const opcoesCargo = ehVarianteUsuarios
        ? props.opcoesCargo ?? OPCOES_CARGO_PADRAO
        : OPCOES_CARGO_PADRAO;
    const opcoesEmpresa = ehVarianteProjetos
        ? normalizarOpcoesEmpresa(props.opcoesEmpresa)
        : ehVarianteUsuarios
            ? props.opcoesEmpresa ?? OPCOES_EMPRESA_PADRAO
            : OPCOES_EMPRESA_PADRAO;

    const [busca, setBusca] = useState(
        ehVarianteProjetos ? props.buscaRapida ?? "" : ""
    );
    const [tipo, setTipo] = useState("");
    const [status, setStatus] = useState(
        ehVarianteProjetos ? props.status ?? "" : ""
    );
    const [periodo, setPeriodo] = useState("");
    const [responsavel, setResponsavel] = useState("");
    const [cargo, setCargo] = useState("");
    const [empresa, setEmpresa] = useState(
        ehVarianteProjetos ? props.empresa ?? "" : ""
    );

    const buscaAtual = ehVarianteProjetos ? props.buscaRapida ?? busca : busca;
    const empresaAtual = ehVarianteProjetos ? props.empresa ?? empresa : empresa;
    const statusAtual = ehVarianteProjetos ? props.status ?? status : status;

    const handleBuscaChange = (novoValor: string) => {
        setBusca(novoValor);
        if (ehFiltroProjetos(props)) {
            props.onChange?.({
                buscaRapida: novoValor,
                empresa: empresaAtual,
                status: statusAtual,
            });
        }
    };

    const handleStatusChange = (novoValor: string) => {
        setStatus(novoValor);
        if (ehFiltroProjetos(props)) {
            props.onChange?.({
                buscaRapida: buscaAtual,
                empresa: empresaAtual,
                status: novoValor,
            });
        }
    };

    const handleEmpresaChange = (novoValor: string) => {
        setEmpresa(novoValor);
        if (ehFiltroProjetos(props)) {
            props.onChange?.({
                buscaRapida: buscaAtual,
                empresa: novoValor,
                status: statusAtual,
            });
        }
    };

    const handleBuscar = () => {
        if (ehFiltroProjetos(props)) {
            const payloadProjetos: DadosFiltroProjetos = {
                buscaRapida: buscaAtual,
                empresa: empresaAtual,
                status: statusAtual,
            };
            props.onSearch?.(payloadProjetos);
            props.onBuscar?.(payloadProjetos);
            return;
        }

        if (!props.onBuscar) return;

        if (ehVarianteUsuarios) {
            props.onBuscar({
                busca: buscaAtual,
                cargo,
                status: statusAtual,
                empresa: empresaAtual,
            });
        } else {
            props.onBuscar({
                busca: buscaAtual,
                tipo,
                status: statusAtual,
                periodo,
                responsavel,
            });
        }
    };

    return (
        <>
            <div className={styles.container}>
                {/* 1. Input de Busca Rápida (Mais largo nas variantes de usuários e projetos) */}
                <div
                    className={
                        ehVarianteUsuarios || ehVarianteProjetos
                            ? styles.campoBuscaLargo
                            : styles.campo
                    }
                >
                    <Input
                        label="BUSCA RÁPIDA"
                        placeholder="Buscar..."
                        icone={faMagnifyingGlass}
                        tamanho={tamanho}
                        value={buscaAtual}
                        onChange={(e) => handleBuscaChange(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                handleBuscar();
                            }
                        }}
                    />
                </div>

                {ehVarianteUsuarios ? (
                    <>
                        {/* Variante 2 (Usuários): CARGO + STATUS + EMPRESA */}
                        <div className={styles.campo}>
                            <Select
                                label="CARGO"
                                placeholder="Todos os Cargos"
                                opcoes={opcoesCargo}
                                valor={cargo}
                                tamanho={tamanho}
                                onChange={(valor) => setCargo(valor)}
                            />
                        </div>

                        <div className={styles.campo}>
                            <Select
                                label="STATUS"
                                placeholder="Todos os status"
                                opcoes={opcoesStatus}
                                valor={statusAtual}
                                tamanho={tamanho}
                                onChange={handleStatusChange}
                            />
                        </div>

                        <div className={styles.campo}>
                            <Select
                                label="EMPRESA"
                                placeholder="Nenhuma selecionada"
                                opcoes={opcoesEmpresa}
                                valor={empresaAtual}
                                tamanho={tamanho}
                                onChange={handleEmpresaChange}
                            />
                        </div>
                    </>
                ) : ehVarianteProjetos ? (
                    <>
                        {/* Variante 3 (Projetos): EMPRESA + STATUS (sem Cargo) */}
                        <div className={styles.campo}>
                            <Select
                                label="EMPRESA"
                                placeholder="Nenhuma selecionada"
                                opcoes={opcoesEmpresa}
                                valor={empresaAtual}
                                tamanho={tamanho}
                                onChange={handleEmpresaChange}
                            />
                        </div>

                        <div className={styles.campo}>
                            <Select
                                label="STATUS"
                                placeholder="Todos os status"
                                opcoes={opcoesStatus}
                                valor={statusAtual}
                                tamanho={tamanho}
                                onChange={handleStatusChange}
                            />
                        </div>
                    </>
                ) : (
                    <>
                        {/* Variante 1 (Padrão): TIPO + STATUS + PERIODO + RESPONSAVEL */}
                        <div className={styles.campo}>
                            <Select
                                label="TIPO"
                                placeholder="Todos os Tipos"
                                opcoes={opcoesTipo}
                                valor={tipo}
                                tamanho={tamanho}
                                onChange={(valor) => setTipo(valor)}
                            />
                        </div>

                        <div className={styles.campo}>
                            <Select
                                label="STATUS"
                                placeholder="Todos os status"
                                opcoes={opcoesStatus}
                                valor={statusAtual}
                                tamanho={tamanho}
                                onChange={handleStatusChange}
                            />
                        </div>

                        <div className={styles.campo}>
                            <Select
                                label="PERIODO"
                                placeholder="Últimos 30 dias"
                                opcoes={opcoesPeriodo}
                                valor={periodo}
                                tamanho={tamanho}
                                onChange={(valor) => setPeriodo(valor)}
                            />
                        </div>

                        <div className={styles.campo}>
                            <Select
                                label="RESPONSAVEL"
                                placeholder="Nenhum selecionado"
                                opcoes={opcoesResponsavel}
                                valor={responsavel}
                                tamanho={tamanho}
                                onChange={(valor) => setResponsavel(valor)}
                            />
                        </div>
                    </>
                )}

                {/* Botão Buscar */}
                <div className={styles.areaBotao}>
                    <Botao
                        variante="laranja"
                        texto="Buscar"
                        tamanho={tamanho}
                        onPress={handleBuscar}
                    />
                </div>
            </div>
        </>
    );
};

export default FiltroPesquisa;
