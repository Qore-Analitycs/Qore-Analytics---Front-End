import React, { useEffect, useRef, useState } from "react";
import Input from "../input/input";
import Botao from "../botao/botao";
import Select, { OpcaoSelect } from "../select/select";
import { useProjeto } from "@/hooks/useProjeto";
import type {
  GitHubInspecaoEstado,
  GitHubInspecaoRespostaDto,
} from "@/@types/geracaoPrompt";
import styles from "./promptCenario.module.css";

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
  inspecaoGitHub?: GitHubInspecaoEstado;
  onInspecionarGitHub?: (
    url: string,
    branch?: string
  ) => Promise<GitHubInspecaoRespostaDto | null>;
  onLimparInspecaoGitHub?: () => void;
  onDadosChange?: (dados: DadosPromptCenario) => void;
  onGerarRoteiro?: (dados: DadosPromptCenario) => void;
};

const pareceUrlGitHub = (valor: string): boolean =>
  /(?:https?:\/\/)?(?:www\.)?github\.com\/[^/\s]+\/[^/\s]+/i.test(
    valor.trim()
  );

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
  inspecaoGitHub = { status: "idle" },
  onInspecionarGitHub,
  onLimparInspecaoGitHub,
  onDadosChange,
  onGerarRoteiro,
}: PromptCenarioProps) => {
  const { projetos, carregandoProjetos } = useProjeto();

  const [urlPullRequest, setUrlPullRequest] = useState(urlInicial);
  const [urlAlvo, setUrlAlvo] = useState(urlAlvoInicial);
  const [branch, setBranch] = useState(branchInicial);
  const [commit, setCommit] = useState(commitInicial);
  const [projetoId, setProjetoId] = useState<number>(projetoInicial);
  const [descricaoFluxo, setDescricaoFluxo] = useState(descricaoInicial);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const ultimaUrlInspecionadaRef = useRef<string>("");

  const opcoesProjetos: OpcaoSelect[] = projetos.map((p) => ({
    texto: p.nome,
    valor: String(p.id),
  }));

  const emitirMudanca = (parcial: Partial<DadosPromptCenario>) => {
    onDadosChange?.({
      projetoId: parcial.projetoId ?? Number(projetoId),
      urlPullRequest: (parcial.urlPullRequest ?? urlPullRequest).trim(),
      urlAlvo: (parcial.urlAlvo ?? urlAlvo).trim(),
      branch: (parcial.branch ?? branch).trim(),
      commit: (parcial.commit ?? commit).trim(),
      descricaoFluxo: (parcial.descricaoFluxo ?? descricaoFluxo).trim(),
    });
  };

  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  const executarInspecaoGitHub = async (url: string, branchAlvo?: string) => {
    if (!onInspecionarGitHub) return;
    const resposta = await onInspecionarGitHub(url, branchAlvo);
    if (!resposta) return;

    const novaBranch = resposta.branchSelecionada || branchAlvo || "";
    const novoCommit = resposta.commitSelecionado || "";

    setBranch(novaBranch);
    setCommit(novoCommit);
    emitirMudanca({
      urlPullRequest: url,
      branch: novaBranch,
      commit: novoCommit,
    });
  };

  const handleUrlPullRequestChange = (novaUrl: string) => {
    setUrlPullRequest(novaUrl);
    emitirMudanca({ urlPullRequest: novaUrl });

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    const urlLimpa = novaUrl.trim();
    if (!urlLimpa) {
      ultimaUrlInspecionadaRef.current = "";
      onLimparInspecaoGitHub?.();
      return;
    }

    if (!onInspecionarGitHub || !pareceUrlGitHub(urlLimpa)) {
      return;
    }

    debounceRef.current = setTimeout(() => {
      if (ultimaUrlInspecionadaRef.current === urlLimpa) return;
      ultimaUrlInspecionadaRef.current = urlLimpa;
      void executarInspecaoGitHub(urlLimpa);
    }, 550);
  };

  const handleBranchSelect = (novaBranch: string) => {
    setBranch(novaBranch);
    emitirMudanca({ branch: novaBranch });

    const urlLimpa = urlPullRequest.trim();
    if (urlLimpa && onInspecionarGitHub) {
      void executarInspecaoGitHub(urlLimpa, novaBranch);
    }
  };

  const handleProjetoChange = (novoValor: string) => {
    const novoId = Number(novoValor);
    setProjetoId(novoId);

    const projetoSelecionado = projetos.find((p) => p.id === novoId);
    const urlDoProjeto = projetoSelecionado?.urlAlvo?.trim() || "";
    const proximaUrlAlvo =
      !urlAlvo.trim() && urlDoProjeto ? urlDoProjeto : urlAlvo;

    if (!urlAlvo.trim() && urlDoProjeto) {
      setUrlAlvo(urlDoProjeto);
    }

    emitirMudanca({ projetoId: novoId, urlAlvo: proximaUrlAlvo });
  };

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

  const dadosGitHub =
    inspecaoGitHub.status === "success" ? inspecaoGitHub.dados : null;

  const opcoesBranches: OpcaoSelect[] = dadosGitHub
    ? dadosGitHub.branches.map((b) => ({ valor: b, texto: b }))
    : [];

  const opcoesCommits: OpcaoSelect[] = dadosGitHub
    ? dadosGitHub.commits.map((c) => ({
        valor: c.sha,
        texto: `${c.shortSha} — ${c.titulo}`,
      }))
    : [];

  const erroGitHub =
    inspecaoGitHub.status === "error" ? inspecaoGitHub.mensagem : undefined;

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <h2 className={styles.titulo}>{titulo}</h2>

      <div className={styles.camposContainer}>
        <div className={styles.inputUrlGroup}>
          <div className={styles.containerInput}>
            <Input
              id="url-pull-request"
              label="Url da pull request ou repositório GitHub"
              placeholder="https://github.com/owner/repo ou /pull/12"
              temIcone={false}
              value={urlPullRequest}
              onChange={(e) => handleUrlPullRequestChange(e.target.value)}
              erro={erroUrl || erroGitHub}
              disabled={carregando}
            />
            {inspecaoGitHub.status === "loading" && (
              <p className={styles.statusGitHub}>
                Buscando branches e commits do repositório...
              </p>
            )}
            {dadosGitHub && (
              <p className={styles.statusGitHubSucesso}>
                Repositório: {dadosGitHub.owner}/{dadosGitHub.repositorio} •{" "}
                {dadosGitHub.branches.length} branch(es) e{" "}
                {dadosGitHub.commits.length} commit(s)
              </p>
            )}
          </div>

          <div className={styles.containerInput}>
            <Input
              id="url-alvo"
              label="Url da onde vai ser testado"
              placeholder="https://site-alvo.com.br"
              temIcone={false}
              value={urlAlvo}
              onChange={(e) => {
                setUrlAlvo(e.target.value);
                emitirMudanca({ urlAlvo: e.target.value });
              }}
              erro={erroUrlAlvo}
              disabled={carregando}
            />
          </div>

          <div className={styles.containerInputUrl}>
            <Select
              label="Projeto"
              placeholder={
                carregandoProjetos ? "Carregando..." : "Selecione o projeto"
              }
              opcoes={opcoesProjetos}
              value={projetoId ? String(projetoId) : ""}
              onChange={handleProjetoChange}
              disabled={carregando || carregandoProjetos}
            />

            {opcoesBranches.length > 0 ? (
              <Select
                label="Branch"
                placeholder="Selecione a branch"
                opcoes={opcoesBranches}
                value={branch}
                erro={erroBranch}
                onChange={handleBranchSelect}
                disabled={carregando || inspecaoGitHub.status === "loading"}
              />
            ) : (
              <Input
                id="branch"
                label="Branch"
                placeholder="feature/...."
                temIcone={false}
                value={branch}
                onChange={(e) => {
                  setBranch(e.target.value);
                  emitirMudanca({ branch: e.target.value });
                }}
                erro={erroBranch}
                disabled={carregando}
              />
            )}
          </div>

          <div className={styles.containerInput}>
            {opcoesCommits.length > 0 ? (
              <Select
                label="Commit"
                placeholder="Selecione o commit"
                opcoes={opcoesCommits}
                value={commit}
                erro={erroCommit}
                onChange={(novoCommit) => {
                  setCommit(novoCommit);
                  emitirMudanca({ commit: novoCommit });
                }}
                disabled={carregando || inspecaoGitHub.status === "loading"}
              />
            ) : (
              <Input
                id="commit"
                label="Commit"
                placeholder="SHA do commit (opcional)"
                temIcone={false}
                value={commit}
                onChange={(e) => {
                  setCommit(e.target.value);
                  emitirMudanca({ commit: e.target.value });
                }}
                erro={erroCommit}
                disabled={carregando}
              />
            )}
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
          onChange={(e) => {
            setDescricaoFluxo(e.target.value);
            emitirMudanca({ descricaoFluxo: e.target.value });
          }}
          erro={erroDescricao}
          disabled={carregando}
        />
      </div>

      <div className={styles.rodapeBotao}>
        <div className={styles.botaoWrapper}>
          <Botao
            type="submit"
            texto={carregando ? "Gerando Roteiro..." : textoBotao}
            variante="laranja"
            disabled={carregando}
          />
        </div>
      </div>
    </form>
  );
};

export default PromptCenario;
