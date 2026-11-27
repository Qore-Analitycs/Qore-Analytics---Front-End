import { Projeto } from "@/@types/projeto";
import { api } from "./api";

export const ProjetoService = {
    async listar(): Promise<Projeto[]> {
        const resopsta = await api.get<Projeto[]>("Projeto");

        return resopsta.data;
    }
}