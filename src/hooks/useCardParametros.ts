import { CardParametrosService } from "@/services/cardParametrosService";
import { toastErro } from "@/utils/toast";
import { useEffect, useState } from "react";
import type { CardParametros } from "@/@types/cardParametros";

export function useCardParametros() {
    const [dados, setDados] = useState<CardParametros>({
        porCargo: [],
        totalItens: 0
    });

    const [carregando, setCarregando] = useState(true);

    async function listarTotal() {
        try {
            const resposta = await CardParametrosService.listar();

            setDados(resposta);

        } catch (error) {
            toastErro("Erro ao carregar métricas");
        } finally {
            setCarregando(false);
        }
    }

    useEffect(() => {
        listarTotal();
    }, []);

    const buscarQuantidade = (nomeCargo: string) => {
        return dados.porCargo.find(
            (cargo) => cargo.nome.toUpperCase() === nomeCargo.toUpperCase()
        )?.quantidade ?? 0;
    };

    return {
        totalMembros: dados.totalItens,
        totalAdministradores: buscarQuantidade("ADMIN"),
        totalDevs: buscarQuantidade("DEV"),
        totalQA: buscarQuantidade("QA"),
        carregando
    };
}