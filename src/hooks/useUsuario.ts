import { AtualizarUsuario, CriarUsuario, Usuario } from "@/@types/usuario";
import { UsuarioService } from "@/services/usuarioService";
import { toastErro, toastSucesso } from "@/utils/toast";
import { useEffect, useState } from "react";

export function useUsuario() {
    const [u, setU] = useState<Usuario[]>([]);
    const [me, setMe] = useState<Usuario | null>(null);

    async function listarU() {
        try {
            const dados = await UsuarioService.listar();

            setU(dados);

            console.log("Usuários recebidos:", dados);
        } catch (error) {
            console.error("Erro ao listar usuários:", error);
            toastErro("Erro ao listar usuários");
        }
    }

    async function getMe() {
        try {
            const dados = await UsuarioService.getMe();

            setMe(dados);
        } catch (error) {
            console.error(error);
            toastErro("Erro ao buscar usuário logado");
        }
    }

    async function cadastrarU(dados: CriarUsuario) {
        try {
            const novoU = await UsuarioService.cadastrar(dados);

            setU((antigos) => [novoU, ...antigos]);
            toastSucesso("Usuário cadastrado com sucesso");
            
            return novoU;
        } catch (error) {
            toastErro("Erro ao cadastrar usuário");
            return;
        }
    }

    async function atualizarU(id: string, dados: AtualizarUsuario) {
        try {
            await UsuarioService.atualizar(id, dados);

            await listarU();

            toastSucesso("Perfil atualizado com sucesso!");

            return true;
        } catch (error: any) {
            console.error("Erro ao atualizar:", error.response?.data || error);

            const mensagemApi =
                typeof error.response?.data === "string"
                    ? error.response.data
                    : error.response?.data?.message ||
                      error.response?.data?.title ||
                      "Erro ao atualizar perfil";

            toastErro(mensagemApi);

            return false;
        }
    }

    useEffect(() => {
        listarU();
        getMe();
    }, []);

    return {
        u,
        cadastrarU,
        atualizarU,
        me,
        getMe,
        listarU,
    };
}