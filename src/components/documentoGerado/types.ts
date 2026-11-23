export type PassoValidacao = {
    id: string;
    acao: string;
    dadoEntrada: string;
    resultadoEsperado: string;
    focoDiff?: boolean;
};

export type ItemCondicao = {
    id: string;
    texto: string;
};

export type PreCondicao = ItemCondicao;

export type ResumoRoteiro = {
    focoTeste: string;
    arquivosAlterados: string;
    impacto: string;
};

export type DadosRoteiro = {
    titulo: string;
    commit: string;
    autor: string;
    data: string;
    resumo: ResumoRoteiro;
    preCondicoes: PreCondicao[];
    criteriosAceitacao: PreCondicao[];
    passos: PassoValidacao[];
};

