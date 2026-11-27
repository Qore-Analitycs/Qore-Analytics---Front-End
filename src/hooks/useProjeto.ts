import { Projeto } from "@/@types/projeto";
import { ProjetoService } from "@/services/projetoService";
import { toastErro } from "@/utils/toast";
import { useEffect, useState } from "react";

export function useProjeto() {
    const [projetos, setProjetos] = useState<Projeto[]>([]);
    const [carregandoProjetos, setCarregandoProjetos] = useState(false);

    async function listarProjetos() {
        setCarregandoProjetos(true);
        try {
            const dados = await ProjetoService.listar();
            setProjetos(dados);
        } catch (error) {
            console.error("Erro ao listar projetos:", error);
            toastErro("Erro ao listar projetos");
        } finally {
            setCarregandoProjetos(false);
        }
    }

    useEffect(() => {
        listarProjetos();
    }, []);

    return {
        projetos,
        carregandoProjetos,
        listarProjetos,
    };
}