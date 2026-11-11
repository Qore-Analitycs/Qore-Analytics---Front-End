import React from "react";
import PromptCenario, {
    DadosPromptCenario,
} from "@/components/promptCenario/promptCenario";
import DocumentoGerado from "@/components/documentoGerado/documentoGerado";
import { PassoValidacao } from "@/components/documentoGerado/types";

export default function TestPage() {
    const handleGerarRoteiro = (dados: DadosPromptCenario) => {
        console.log("Dados enviados pelo PromptCenario:", dados);
    };

    const handleAssinarRoteiro = (passos: PassoValidacao[]) => {
        console.log("Roteiro assinado com os passos:", passos);
    };

    const handleExecutarTesteIA = (passos: PassoValidacao[]) => {
        console.log("Executando teste com IA usando os passos:", passos);
    };

    return (
        <main
            style={{
                minHeight: "100vh",
                backgroundColor: "var(--cor-fundo)",
                padding: "40px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <div
                style={{
                    width: "100%",
                    maxWidth: "1200px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "32px",
                }}
            >
                {/* <PromptCenario onGerarRoteiro={handleGerarRoteiro} /> */}
                <DocumentoGerado
                    onAssinarRoteiro={handleAssinarRoteiro}
                    onExecutarTesteIA={handleExecutarTesteIA}
                />
            </div>
        </main>
    );
}
