import { useEffect, useState, type FormEvent } from "react";
import styles from "./ModalPerfil.module.css";
import Input from "../input/input";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import Botao from "../botao/botao";
import { createPortal } from "react-dom";

// Propriedades recebidas pelo componente
interface ModalPerfilProps {
  aberto: boolean;
  onFechar: () => void;
}

export default function ModalPerfil({ aberto, onFechar }: ModalPerfilProps) {
  const [nome, setNome] = useState("Nome completo");
  const [email, setEmail] = useState("nome@email.com");

  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarNovaSenha, setConfirmarNovaSenha] = useState("");

  const [mostrarSenhas, setMostrarSenhas] = useState(false);

  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErro("");
    setSucesso("");

    if (!nome.trim() || !email.trim()) {
      setErro("Preencha o nome e o email.");
      return;
    }

    const desejaTrocarSenha = Boolean(
      senhaAtual || novaSenha || confirmarNovaSenha,
    );

    if (desejaTrocarSenha) {
      if (!senhaAtual) {
        setErro("Informe a senha atual.");
        return;
      }

      if (novaSenha.length < 8) {
        setErro("A nova senha precisa ter pelo menos 8 caracteres.");
        return;
      }

      if (novaSenha !== confirmarNovaSenha) {
        setErro("As senhas não correspondem.");
        return;
      }
    }

    setSucesso(
      "Dados validados! A integração com a API ainda precisa ser implementada.",
    );
  }
  
    useEffect(() => {
      if (aberto) {
        document.body.dataset.modalAberto = "true";
      } else {
        delete document.body.dataset.modalAberto;
      }
  
      return () => {
        delete document.body.dataset.modalAberto;
      };
    }, [aberto]);

  if (!aberto) {
    return null;
  }

  return createPortal(
    <div className={styles.overlay} onClick={onFechar}>
      <section
        className={styles.modal}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="titulo-modal"
      >
        {/* ==================================
                    COLUNA LATERAL
                ================================== */}

        <aside className={styles.sidebar}>
          {/* Avatar */}

          <div className={styles.avatar}>
            {nome.trim().charAt(0).toUpperCase() || "M"}
          </div>

          <h2>{nome}</h2>

          <p className={styles.emailSidebar}>{email}</p>

          {/* Identificação do usuário */}
          <div className={styles.statusRow}>
            <span className={styles.roleBadge}>
              <img src="/func.png" alt="" className={styles.inputIcon} />
              Funç
            </span>

            <span className={styles.statusBadge}>Ativo</span>
          </div>

          <div className={styles.sidebarDivider}></div>

          {/* Informações complementares */}
          <div className={styles.profileInfo}>
            <div className={styles.metaItem}>
              <span>Empresa</span>
              <strong>Nome empresa</strong>
            </div>

            <div className={styles.metaItem}>
              <span>Membro desde</span>
              <strong>05/06/2025</strong>
            </div>
          </div>
        </aside>

        {/* ==================================
                    ÁREA PRINCIPAL
                ================================== */}

        <div className={styles.content}>
          {/* Botão fechar */}

          <button
            type="button"
            className={styles.closeButton}
            onClick={onFechar}
            aria-label="Fechar modal"
          >
            ×
          </button>

          <p className={styles.eyebrow}>Meu perfil</p>

          <h1 id="titulo-modal">Edite seu perfil</h1>

          {/* ==================================
                        FORMULÁRIO
                    ================================== */}

          <form className={styles.form} onSubmit={handleSubmit}>
            {/* Campo nome */}

            <div className={styles.field}>
              <Input
                label="Nome"
                tamanho="compacto"
                placeholder="Nome completo"
                icone={faUser}
              />
            </div>

            {/* Campo email */}

            <div className={styles.field}>
              <Input
                label="Email"
                tamanho="compacto"
                placeholder="email@email.com"
                icone={faEnvelope}
              />
            </div>

            {/* ==================================
                            ALTERAÇÃO DE SENHA
                        ================================== */}

            <div className={styles.sectionHeading}>
              <span>Alterar senha</span>
            </div>

            {/* Senha atual */}
            <div className={styles.field}>
              <Input
                label="Senha atual"
                placeholder="********"
                icone={faLock}
                type="password"
                tamanho="compacto"
              />
            </div>

            {/* Nova senha e confirmação */}

            <div className={styles.twoColumns}>
              <div className={styles.field}>
                <Input
                  label="Nova senha"
                  tamanho="compacto"
                  placeholder="Nova senha"
                  icone={faLock}
                />
              </div>

              <div className={styles.field}>
                <Input
                  label="Confirmar nova senha"
                  tamanho="compacto"
                  placeholder="Repita a senha"
                  icone={faLock}
                />
              </div>
            </div>

            <p className={styles.formNote}>
              Mínimo de 8 caracteres. Deixe em branco para manter a senha atual.
            </p>

            {/* Mensagens de validação */}

            {erro && (
              <p className={styles.feedbackError} role="alert">
                {erro}
              </p>
            )}

            {sucesso && (
              <p className={styles.feedbackSuccess} role="status">
                {sucesso}
              </p>
            )}

            {/* ==================================
                            BOTÕES
                        ================================== */}

            <div className={styles.formActions}>
              <div className={styles.containerBotao} onClick={onFechar}>
                <Botao
                  variante="cancelar"
                  texto="Cancelar"
                  tamanho="compacto"
                />
              </div>
              <div className={styles.containerBotao}>
                <Botao
                  variante="laranja"
                  texto="Salvar alterações"
                  tamanho="compacto"
                />
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>,
    document.body,
  );
}
