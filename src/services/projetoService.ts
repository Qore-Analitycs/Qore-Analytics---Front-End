import { CriarProjeto, Projeto } from "@/@types/projeto";
import { api } from "./api";

export const ProjetoService = {
    async listar(): Promise<Projeto[]> {
        const resposta = await api.get<Projeto[]>("Projeto");

        return resposta.data;
    },
    async cadastrar(dados: CriarProjeto): Promise<Projeto> {
        const payload = {
            nome: dados.nome,
            empresaId: dados.empresa
        }

        const resposta = await api.post<Projeto>("Projeto", payload);

        return resposta.data;
    }
}