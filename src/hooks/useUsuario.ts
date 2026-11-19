import { CriarUsuario, Usuario } from "@/@types/usuario";
import { UsuarioService } from "@/services/usuarioService";
import { toastErro, toastSucesso } from "@/utils/toast";
import { useEffect, useState } from "react";

export function useUsuario() {
    const [u, setU] = useState<Usuario[]>([]);

    async function listarU() {
        try {
            const dados = await UsuarioService.listar();

            console.log(dados);

            setU(dados);
        }catch(error) {
        }
    }

    async function cadastrarU(dados: CriarUsuario) {
        try {
            const novoU = await UsuarioService.cadastrar(dados);

            toastSucesso("Usuário cadastrado com sucesso")
            setU((antigos) => [novoU, ...antigos])
            return novoU
        } catch (error) {
            toastErro("Deu erro, problema ao cadastrar")
        }
    }

    useEffect(() => {
        listarU();
    }, [])

    return {
        u,
        cadastrarU
    };
}