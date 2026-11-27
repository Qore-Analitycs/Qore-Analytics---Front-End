import { useEffect, useState, type FormEvent } from "react";
import styles from "./ModalPerfil.module.css";
import Input from "../input/input";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import Botao from "../botao/botao";
import { createPortal } from "react-dom";
import { logout } from "@/services/authService";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useUsuario } from "@/hooks/useUsuario";
import * as yup from "yup";
import { atualizarUsuarioSchema } from "@/hooks/useValidacao";
import type { AtualizarUsuario } from "@/@types/usuario";
import { UsuarioService } from "@/services/usuarioService";

interface ModalPerfilProps {
  aberto: boolean;
  onFechar: () => void;
}

export default function ModalPerfil({ aberto, onFechar }: ModalPerfilProps) {
  const router = useRouter();
  const { atualizarU } = useUsuario();

  const [usuarioId, setUsuarioId] = useState("");
  const [nome, setNome] = useState<string>("");
  const [email, setEmail] = useState("");
  const [cargo, setCargo] = useState("");
  const [pathFoto, setPathFoto] = useState<string | null>(null);

  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarNovaSenha, setConfirmarNovaSenha] = useState("");

  const [mostrarSenhas, setMostrarSenhas] = useState(false);
  const [erros, setErros] = useState<Record<string, string>>({});
  const [carregando, setCarregando] = useState(false);

  // Buscar dados do usuário logado
  async function getMe() {
    try {
      setCarregando(true);

      const dados = await UsuarioService.getMe();

      setUsuarioId(dados.id || dados.Id || "");
      setNome(dados.nome || dados.Nome || "");
      setEmail(dados.email || dados.Email || "");
      setCargo(dados.cargo || dados.Cargo || "");
      setPathFoto(dados.pathFoto || dados.PathFoto || null);
    } catch (error) {
      console.error(error);
    } finally {
      setCarregando(false);
    }
  }

  // Buscar dados quando abrir o modal
  useEffect(() => {
    if (aberto) {
      getMe();
    }
  }, [aberto]);

  // Logout
  async function logoutUsuario() {
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      toast.error("Erro ao fazer logout");
    }
  }

  // Controle do modal
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

  // Atualizar perfil
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErros({});

    try {
      await atualizarUsuarioSchema.validate(
        {
          nome,
          email,
          senhaAtual,
          novaSenha,
          confirmarNovaSenha,
        },
        {
          abortEarly: false,
        }
      );

      if (!usuarioId) {
        toast.error("Não foi possível identificar o usuário.");
        return;
      }

      const dados: AtualizarUsuario = {
        Nome: nome,
        Email: email,
        ...(senhaAtual ? { SenhaAtual: senhaAtual } : {}),
        ...(novaSenha ? { NovaSenha: novaSenha } : {}),
        ...(confirmarNovaSenha
          ? { ConfirmarNovaSenha: confirmarNovaSenha }
          : {}),
      };

      const sucesso = await atualizarU(usuarioId, dados);

      if (sucesso) {
        setSenhaAtual("");
        setNovaSenha("");
        setConfirmarNovaSenha("");

        onFechar();
      }
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const novosErros: Record<string, string> = {};

        error.inner.forEach((item) => {
          if (item.path) {
            novosErros[item.path] = item.message;
          }
        });

        setErros(novosErros);
      }
    }
  }

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
        {/* COLUNA LATERAL */}
        <aside className={styles.sidebar}>
          {/* Avatar */}
          <div className={styles.avatar}>
            {pathFoto ? (
              <img src={pathFoto} alt="Foto de perfil" />
            ) : (
              nome.trim().charAt(0).toUpperCase() || "M"
            )}
          </div>

          <h2>{carregando ? "Carregando..." : nome}</h2>

          <p className={styles.emailSidebar}>{email}</p>

          {/* Identificação do usuário */}
          <div className={styles.statusRow}>
            <span className={styles.roleBadge}>
              <img src="/func.png" alt="" className={styles.inputIcon} />
              {cargo || "Função"}
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

          <div className={styles.containerLogout} onClick={logoutUsuario}>
            <Botao tamanho="compacto" texto="Logout" variante="alternativo" />
          </div>
        </aside>

        {/* ÁREA PRINCIPAL */}
        <div className={styles.content}>
          <button
            type="button"
            className={styles.fechar}
            onClick={onFechar}
            aria-label="Fechar modal"
          >
            ×
          </button>

          <p className={styles.eyebrow}>Meu perfil</p>

          <h1 id="titulo-modal">Edite seu perfil</h1>

          {/* FORMULÁRIO */}
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            {/* Nome */}
            <div className={styles.field}>
              <Input
                label="Nome"
                tamanho="compacto"
                placeholder="Nome completo"
                icone={faUser}
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />

              {erros.nome && (
                <p className={styles.feedbackError}>{erros.nome}</p>
              )}
            </div>

            {/* Email */}
            <div className={styles.field}>
              <Input
                label="Email"
                tamanho="compacto"
                placeholder="email@email.com"
                icone={faEnvelope}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              {erros.email && (
                <p className={styles.feedbackError}>{erros.email}</p>
              )}
            </div>

            {/* ALTERAÇÃO DE SENHA */}
            <div className={styles.sectionHeading}>
              <span>Alterar senha</span>
            </div>

            {/* Senha atual */}
            <div className={styles.field}>
              <Input
                label="Senha atual"
                placeholder="********"
                icone={faLock}
                type={mostrarSenhas ? "text" : "password"}
                tamanho="compacto"
                value={senhaAtual}
                onChange={(e) => setSenhaAtual(e.target.value)}
              />

              {erros.senhaAtual && (
                <p className={styles.feedbackError}>{erros.senhaAtual}</p>
              )}
            </div>

            {/* Nova senha e confirmação */}
            <div className={styles.twoColumns}>
              <div className={styles.field}>
                <Input
                  label="Nova senha"
                  tamanho="compacto"
                  placeholder="Nova senha"
                  icone={faLock}
                  type={mostrarSenhas ? "text" : "password"}
                  value={novaSenha}
                  onChange={(e) => setNovaSenha(e.target.value)}
                />

                {erros.novaSenha && (
                  <p className={styles.feedbackError}>{erros.novaSenha}</p>
                )}
              </div>

              <div className={styles.field}>
                <Input
                  label="Confirmar nova senha"
                  tamanho="compacto"
                  placeholder="Repita a senha"
                  icone={faLock}
                  type={mostrarSenhas ? "text" : "password"}
                  value={confirmarNovaSenha}
                  onChange={(e) => setConfirmarNovaSenha(e.target.value)}
                />

                {erros.confirmarNovaSenha && (
                  <p className={styles.feedbackError}>
                    {erros.confirmarNovaSenha}
                  </p>
                )}
              </div>
            </div>

            <p className={styles.formNote}>
              Mínimo de 8 caracteres. Deixe em branco para manter a senha atual.
            </p>

            {/* BOTÕES */}
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
                  type="submit"
                  disabled={carregando}
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
    document.body
  );
}