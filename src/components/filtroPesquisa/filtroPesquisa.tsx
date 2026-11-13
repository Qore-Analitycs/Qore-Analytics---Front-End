import { useState } from "react";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Input from "@/components/input/input";
import Select, { OpcaoSelect } from "@/components/select/select";
import Botao from "@/components/botao/botao";
import styles from "./filtroPesquisa.module.css";

export type FiltroVariante = "padrao" | "usuarios";

export type DadosFiltro = {
    busca: string;
    tipo?: string;
    status: string;
    periodo?: string;
    responsavel?: string;
    cargo?: string;
    empresa?: string;
};

type FiltroPesquisaProps = {
    variante?: FiltroVariante;
    tamanho?: "padrao" | "compacto";
    opcoesTipo?: OpcaoSelect[];
    opcoesStatus?: OpcaoSelect[];
    opcoesPeriodo?: OpcaoSelect[];
    opcoesResponsavel?: OpcaoSelect[];
    opcoesCargo?: OpcaoSelect[];
    opcoesEmpresa?: OpcaoSelect[];
    onBuscar?: (filtros: DadosFiltro) => void;
};

const FiltroPesquisa = ({
    variante = "padrao",
    tamanho = "compacto",
    opcoesTipo = [
        { valor: "todos", texto: "Todos os Tipos" },
        { valor: "web", texto: "Web" },
        { valor: "api", texto: "API" },
    ],
    opcoesStatus = [
        { valor: "todos", texto: "Todos os status" },
        { valor: "ativo", texto: "Ativo" },
        { valor: "inativo", texto: "Inativo" },
    ],
    opcoesPeriodo = [
        { valor: "30dias", texto: "Últimos 30 dias" },
        { valor: "7dias", texto: "Últimos 7 dias" },
        { valor: "hoje", texto: "Hoje" },
    ],
    opcoesResponsavel = [
        { valor: "nenhum", texto: "Nenhum selecionado" },
    ],
    opcoesCargo = [
        { valor: "todos", texto: "Todos os Cargos" },
        { valor: "techlead", texto: "Tech Lead" },
        { valor: "dev", texto: "Desenvolvedor" },
        { valor: "qa", texto: "QA" },
    ],
    opcoesEmpresa = [
        { valor: "nenhuma", texto: "Nenhuma selecionada" },
    ],
    onBuscar,
}: FiltroPesquisaProps) => {
    const [busca, setBusca] = useState("");
    const [tipo, setTipo] = useState("");
    const [status, setStatus] = useState("");
    const [periodo, setPeriodo] = useState("");
    const [responsavel, setResponsavel] = useState("");
    const [cargo, setCargo] = useState("");
    const [empresa, setEmpresa] = useState("");

    const handleBuscar = () => {
        if (!onBuscar) return;

        if (variante === "usuarios") {
            onBuscar({
                busca,
                cargo,
                status,
                empresa,
            });
        } else {
            onBuscar({
                busca,
                tipo,
                status,
                periodo,
                responsavel,
            });
        }
    };

    const ehVarianteUsuarios = variante === "usuarios";

    return (
        <>
            <div className={styles.container}>
                {/* 1. Input de Busca Rápida (Mais largo na variante de usuários/cargos) */}
                <div
                    className={
                        ehVarianteUsuarios ? styles.campoBuscaLargo : styles.campo
                    }
                >
                    <Input
                        label="BUSCA RÁPIDA"
                        placeholder="Buscar..."
                        icone={faMagnifyingGlass}
                        tamanho={tamanho}
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                    />
                </div>

                {ehVarianteUsuarios ? (
                    <>
                        {/* Variante 2 (Imagem Nova): CARGO + STATUS + EMPRESA */}
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
                                valor={status}
                                tamanho={tamanho}
                                onChange={(valor) => setStatus(valor)}
                            />
                        </div>

                        <div className={styles.campo}>
                            <Select
                                label="EMPRESA"
                                placeholder="Nenhuma selecionada"
                                opcoes={opcoesEmpresa}
                                valor={empresa}
                                tamanho={tamanho}
                                onChange={(valor) => setEmpresa(valor)}
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
                                valor={status}
                                tamanho={tamanho}
                                onChange={(valor) => setStatus(valor)}
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
