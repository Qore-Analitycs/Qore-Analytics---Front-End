export type QuantidadePorCargo = {
    cargoId: number;
    nome: string;
    quantidade: number;
};

export type CardParametros = {
    porCargo: QuantidadePorCargo[];
    totalItens: number;
};