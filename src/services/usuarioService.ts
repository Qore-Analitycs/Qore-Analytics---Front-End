import { CriarUsuario, Usuario } from "@/@types/usuario";
import { api } from "@/services/api";

export const UsuarioService = {
    async listar(): Promise<Usuario[]> {
        const resposta = await api.get<Usuario[]>("usuarios");

        return resposta.data
    },

    async cadastrar(dados: CriarUsuario): Promise<Usuario> {
        const payload = {
            nome: dados.nome,
            email: dados.email,
            senha: dados.senha,
            perfilId: dados.perfilId,
        };

        const resposta = await api.post<Usuario>("usuarios", payload);

        return resposta.data;
    }
}
