import React, { useState } from "react";
import Input from "../input/input";
import Botao from "../botao/botao";
import styles from "./promptCenario.module.css";

export type DadosPromptCenario = {
    urlPullRequest: string;
    branch: string;
    commit: string;
    descricaoFluxo: string;
};

export type PromptCenarioProps = {
    titulo?: string;
    textoBotao?: string;
    urlInicial?: string;
    branchInicial?: string;
    commitInicial?: string;
    descricaoInicial?: string;
    erroUrl?: string;
    erroBranch?: string;
    erroCommit?: string;
    erroDescricao?: string;
    carregando?: boolean;
    onGerarRoteiro?: (dados: DadosPromptCenario) => void;
};

const PromptCenario = ({
    titulo = "Prompt de Geração de Cenários",
    textoBotao = "Gerar Roteiro",
    urlInicial = "",
    branchInicial = "",
    commitInicial = "",
    descricaoInicial = "",
    erroUrl,
    erroBranch,
    erroCommit,
    erroDescricao,
    carregando = false,
    onGerarRoteiro,
}: PromptCenarioProps) => {
    const [urlPullRequest, setUrlPullRequest] = useState(urlInicial);
    const [branch, setBranch] = useState(branchInicial);
    const [commit, setCommit] = useState(commitInicial);
    const [descricaoFluxo, setDescricaoFluxo] = useState(descricaoInicial);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (carregando || !onGerarRoteiro) {
            return;
        }

        onGerarRoteiro({
            urlPullRequest: urlPullRequest.trim(),
            branch: branch.trim(),
            commit: commit.trim(),
            descricaoFluxo: descricaoFluxo.trim(),
        });
    };

    return (
        <form className={styles.container} onSubmit={handleSubmit}>
            <h2 className={styles.titulo}>{titulo}</h2>

            <div className={styles.camposContainer}>
                <div className={styles.inputUrlGroup}>
                    <Input
                        id="url-pull-request"
                        label="Url da pull request"
                        placeholder="https://github.com/exemple/Pull...."
                        temIcone={false}
                        value={urlPullRequest}
                        onChange={(e) => setUrlPullRequest(e.target.value)}
                        erro={erroUrl}
                        disabled={carregando}
                    />
                    <div className={styles.containerInputUrl}>
                        <Input
                            id="branch"
                            label="Branch"
                            placeholder="feature/...."
                            temIcone={false}
                            value={branch}
                            onChange={(e) => setBranch(e.target.value)}
                            erro={erroBranch}
                            disabled={carregando}
                        />

                        <Input
                            id="commit"
                            label="Commit"
                            placeholder="XXXXXXX"
                            temIcone={false}
                            value={commit}
                            onChange={(e) => setCommit(e.target.value)}
                            erro={erroCommit}
                            disabled={carregando}
                        />
                    </div>
                </div>

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
                    disabled={carregando}
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
