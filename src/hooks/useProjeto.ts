import { CriarProjeto, Projeto } from "@/@types/projeto";
import { ProjetoService } from "@/services/projetoService";
import { toastErro, toastSucesso } from "@/utils/toast";
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

    async function cadastrarProjeto(dados: CriarProjeto) {
        try {
            const novoProjeto = await ProjetoService.cadastrar(dados);

            setProjetos((antigos) => [novoProjeto, ...antigos]);

            return novoProjeto;
        } catch(error) {
            toastErro("Erro ao cadastrar projeto");
            console.log(error);
            return;
        }
    }

    useEffect(() => {
        listarProjetos();
    }, []);

    return {
        projetos,
        carregandoProjetos,
        cadastrarProjeto
    };
}