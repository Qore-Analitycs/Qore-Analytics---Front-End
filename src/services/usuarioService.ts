import { ListarUsuario } from "@/@types/usuario";
import { api } from "@/pages/api/api";

export const UsuarioService = {
    async listar(): Promise<ListarUsuario[]> {
        const resposta = await api.get<ListarUsuario[]>("usuarios");

        return resposta.data
    }
}