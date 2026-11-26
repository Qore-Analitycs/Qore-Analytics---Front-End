import { Projeto } from "@/@types/projeto";
import { api } from "./api";

export const ProjetoService = {
    async listar(): Promise<Projeto[]> {
        const resposta = await api.get<Projeto[]>("Projeto");

        return resposta.data;
    }
}