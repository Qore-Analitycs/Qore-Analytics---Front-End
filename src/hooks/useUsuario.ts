import { AtualizarUsuario, CriarUsuario, Usuario } from "@/@types/usuario";
import { UsuarioService } from "@/services/usuarioService";
import { toastErro, toastSucesso } from "@/utils/toast";
import { get } from "http";
import { useEffect, useState } from "react";

export function useUsuario() {
    const [u, setU] = useState<Usuario[]>([]);
    const [me, setMe] = useState<Usuario | null>(null);

    async function listarU() {
        try {
            const dados = await UsuarioService.listar();
            setU(dados);
        } catch (error) {
        }
    }

    async function getMe() {
        try {
            const dados = await UsuarioService.getMe();

            console.log('teste');
            console.log(dados)

            setMe(dados);
        } catch (e) {
            toastErro("Erro ao buscar usuario logado");
        }
    }

    async function cadastrarU(dados: CriarUsuario) {
        try {
            const novoU = await UsuarioService.cadastrar(dados);

            setU((antigos) => [novoU, ...antigos])
            return novoU
        } catch (error) {
            toastErro("Deu erro, problema ao cadastrar")
        }
    }

    async function atualizarU(id: string, dados: AtualizarUsuario) {
        try {
            await UsuarioService.atualizar(id, dados);

            toastSucesso("Perfil atualizado com sucesso!");

            return true;
        } catch (error: any) {
            console.error("Erro detalhado ao atualizar:", error.response || error);

            const mensagemApi =
                typeof error.response?.data === "string"
                    ? error.response.data
                    : error.response?.data?.message ||
                    error.response?.data?.title ||
                    "Erro ao atualizar perfil";

            console.log(mensagemApi);
            return false;
        }
    }

    useEffect(() => {
        listarU();
        getMe();
    }, [])

    return {
        u,
        cadastrarU,
        atualizarU,
        me,
        getMe
    };
}