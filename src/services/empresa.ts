import { Empresa } from "@/@types/empresa";
import { api } from "./api";

export const EmpresaService = {
    async listar(): Promise<Empresa[]> {
        const resposta = await api.get<Empresa[]>("Enum/empresa");

        return resposta.data;
    }
}