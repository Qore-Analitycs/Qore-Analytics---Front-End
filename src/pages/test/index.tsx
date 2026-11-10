import React from "react";
import PromptCenario, {
    DadosPromptCenario,
} from "@/components/promptCenario/promptCenario";
import Input from "@/components/input/input";

export default function TestPage() {
    const handleGerarRoteiro = (dados: DadosPromptCenario) => {
        console.log("Dados enviados pelo PromptCenario:", dados);
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
            <div style={{ width: "100%", maxWidth: "1200px" }}>
                <PromptCenario onGerarRoteiro={handleGerarRoteiro} />
                <Input
                    label="Url da pull request"
                    placeholder="https://github.com/exemple/Pull...."
                    temIcone={false}
                />
            </div>
        </main>
    );
}

