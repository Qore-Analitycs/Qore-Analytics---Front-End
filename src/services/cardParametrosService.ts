import { api } from "./api";
import type { CardParametros } from "@/@types/cardParametros";

export const CardParametrosService = {
    async listar(): Promise<CardParametros> {
        const resposta = await api.get<CardParametros>("usuarios");

        return resposta.data;
    },
};