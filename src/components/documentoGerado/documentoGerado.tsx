import React, { useState } from "react";
import ScriptHeader from "./ScriptHeader/ScriptHeader";
import TestMetadata from "./TestMetadata/TestMetadata";
import ConditionList from "./ConditionList/ConditionList";
import ValidationTable from "./ValidationTable/ValidationTable";
import { ItemCondicao, PassoValidacao, ResumoRoteiro } from "./types";
import styles from "./documentoGerado.module.css";

const MOCK_PRE_CONDICOES: ItemCondicao[] = [
    { id: "pre-1", texto: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
    { id: "pre-2", texto: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
    { id: "pre-3", texto: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
    { id: "pre-4", texto: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
    { id: "pre-5", texto: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
];

const MOCK_CRITERIOS_ACEITACAO: ItemCondicao[] = [
    { id: "crit-1", texto: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
    { id: "crit-2", texto: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
    { id: "crit-3", texto: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
    { id: "crit-4", texto: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
    { id: "crit-5", texto: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
];

const MOCK_RESUMO: ResumoRoteiro = {
    focoTeste: "Caminho Feliz",
    arquivosAlterados: "X Arquivos alterados",
    impacto: "Médio",
};

const PASSOS_MOCK_INICIAIS: PassoValidacao[] = [
    {
        id: "passo-1",
        acao: "Navegar até a tela de Checkout e avançar para etapa de Pagamento",
        dadoEntrada: "URL: /checkout\norder_id=9841",
        resultadoEsperado:
            "A tela exibe as opções de Pix, Cartão e Boleto sem erros de renderização.",
    },
    {
        id: "passo-2",
        acao: "Selecionar opção 'Cartão de Crédito' e escolher 6x sem juros",
        dadoEntrada: "Opção: '6x de R$ 35,00'",
        resultadoEsperado:
            "O valor total das parcelas soma exatamente R$ 210,00 sem discrepância de centavos.",
    },
    {
        id: "passo-3",
        acao: "Clicar no botão 'Finalizar Pedido' rapidamente em sequência (duplo clique proposital)",
        dadoEntrada: "2 cliques em < 300ms",
        resultadoEsperado:
            "O debounce desabilita o botão após o 1º clique; apenas 1 requisição POST é disparada.",
        focoDiff: true,
    },
    {
        id: "passo-4",
        acao: "Confirmar modal de sucesso e verificar redirecionamento para recibo",
        dadoEntrada: "Status HTTP 200\nretornado",
        resultadoEsperado:
            "Tela de confirmação exibe código do pedido #9841 e comprovante para download.",
    },
];

type DocumentoGeradoProps = {
    tituloInicial?: string;
    commitInicial?: string;
    autorInicial?: string;
    dataInicial?: string;
    resumoInicial?: ResumoRoteiro;
    preCondicoesIniciais?: ItemCondicao[];
    criteriosIniciais?: ItemCondicao[];
    passosIniciais?: PassoValidacao[];
    carregandoIA?: boolean;
    onAssinarRoteiro?: (passos: PassoValidacao[]) => void;
    onExecutarTesteIA?: (passos: PassoValidacao[]) => void;
};

const DocumentoGerado = ({
    tituloInicial = "Titulo do Roteiro",
    commitInicial = "123asd#",
    autorInicial = "Allan Barbosa",
    dataInicial = "20/10/26",
    resumoInicial = MOCK_RESUMO,
    preCondicoesIniciais = MOCK_PRE_CONDICOES,
    criteriosIniciais = MOCK_CRITERIOS_ACEITACAO,
    passosIniciais = PASSOS_MOCK_INICIAIS,
    carregandoIA = false,
    onAssinarRoteiro,
    onExecutarTesteIA,
}: DocumentoGeradoProps) => {
    const [titulo, setTitulo] = useState(tituloInicial);
    const [resumo, setResumo] = useState<ResumoRoteiro>(resumoInicial);
    const [preCondicoes, setPreCondicoes] = useState<ItemCondicao[]>(preCondicoesIniciais);
    const [criterios, setCriterios] = useState<ItemCondicao[]>(criteriosIniciais);
    const [passos, setPassos] = useState<PassoValidacao[]>(passosIniciais);

    return (
        <article className={styles.folhaSulfite}>
            {/* 1. Cabeçalho do Roteiro */}
            <ScriptHeader
                titulo={titulo}
                commit={commitInicial}
                autor={autorInicial}
                data={dataInicial}
                onAlterarTitulo={setTitulo}
            />

            {/* 2. Metadados e Resumo */}
            <TestMetadata
                resumo={resumo}
                onAlterarResumo={setResumo}
            />

            {/* 3. Pré-condições para Execução */}
            <ConditionList
                titulo="Pré-condições para Execução"
                itens={preCondicoes}
                placeholderNovo="Ex: Usuário autenticado com perfil Administrador..."
                onChangeItens={setPreCondicoes}
            />

            {/* 4. Critérios Mínimos de Aceitação */}
            <ConditionList
                titulo="Critérios Mínimos de Aceitação"
                itens={criterios}
                placeholderNovo="Ex: O tempo de resposta deve ser inferior a 2 segundos..."
                onChangeItens={setCriterios}
            />

            {/* 5. Tabela do Roteiro Detalhado de Validação Manual */}
            <ValidationTable
                passos={passos}
                onChangePassos={setPassos}
                carregandoIA={carregandoIA}
                onAssinarRoteiro={() => onAssinarRoteiro?.(passos)}
                onExecutarTesteIA={() => onExecutarTesteIA?.(passos)}
            />
        </article>
    );
};

export default DocumentoGerado;
