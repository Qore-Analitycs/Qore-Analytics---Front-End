import { AtualizarUsuario, CriarUsuario, Usuario } from "@/@types/usuario";
import { api } from "@/services/api";
import { toastErro } from "@/utils/toast";

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
    },

    async atualizar(id: string, dados: AtualizarUsuario) {
        if (!id) {
            toastErro("Erro ao buscar id de usuario")
            throw new Error("ID do usuário não informado.");
        }

        // OPÇÃO A: Se o backend espera FormData ([FromForm] no C#)
        const formData = new FormData();

        if (dados.Nome) formData.append("Nome", dados.Nome);
        if (dados.Email) formData.append("Email", dados.Email);
        if (dados.SenhaAtual) formData.append("SenhaAtual", dados.SenhaAtual);
        if (dados.NovaSenha) formData.append("NovaSenha", dados.NovaSenha);
        if (dados.ConfirmarNovaSenha) {
            formData.append("ConfirmarNovaSenha", dados.ConfirmarNovaSenha);
        }

        await api.patch(`usuarios/alterar/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },

    async getMe() {
        const resposta = await api.get('Autenticacao/me')

        return resposta.data;
    }
}
