import React, { useState } from "react";
import Input from "../input/input";
import Botao from "../botao/botao";
import styles from "./promptCenario.module.css";

export type DadosPromptCenario = {
    urlPullRequest: string;
    descricaoFluxo: string;
};

type PromptCenarioProps = {
    titulo?: string;
    textoBotao?: string;
    urlInicial?: string;
    descricaoInicial?: string;
    erroUrl?: string;
    erroDescricao?: string;
    carregando?: boolean;
    onGerarRoteiro?: (dados: DadosPromptCenario) => void;
};

const PromptCenario = ({
    titulo = "Prompt de Geração de Cenários",
    textoBotao = "Gerar Roteiro",
    urlInicial = "",
    descricaoInicial = "",
    erroUrl,
    erroDescricao,
    carregando = false,
    onGerarRoteiro,
}: PromptCenarioProps) => {
    const [urlPullRequest, setUrlPullRequest] = useState(urlInicial);
    const [descricaoFluxo, setDescricaoFluxo] = useState(descricaoInicial);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (onGerarRoteiro) {
            onGerarRoteiro({
                urlPullRequest,
                descricaoFluxo,
            });
        }
    };

    return (
        <form className={styles.container} onSubmit={handleSubmit}>
            <h2 className={styles.titulo}>{titulo}</h2>

            <div className={styles.camposContainer}>
                <Input
                    id="url-pull-request"
                    label="Url da pull request"
                    placeholder="https://github.com/exemple/Pull...."
                    temIcone={false}
                    value={urlPullRequest}
                    onChange={(e) => setUrlPullRequest(e.target.value)}
                    erro={erroUrl}
                />

                <Input
                    id="descricao-fluxo"
                    label="Descreva o fluxo ou regra de negócio"
                    placeholder="Validar o fluxo de caixa......"
                    temIcone={false}
                    multiline
                    rows={5}
                    value={descricaoFluxo}
                    onChange={(e) => setDescricaoFluxo(e.target.value)}
                    erro={erroDescricao}
                />
            </div>

            <div className={styles.rodapeBotao}>
                <div className={styles.botaoWrapper}>
                    <Botao
                        type="submit"
                        texto={carregando ? "Gerando..." : textoBotao}
                        variante="laranja"
                        disabled={carregando}
                    />
                </div>
            </div>
        </form>
    );
};

export default PromptCenario;
