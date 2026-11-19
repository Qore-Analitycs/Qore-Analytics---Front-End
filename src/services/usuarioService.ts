import { ListarUsuario, UsuarioEdicao, UsuarioListagem } from "@/@types/usuario";
import { api } from "@/services/api";


interface RedefinirSenha {}

export const UsuarioService = {
    async listar(): Promise<ListarUsuario[]> {
        const resposta = await api.get<ListarUsuario[]>("usuarios");

        return resposta.data
    }
}

export async function editarUsuario(usuarioId: number, dados: UsuarioEdicao) {
    try {
        const formData = new FormData();

        formData.append("nome", dados.nome);
        formData.append("email", dados.email);

        await api.put("Usuario/" + usuarioId, formData)

    } catch (error: any) {
        throw new Error(error.response.data);
    }
}

// export async function redefinirSenha(usuarioId: number, dados: RedefinirSenha) {
//     try {
//         const formData = new FormData();

//         formData.append("senhaAtual", dados.senhaAtual);
//         formData.append("novaSenha", dados.novaSenha);
//         formData.append("confirmarNovaSenha", dados.confirmarNovaSenha);

//         await api.put("Usuario/" + usuarioId, formData)

//     } catch (error: any) {
//         throw new Error(error.response.data);
//     }
// }

// export interface UsuarioEdicao {
//     nome: string,
//     email: string,
// }

// export interface RedefinirSenha {
//     senhaAtual: string,
//     novaSenha: string,
//     confirmarNovaSenha: string
// }