import { ListarUsuario } from "@/@types/usuario";
import { api } from "@/services/api";

export const UsuarioService = {
    async listar(): Promise<ListarUsuario[]> {
        const resposta = await api.get<ListarUsuario[]>("usuarios");

        return resposta.data
    }
}

// export async function editarProduto(produtoId: number, dados: ProdutoFormulario) {
//     try {
//         const formData = new FormData();

//         formData.append("nome", dados.nome);
//         formData.append("descricao", dados.descricao);
//         formData.append("preco", dados.preco);
//         if (dados.imagem) {
//             formData.append("imagem", dados.imagem);
//         }
//         dados.categoriasId.forEach((id) => {
//             formData.append("categoriaIds", id.toString());
//         })

//         await api.put("Produto/" + produtoId, formData)

//     } catch (error: any) {
//         throw new Error(error.response.data);
//     }
// }