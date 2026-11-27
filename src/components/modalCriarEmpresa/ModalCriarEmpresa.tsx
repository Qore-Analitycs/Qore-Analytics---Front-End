import { FormEvent, useCallback, useEffect, useState } from "react";
import { faBuilding } from "@fortawesome/free-solid-svg-icons";
import Botao from "@/components/botao/botao";
import Input from "@/components/input/input";
import { ModalCriarEmpresaProps } from "@/@types/empresa";
import styles from "./ModalCriarEmpresa.module.css";

type ModalCriarEmpresaConteudoProps = Omit<ModalCriarEmpresaProps, "isOpen">;

/**
 * Conteúdo montado apenas enquanto o modal está aberto para garantir limpeza natural do formulário.
 */
function ModalCriarEmpresaConteudo({
  onClose,
  onCreate,
  isSubmitting = false,
  errorMessage = null,
}: ModalCriarEmpresaConteudoProps) {
  const [empresa, setEmpresa] = useState("");
  const [erroEmpresa, setErroEmpresa] = useState("");
  const [enviandoLocal, setEnviandoLocal] = useState(false);

  const bloqueado = Boolean(isSubmitting || enviandoLocal);

  const resetarCampos = useCallback(() => {
    setEmpresa("");
    setErroEmpresa("");
  }, []);

  const handleFechar = useCallback(() => {
    if (bloqueado) return;
    resetarCampos();
    onClose();
  }, [bloqueado, onClose, resetarCampos]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleFechar();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleFechar]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (bloqueado) return;

    const nomeNormalizado = empresa.trim();
    if (!nomeNormalizado) {
      setErroEmpresa("Informe o nome da empresa.");
      return;
    }

    setErroEmpresa("");
    setEnviandoLocal(true);

    try {
      await onCreate({
        empresa: nomeNormalizado,
        nProjetos: 0,
        status: "Ativo",
      });
    } finally {
      setEnviandoLocal(false);
    }
  };

  return (
    <div
      className={styles.fundo}
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          handleFechar();
        }
      }}
    >
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-criar-empresa-titulo"
      >
        <header className={styles.cabecalho}>
          <button
            type="button"
            className={styles.fechar}
            onClick={handleFechar}
            disabled={bloqueado}
            aria-label="Fechar modal"
          >
            ×
          </button>

          <h2 id="modal-criar-empresa-titulo" className={styles.titulo}>
            Criar nova Empresa
          </h2>
        </header>

        <form className={styles.formulario} onSubmit={handleSubmit} noValidate>
          <div className={styles.grupoCampo}>
            <Input
              id="modal-criar-empresa-nome"
              label="Nome da Empresa"
              tamanho="compacto"
              icone={faBuilding}
              placeholder="Ex: Vektor Tech (HQ)"
              value={empresa}
              erro={erroEmpresa || undefined}
              disabled={bloqueado}
              autoFocus
              onChange={(event) => {
                setEmpresa(event.target.value);
                if (erroEmpresa) setErroEmpresa("");
              }}
            />
          </div>

          {errorMessage && (
            <p className={styles.erroServidor} role="alert">
              {errorMessage}
            </p>
          )}

          <div className={styles.acoes}>
            <Botao
              variante="cancelar"
              tamanho="compacto"
              texto="Cancelar"
              type="button"
              disabled={bloqueado}
              onPress={handleFechar}
            />
            <Botao
              variante="laranja"
              tamanho="compacto"
              texto={bloqueado ? "Criando..." : "Criar"}
              type="submit"
              disabled={bloqueado}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

/**
 * Modal de criação de empresa para a tela de Gerenciamento de Empresa.
 */
export default function ModalCriarEmpresa({
  isOpen,
  ...rest
}: ModalCriarEmpresaProps) {
  if (!isOpen) return null;
  return <ModalCriarEmpresaConteudo {...rest} />;
}
