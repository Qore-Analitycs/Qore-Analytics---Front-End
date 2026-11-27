import { useEffect, useState, type FormEvent } from "react";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import Botao from "@/components/botao/botao";
import Input from "@/components/input/input";
import Select, { type OpcaoSelect } from "@/components/select/select";
import type {
  ModalCriarProjetoProps,
  OpcaoEmpresaProjeto,
} from "@/@types/projeto";
import styles from "./ModalCriarProjeto.module.css";

const normalizarEmpresas = (empresas: OpcaoEmpresaProjeto[]): OpcaoSelect[] =>
  empresas.map((item) =>
    typeof item === "string" ? { valor: item, texto: item } : item
  );

type ConteudoModalProjetoProps = Omit<ModalCriarProjetoProps, "isOpen">;

/**
 * Conteúdo interno montado apenas enquanto o modal está aberto,
 * garantindo estado limpo a cada abertura.
 */
function ModalCriarProjetoConteudo({
  onClose,
  onCreate,
  empresas,
  isSubmitting = false,
  errorMessage = null,
}: ConteudoModalProjetoProps) {
  const [nomeProjeto, setNomeProjeto] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [erroProjeto, setErroProjeto] = useState("");
  const [erroEmpresa, setErroEmpresa] = useState("");
  const [erroSubmit, setErroSubmit] = useState<string | null>(null);
  const [enviandoInterno, setEnviandoInterno] = useState(false);
  const [selectKey, setSelectKey] = useState(0);

  const enviando = isSubmitting || enviandoInterno;
  const opcoesEmpresas = normalizarEmpresas(empresas);

  const resetarCampos = () => {
    setNomeProjeto("");
    setEmpresa("");
    setErroProjeto("");
    setErroEmpresa("");
    setErroSubmit(null);
    setSelectKey((prev) => prev + 1);
  };

  const handleFechar = () => {
    if (enviando) return;
    resetarCampos();
    onClose();
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !enviando) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [enviando, onClose]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (enviando) return;

    const projetoLimpo = nomeProjeto.trim();
    const empresaLimpa = empresa.trim();
    let valido = true;

    if (!projetoLimpo) {
      setErroProjeto("Informe o nome do projeto.");
      valido = false;
    }

    if (!empresaLimpa) {
      setErroEmpresa("Selecione uma empresa.");
      valido = false;
    }

    if (!valido) return;

    setErroSubmit(null);
    setEnviandoInterno(true);

    try {
      await onCreate({
        projeto: projetoLimpo,
        empresa: empresaLimpa,
        nUsuarios: 0,
        status: "Ativo",
      });
      resetarCampos();
    } catch {
      setErroSubmit("Não foi possível criar o projeto. Tente novamente.");
    } finally {
      setEnviandoInterno(false);
    }
  };

  const mensagemErroExibida = errorMessage || erroSubmit;

  return (
    <div
      className={styles.fundo}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          handleFechar();
        }
      }}
    >
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
            onClick={handleFechar}
            disabled={enviando}
            aria-label="Fechar modal"
          >
            ×
          </button>

          <h2 id="titulo-modal-criar-projeto">Cadastrar novo projeto</h2>
        </header>

        <form className={styles.formulario} onSubmit={handleSubmit} noValidate>
          <Input
            id="modal-nome-projeto"
            label="Nome do Projeto"
            tamanho="compacto"
            icone={faFolderOpen}
            placeholder="Ex: Portal Qore Analytics"
            value={nomeProjeto}
            erro={erroProjeto}
            disabled={enviando}
            onChange={(event) => {
              setNomeProjeto(event.target.value);
              if (erroProjeto) setErroProjeto("");
            }}
          />

          <div
            className={`${styles.campoSelect} ${erroEmpresa ? styles.campoSelectErro : ""
              }`}
          >
            <Select
              key={selectKey}
              label="Empresa"
              tamanho="compacto"
              placeholder="Selecione uma empresa"
              opcoes={opcoesEmpresas}
              valor={empresa}
              disabled={enviando}
              onChange={(valor) => {
                setEmpresa(valor);
                if (erroEmpresa) setErroEmpresa("");
              }}
            />
            {erroEmpresa && (
              <span className={styles.mensagemErro}>{erroEmpresa}</span>
            )}
          </div>

          {mensagemErroExibida && (
            <p className={styles.erroGeral} role="alert">
              {mensagemErroExibida}
            </p>
          )}

          <div className={styles.acoes}>
            <Botao
              type="button"
              onClick={handleFechar}
              texto="Cancelar"
              variante="cancelar"
              tamanho="compacto"
              disabled={enviando}
            />
            <Botao
              texto={enviando ? "Criando..." : "Criar"}
              variante="laranja"
              tamanho="compacto"
              type="submit"
              disabled={enviando}
            />
          </div>
        </form>
      </section>
    </div>
  );
}

/**
 * Modal para criação de um novo projeto na tela de Gerenciamento de Projetos.
 */
export default function ModalCriarProjeto({
  isOpen,
  ...props
}: ModalCriarProjetoProps) {
  if (!isOpen) {
    return null;
  }

  return <ModalCriarProjetoConteudo {...props} />;
}
