import { useEffect, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { faBuilding, faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import Botao from "@/components/botao/botao";
import Input from "@/components/input/input";
import Select from "@/components/select/select";
import { useEmpresa } from "@/hooks/useEmpresa";
import { useProjeto } from "@/hooks/useProjeto";
import { toastErro, toastSucesso } from "@/utils/toast";
import type { CriarProjeto } from "@/@types/projeto";
import styles from "./ModalCriarProjeto.module.css";

interface ModalCriarProjetoProps {
  aberto: boolean;
  onFechar: () => void;
}

export default function ModalCriarProjetoConteudo({
  aberto,
  onFechar,
}: ModalCriarProjetoProps) {
  const { empresa } = useEmpresa();
  const { cadastrarProjeto } = useProjeto();

  const [nomeProjeto, setNomeProjeto] = useState<string>("");
  const [empresaSelecionada, setEmpresaSelecionada] = useState<number | undefined>(
    undefined
  );
  const [enviando, setEnviando] = useState<boolean>(false);
  const [tentouEnviar, setTentouEnviar] = useState<boolean>(false);

  useEffect(() => {
    if (aberto) {
      document.body.dataset.modalAberto = "true";
    } else {
      delete document.body.dataset.modalAberto;
      setTentouEnviar(false);
    }

    return () => {
      delete document.body.dataset.modalAberto;
    };
  }, [aberto]);

  if (!aberto) {
    return null;
  }

  function handleFechar() {
    if (enviando) return;
    setNomeProjeto("");
    setEmpresaSelecionada(undefined);
    setTentouEnviar(false);
    onFechar();
  }

  async function handleSalvar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (enviando) return;

    setTentouEnviar(true);

    if (!nomeProjeto.trim() || empresaSelecionada === undefined) {
      toastErro("Atenção, preencha todos os campos");
      return;
    }

    const novoProjeto: CriarProjeto = {
      nome: nomeProjeto.trim(),
      empresa: empresaSelecionada,
    };

    setEnviando(true);
    try {

    console.log(nomeProjeto);
    console.log(empresaSelecionada)
      const sucesso = await cadastrarProjeto(novoProjeto);

      if (sucesso) {
        toastSucesso("Projeto cadastrado com sucesso!");
        setNomeProjeto("");
        setEmpresaSelecionada(undefined);
        setTentouEnviar(false);
        onFechar();
      }
    } finally {
      setEnviando(false);
    }
  }

  const empresaInvalida = tentouEnviar && empresaSelecionada === undefined;

  return createPortal(
    <div className={styles.fundo}>
      <section
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="titulo-modal-criar-projeto"
      >
        <header className={styles.cabecalho}>
          <button
            type="button"
            className={styles.fechar}
            aria-label="Fechar modal"
            onClick={handleFechar}
            disabled={enviando}
          >
            ×
          </button>

          <h2 id="titulo-modal-criar-projeto">Cadastrar novo projeto</h2>
        </header>

        <form className={styles.formulario} onSubmit={handleSalvar} noValidate>
          <Input
            id="modal-nome-projeto"
            label="Nome do Projeto"
            tamanho="compacto"
            icone={faFolderOpen}
            placeholder="Ex: Portal Qore Analytics"
            value={nomeProjeto}
            onChange={(event) => setNomeProjeto(event.target.value)}
            disabled={enviando}
          />

          <div
            className={`${styles.campoSelect} ${
              empresaInvalida ? styles.campoSelectErro : ""
            }`}
          >
            <Select
              id="modal-empresa-projeto"
              label="Empresa"
              placeholder="Selecione uma empresa"
              icone={faBuilding}
              opcoes={empresa.map((item) => ({
                valor: String(item.id),
                texto: item.value,
              }))}
              value={
                empresaSelecionada !== undefined
                  ? String(empresaSelecionada)
                  : ""
              }
              onChange={(valor) => {
                if (valor === "") {
                  setEmpresaSelecionada(undefined);
                  return;
                }
                const idNumerico = Number(valor);
                setEmpresaSelecionada(
                  Number.isNaN(idNumerico) ? undefined : idNumerico
                );
              }}
              disabled={enviando}
            />
          </div>

          <div className={styles.acoes}>
            <Botao
              type="button"
              texto="Cancelar"
              variante="cancelar"
              onClick={handleFechar}
              disabled={enviando}
            />
            <Botao
              texto={enviando ? "Criando..." : "Cadastrar projeto"}
              type="submit"
              disabled={enviando}
            />
          </div>
        </form>
      </section>
    </div>,
    document.body
  );
}