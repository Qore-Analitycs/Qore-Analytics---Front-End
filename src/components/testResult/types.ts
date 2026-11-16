export type StatusResultadoPasso = "PASSOU" | "NAO_PASSOU";

export type FiltroResultado = "TODOS" | StatusResultadoPasso;

export type ResultadoPasso = {
    id: string;
    numero: number;
    titulo: string;
    status: StatusResultadoPasso;
    tempoExecucaoMs: number;
    erroDetalhe?: string;
    tags?: string[];
};

export type DadosResultadoTeste = {
    passos: ResultadoPasso[];
};

