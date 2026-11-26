import {
    AtualizarUsuario,
    CriarUsuario,
    FiltrosUsuario,
    RespostaListaUsuarios,
    Usuario,
} from "@/@types/usuario";
import { api } from "@/services/api";
import { toastErro } from "@/utils/toast";

export type FiltrosUsuarioFormulario = {
    busca?: string;
    cargo?: string;
    status?: string;
    empresa?: string;
};

const parseInteiroPositivo = (valor?: string): number | undefined => {
    if (!valor) return undefined;
    const limpo = valor.trim();
    if (!limpo) return undefined;
    const numero = Number(limpo);
    return Number.isInteger(numero) && numero > 0 ? numero : undefined;
};

const parseStatusBooleano = (valor?: string): boolean | undefined => {
    if (!valor) return undefined;
    const normalizado = valor.trim().toLowerCase();
    if (normalizado === "ativo" || normalizado === "true") return true;
    if (normalizado === "inativo" || normalizado === "false") return false;
    return undefined;
};

/**
 * Converte os valores em string coletados pelo FiltroPesquisa para os tipos
 * esperados por GET /api/usuarios, omitindo opções padrão ou vazias.
 */
export function converterFiltrosUsuarioParaApi(
    filtros: FiltrosUsuarioFormulario
): FiltrosUsuario {
    const nomeLimpo = filtros.busca?.trim();
    const cargoId =
        filtros.cargo && filtros.cargo !== "todos"
            ? parseInteiroPositivo(filtros.cargo)
            : undefined;
    const statusBool = parseStatusBooleano(filtros.status);
    const empresaId =
        filtros.empresa && filtros.empresa !== "nenhuma"
            ? parseInteiroPositivo(filtros.empresa)
            : undefined;

    return {
        ...(nomeLimpo ? { nome: nomeLimpo } : {}),
        ...(cargoId !== undefined ? { cargo: cargoId } : {}),
        ...(statusBool !== undefined ? { status: statusBool } : {}),
        ...(empresaId !== undefined ? { empresa: empresaId } : {}),
    };
}

/**
 * Monta apenas os query params válidos de filtro para GET /api/usuarios,
 * omitindo chaves com valor undefined ou inválido.
 */
const montarQueryUsuarios = (
    filtros?: FiltrosUsuario
): Record<string, string | number | boolean> => {
    if (!filtros) return {};

    const query: Record<string, string | number | boolean> = {};

    const nomeLimpo = filtros.nome?.trim();
    if (nomeLimpo) {
        query.nome = nomeLimpo;
    }

    if (
        typeof filtros.cargo === "number" &&
        Number.isInteger(filtros.cargo) &&
        filtros.cargo > 0
    ) {
        query.cargo = filtros.cargo;
    }

    if (typeof filtros.status === "boolean") {
        query.status = filtros.status;
    }

    if (
        typeof filtros.empresa === "number" &&
        Number.isInteger(filtros.empresa) &&
        filtros.empresa > 0
    ) {
        query.empresa = filtros.empresa;
    }

    return query;
};

export const UsuarioService = {
    async listar(filtros?: FiltrosUsuario): Promise<Usuario[]> {
        const query = montarQueryUsuarios(filtros);
        const resposta = await api.get<RespostaListaUsuarios | Usuario[]>(
            "usuarios",
            { params: query }
        );

        if (Array.isArray(resposta.data)) {
            return resposta.data;
        }

        return Array.isArray(resposta.data?.itens) ? resposta.data.itens : [];
    },

    async cadastrar(dados: CriarUsuario): Promise<Usuario> {
        const payload = {
            nome: dados.nome,
            email: dados.email,
            ...(dados.empresa ? { empresa: dados.empresa } : {}),
            senha: dados.senha,
            perfilId: dados.perfilId,
        };

        const resposta = await api.post<Usuario>("usuarios", payload);

        return resposta.data;
    },

    async atualizar(id: string, dados: AtualizarUsuario) {
        if (!id) {
            toastErro("Erro ao buscar id de usuario");
            throw new Error("ID do usuário não informado.");
        }

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
        const resposta = await api.get("Autenticacao/me");

        return resposta.data;
    },
};