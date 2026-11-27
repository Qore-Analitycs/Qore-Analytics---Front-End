import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Eraser, PenTool, ShieldCheck } from "lucide-react";
import Botao from "@/components/botao/botao";
import type {
  AssinaturaPerfilDto,
  AvaliacaoDodDto,
  TpDecisaoDod,
} from "@/@types/playwright";
import {
  extrairMensagemErroPlaywright,
  PlaywrightService,
} from "@/services/playwrightService";
import { toastErro, toastSucesso } from "@/utils/toast";
import styles from "./ModalAssinarDocumento.module.css";

export type ModalAssinarDocumentoProps = {
  aberto: boolean;
  execucaoId: number | null;
  tituloDocumento?: string;
  onFechar: () => void;
  onAssinado?: (avaliacao: AvaliacaoDodDto) => void;
};

type ConteudoModalAssinarProps = Omit<ModalAssinarDocumentoProps, "aberto">;

function ModalAssinarDocumentoConteudo({
  execucaoId,
  tituloDocumento,
  onFechar,
  onAssinado,
}: ConteudoModalAssinarProps) {
  const [perfilAssinatura, setPerfilAssinatura] =
    useState<AssinaturaPerfilDto | null>(null);
  const [carregandoPerfil, setCarregandoPerfil] = useState(true);
  const [erroAutenticacao, setErroAutenticacao] = useState<string | null>(null);

  const [modoAssinatura, setModoAssinatura] = useState<"salva" | "desenhar">(
    "desenhar"
  );
  const [decisaoParecer, setDecisaoParecer] =
    useState<TpDecisaoDod>("APROVADO_POR_QA");
  const [justificativaTecnica, setJustificativaTecnica] = useState("");
  const [salvarAssinatura, setSalvarAssinatura] = useState(false);
  const [termoAceito, setTermoAceito] = useState(false);
  const [canvasTemTraco, setCanvasTemTraco] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [erroFormulario, setErroFormulario] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const desenhandoRef = useRef(false);

  const limparCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setCanvasTemTraco(false);
  };

  useEffect(() => {
    let ativo = true;
    document.body.dataset.modalAberto = "true";

    const carregarPerfil = async () => {
      try {
        const dados = await PlaywrightService.obterMinhaAssinatura();
        if (!ativo) return;
        setPerfilAssinatura(dados);
        setModoAssinatura(dados.possuiAssinaturaSalva ? "salva" : "desenhar");
      } catch (error) {
        if (!ativo) return;
        setPerfilAssinatura(null);
        setModoAssinatura("desenhar");
        setErroAutenticacao(
          extrairMensagemErroPlaywright(
            error,
            "Faça login como QA ou ADMIN para assinar o documento."
          )
        );
      } finally {
        if (ativo) {
          setCarregandoPerfil(false);
        }
      }
    };

    void carregarPerfil();

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !enviando) {
        onFechar();
      }
    };
    document.addEventListener("keydown", handleEsc);

    return () => {
      ativo = false;
      delete document.body.dataset.modalAberto;
      document.removeEventListener("keydown", handleEsc);
    };
  }, [enviando, onFechar]);

  const obterCoordenadasCanvas = (
    e: React.PointerEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.setPointerCapture(e.pointerId);
    desenhandoRef.current = true;
    const { x, y } = obterCoordenadasCanvas(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineWidth = 2.4;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#1e293b";
    setCanvasTemTraco(true);
    if (erroFormulario) setErroFormulario(null);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!desenhandoRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { x, y } = obterCoordenadasCanvas(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!desenhandoRef.current) return;
    desenhandoRef.current = false;
    try {
      canvasRef.current?.releasePointerCapture(e.pointerId);
    } catch {
      // ignora caso já liberado
    }
  };

  const handleAssinar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (enviando || !execucaoId) return;

    if (!termoAceito) {
      setErroFormulario(
        "É obrigatório marcar que leu e concorda com o conteúdo deste documento."
      );
      return;
    }

    const justificativaLimpa = justificativaTecnica.trim();
    if (justificativaLimpa.length > 0 && justificativaLimpa.length < 20) {
      setErroFormulario(
        "Se informada, a justificativa técnica deve ter pelo menos 20 caracteres."
      );
      return;
    }

    let assinaturaBase64: string | undefined;
    if (modoAssinatura === "desenhar") {
      if (!canvasTemTraco || !canvasRef.current) {
        setErroFormulario(
          "Desenhe sua assinatura no quadro ou utilize a assinatura salva."
        );
        return;
      }
      assinaturaBase64 = canvasRef.current.toDataURL("image/png");
    } else if (perfilAssinatura?.assinaturaBase64) {
      assinaturaBase64 = perfilAssinatura.assinaturaBase64;
    } else {
      setErroFormulario("Nenhuma assinatura salva encontrada.");
      return;
    }

    setErroFormulario(null);
    setEnviando(true);

    try {
      const resultado = await PlaywrightService.assinarExecucao(execucaoId, {
        decisaoParecer,
        justificativaTecnica: justificativaLimpa || undefined,
        assinaturaBase64,
        salvarAssinatura:
          modoAssinatura === "desenhar" ? salvarAssinatura : false,
        termoAceito: true,
      });

      toastSucesso(
        `Documento da execução #${execucaoId} assinado com sucesso!`
      );
      onAssinado?.(resultado);
      onFechar();
    } catch (error) {
      const msg = extrairMensagemErroPlaywright(
        error,
        "Não foi possível assinar o documento DoD."
      );
      setErroFormulario(msg);
      toastErro(msg);
    } finally {
      setEnviando(false);
    }
  };

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div
      className={styles.overlay}
      onClick={(e) => {
        if (e.target === e.currentTarget && !enviando) onFechar();
      }}
    >
      <section
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="titulo-modal-assinar"
      >
        <header className={styles.cabecalho}>
          <div className={styles.tituloGrupo}>
            <span className={styles.eyebrow}>
              <ShieldCheck size={15} aria-hidden="true" />
              <span>Homologação Digital DoD</span>
            </span>
            <h2 id="titulo-modal-assinar" className={styles.titulo}>
              Assinar Roteiro e Evidências{" "}
              {execucaoId ? `(#${execucaoId})` : ""}
            </h2>
            {tituloDocumento && (
              <p className={styles.subtitulo}>{tituloDocumento}</p>
            )}
          </div>

          <button
            type="button"
            className={styles.fechar}
            onClick={onFechar}
            disabled={enviando}
            aria-label="Fechar modal"
          >
            ×
          </button>
        </header>

        <form className={styles.formulario} onSubmit={handleAssinar}>
          {carregandoPerfil ? (
            <p className={styles.avisoCarregando}>
              Carregando dados do assinante...
            </p>
          ) : erroAutenticacao ? (
            <div className={styles.alertaAuth} role="alert">
              <p>{erroAutenticacao}</p>
              <Link href="/login" className={styles.linkLogin}>
                Ir para tela de Login
              </Link>
            </div>
          ) : (
            perfilAssinatura && (
              <div className={styles.cardAssinante}>
                <span className={styles.rotuloAssinante}>Assinando como:</span>
                <strong className={styles.valorAssinante}>
                  {perfilAssinatura.assinandoComoTexto}
                </strong>
              </div>
            )
          )}

          {/* Parecer DoD */}
          <div className={styles.campoGrupo}>
            <label className={styles.label}>Parecer de Homologação (DoD)</label>
            <div className={styles.decisaoGrid}>
              <button
                type="button"
                className={`${styles.btnDecisao} ${
                  decisaoParecer === "APROVADO_POR_QA"
                    ? styles.btnDecisaoAprovado
                    : ""
                }`}
                onClick={() => setDecisaoParecer("APROVADO_POR_QA")}
              >
                Aprovar (APROVADO_POR_QA)
              </button>
              <button
                type="button"
                className={`${styles.btnDecisao} ${
                  decisaoParecer === "REPROVADO_POR_QA"
                    ? styles.btnDecisaoReprovado
                    : ""
                }`}
                onClick={() => setDecisaoParecer("REPROVADO_POR_QA")}
              >
                Reprovar (REPROVADO_POR_QA)
              </button>
            </div>
          </div>

          {/* Assinatura */}
          <div className={styles.campoGrupo}>
            <div className={styles.assinaturaTopo}>
              <label className={styles.label}>Assinatura Digital</label>
              <div className={styles.abasAssinatura}>
                {perfilAssinatura?.possuiAssinaturaSalva && (
                  <button
                    type="button"
                    className={`${styles.btnAba} ${
                      modoAssinatura === "salva" ? styles.btnAbaAtiva : ""
                    }`}
                    onClick={() => setModoAssinatura("salva")}
                  >
                    Usar salva
                  </button>
                )}
                <button
                  type="button"
                  className={`${styles.btnAba} ${
                    modoAssinatura === "desenhar" ? styles.btnAbaAtiva : ""
                  }`}
                  onClick={() => setModoAssinatura("desenhar")}
                >
                  <PenTool size={13} aria-hidden="true" />
                  <span>Desenhar</span>
                </button>
              </div>
            </div>

            {modoAssinatura === "salva" && perfilAssinatura?.assinaturaBase64 ? (
              <div className={styles.previewAssinaturaSalva}>
                <img
                  src={perfilAssinatura.assinaturaBase64}
                  alt="Assinatura salva no perfil"
                  className={styles.imagemAssinaturaSalva}
                />
              </div>
            ) : (
              <div className={styles.canvasWrapper}>
                <canvas
                  ref={canvasRef}
                  width={540}
                  height={160}
                  className={styles.canvas}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerLeave={handlePointerUp}
                />
                <div className={styles.canvasRodape}>
                  <span className={styles.dicaCanvas}>
                    Assine com o mouse ou toque dentro do quadro
                  </span>
                  <button
                    type="button"
                    className={styles.btnLimpar}
                    onClick={limparCanvas}
                  >
                    <Eraser size={13} aria-hidden="true" />
                    <span>Limpar</span>
                  </button>
                </div>
              </div>
            )}

            {modoAssinatura === "desenhar" && (
              <label className={styles.checkboxLinha}>
                <input
                  type="checkbox"
                  checked={salvarAssinatura}
                  onChange={(e) => setSalvarAssinatura(e.target.checked)}
                />
                <span>Salvar esta assinatura como padrão no meu perfil</span>
              </label>
            )}
          </div>

          {/* Justificativa */}
          <div className={styles.campoGrupo}>
            <label
              htmlFor="justificativa-dod"
              className={styles.label}
            >
              Justificativa Técnica (opcional — mín. 20 caracteres se informada)
            </label>
            <textarea
              id="justificativa-dod"
              rows={3}
              className={styles.textarea}
              placeholder="Descreva observações da homologação ou deixe em branco para gerar parecer padrão..."
              value={justificativaTecnica}
              onChange={(e) => setJustificativaTecnica(e.target.value)}
            />
          </div>

          {/* Termo obrigatório */}
          <label className={styles.checkboxTermo}>
            <input
              type="checkbox"
              checked={termoAceito}
              onChange={(e) => {
                setTermoAceito(e.target.checked);
                if (erroFormulario) setErroFormulario(null);
              }}
            />
            <span>
              Li e concordo com o conteúdo deste documento e confirmo sua
              assinatura digital para fins de auditoria DoD.
            </span>
          </label>

          {erroFormulario && (
            <p className={styles.erroBox} role="alert">
              {erroFormulario}
            </p>
          )}

          <div className={styles.acoes}>
            <Botao
              type="button"
              texto="Cancelar"
              variante="cancelar"
              tamanho="compacto"
              disabled={enviando}
              onPress={onFechar}
            />
            <Botao
              type="submit"
              texto={enviando ? "Assinando..." : "Assinar Documento"}
              variante="laranja"
              tamanho="compacto"
              disabled={enviando || Boolean(erroAutenticacao) || !execucaoId}
            />
          </div>
        </form>
      </section>
    </div>,
    document.body
  );
}

const ModalAssinarDocumento = ({
  aberto,
  ...props
}: ModalAssinarDocumentoProps) => {
  if (!aberto) {
    return null;
  }

  return <ModalAssinarDocumentoConteudo {...props} />;
};

export default ModalAssinarDocumento;
