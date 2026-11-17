import { Usuario } from "@/@types/usuario";
import { UsuarioService } from "@/services/usuarioService";
import { useEffect, useState } from "react";

export function useUsuario() {
    const [u, setU] = useState<Usuario[]>([]);

    async function listarU() {
        try {
            const dados = await UsuarioService.listar();

            console.log(dados);

            setU(dados);
        }catch(error) {
            alert("Deu merda");
        }
    }

    useEffect(() => {
        listarU();
    }, [])

    return {
        u
    };
}