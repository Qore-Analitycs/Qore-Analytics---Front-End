import React, { useState } from "react";
import Input from "../input/input";
import Botao from "../botao/botao";
import styles from "./promptCenario.module.css";
import Select from "../select/select";
import { useProjeto } from "@/hooks/useProjeto";

export type DadosPromptCenario = {
  projetoId: number;
  urlPullRequest: string;
  urlAlvo: string;
  branch: string;
  commit: string;
  descricaoFluxo: string;
};

export type PromptCenarioProps = {
  titulo?: string;
  textoBotao?: string;
  urlInicial?: string;
  urlAlvoInicial?: string;
  branchInicial?: string;
  commitInicial?: string;
  projetoInicial?: number;
  descricaoInicial?: string;
  erroUrl?: string;
  erroUrlAlvo?: string;
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
  urlAlvoInicial = "",
  branchInicial = "",
  commitInicial = "",
  projetoInicial = 0,
  descricaoInicial = "",
  erroUrl,
  erroUrlAlvo,
  erroBranch,
  erroCommit,
  erroDescricao,
  carregando = false,
  onGerarRoteiro,
}: PromptCenarioProps) => {
  const { projetos, carregandoProjetos } = useProjeto();

  const [urlPullRequest, setUrlPullRequest] = useState(urlInicial);
  const [urlAlvo, setUrlAlvo] = useState(urlAlvoInicial);
  const [branch, setBranch] = useState(branchInicial);
  const [commit, setCommit] = useState(commitInicial);
  const [projetoId, setProjetoId] = useState<number>(projetoInicial);
  const [descricaoFluxo, setDescricaoFluxo] = useState(descricaoInicial);

  // Transforma o array de Projeto[] vindo da API no formato esperado pelo Select
  // Ajuste "p.nome" e "p.id" se os nomes dos campos em @/@types/projeto forem diferentes
  const opcoesProjetos = projetos.map((p) => ({
    label: p.nome,
    value: String(p.id),
  }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (carregando || !onGerarRoteiro) {
      return;
    }

    onGerarRoteiro({
      projetoId: Number(projetoId),
      urlPullRequest: urlPullRequest.trim(),
      urlAlvo: urlAlvo.trim(),
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
          <div className={styles.containerInput}>
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
          </div>

          <div className={styles.containerInput}>
            <Input
              id="url-alvo"
              label="Url da onde vai ser testado"
              placeholder="https://Site no ar que sera testeado"
              temIcone={false}
              value={urlAlvo}
              onChange={(e) => setUrlAlvo(e.target.value)}
              erro={erroUrlAlvo}
              disabled={carregando}
            />
          </div>

          <div className={styles.containerInputUrl}>

            <Select
              label="Projeto"
              placeholder={carregandoProjetos ? "Carregando..." : "Número do projeto"}
              value={projetoId ? String(projetoId) : ""}
              onChange={(e: any) =>
                setProjetoId(Number(e.target ? e.target.value : e))
            }
              disabled={carregando || carregandoProjetos}
            />
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
          </div>

          <div className={styles.containerInput}>
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