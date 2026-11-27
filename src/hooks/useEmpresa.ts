import { Empresa } from "@/@types/empresa";
import { EmpresaService } from "@/services/empresa";
import { useEffect, useState } from "react";

export function useEmpresa() {
    const [empresa, setEmpresa] = useState<Empresa[]>([]);

    async function listarEmpresa() {
        try {
            const dados = await EmpresaService.listar();

            setEmpresa(dados);
            console.log("Empresas", dados);
        } catch (error) {
            console.error("Erro ao listar empresas");
        }
    }

     useEffect(() => {
            listarEmpresa();
        }, []);
    
        return {
            empresa
        };
}