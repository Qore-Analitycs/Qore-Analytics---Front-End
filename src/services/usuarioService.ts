import { ListarUsuario } from "@/@types/usuario";
import { api } from "@/services/api";

export const UsuarioService = {
    async listar(): Promise<ListarUsuario[]> {
        const resposta = await api.get<ListarUsuario[]>("usuarios");

        return resposta.data
    }
}