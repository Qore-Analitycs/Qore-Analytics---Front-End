import { useState, type FormEvent } from "react";
import styles from "./ModalUsuario.module.css";
import Botao from "../botao/botao";
import Input from "../input/input";
import {
  faDiagramProject,
  faEnvelope,
  faLock,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import SelecoesCargos from "../selecaoCargo/selecoesCargo";
import { useUsuario } from "@/hooks/useUsuario";
import { toastErro, toastSucesso } from "@/utils/toast";
import { CriarUsuario } from "@/@types/usuario";
import Select from "../select/select";
import { useProjeto } from "@/hooks/useProjeto";

interface ModalUsuarioProps {
  aberto: boolean;
  onFechar: () => void;
}

export default function ModalUsuario({ aberto, onFechar }: ModalUsuarioProps) {
  const { cadastrarU } = useUsuario();
  const { projetos } = useProjeto();

  const [nomeUsuario, setNomeUsuario] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [cargoSelecionado, setCargoSelecionado] = useState<number>();
  const [enviando, setEnviando] = useState<boolean>(false);
  const [projetoSelecionado, setProjetoSelecionado] = useState<number>();

  if (!aberto) {
    return null;
  }

  async function handleSalvar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (enviando) return;

    if (
      !nomeUsuario.trim() ||
      !email.trim() ||
      projetoSelecionado === undefined ||
      !senha.trim() ||
      !cargoSelecionado
    ) {
      toastErro("Atenção, preencha todos os campos");
      return;
    }

    const novoU: CriarUsuario = {
      nome: nomeUsuario.trim(),
      email: email.trim(),
      projeto: projetoSelecionado,
      senha,
      perfilId: cargoSelecionado,
    };

    setEnviando(true);
    try {
      const sucesso = await cadastrarU(novoU);

      if (sucesso) {
        toastSucesso("Cadastro de Usuário realizado com sucesso");
        setNomeUsuario("");
        setEmail("");
        setProjetoSelecionado(undefined);
        setCargoSelecionado(undefined);
        setSenha("");
        onFechar();
      }
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div
      className={styles.fundo}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onFechar();
        }
      }}
    >
      <section
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="titulo-modal"
      >
        <header className={styles.cabecalho}>
          <button
            type="button"
            className={styles.fechar}
            onClick={onFechar}
            aria-label="Fechar modal"
          >
            ×
          </button>

          <h2 id="titulo-modal">Crie uma conta corporativa</h2>
        </header>

        <form className={styles.formulario} onSubmit={handleSalvar}>
          <Input
            id="nome-usuario"
            label="Nome"
            icone={faUser}
            placeholder="Nome completo"
            value={nomeUsuario}
            onChange={(event) => setNomeUsuario(event.target.value)}
            disabled={enviando}
          />

          <Input
            id="email-usuario"
            icone={faEnvelope}
            label="Email"
            placeholder="email@email.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={enviando}
          />

          <div className={styles.campoEmpresa}>
            <Select
              id="projeto-usuario"
              label="Projeto"
              placeholder="Selecione um projeto"
              icone={faDiagramProject}
              opcoes={projetos.map((item) => ({
                valor: String(item.id),
                texto: item.nome,
              }))}
              value={
                projetoSelecionado !== undefined
                  ? String(projetoSelecionado)
                  : ""
              }
              onChange={(valor) => {
                setProjetoSelecionado(valor !== "" ? Number(valor) : undefined);
              }}
              disabled={enviando}
            />
          </div>

          <SelecoesCargos
            cargoSelecionado={cargoSelecionado ? String(cargoSelecionado) : ""}
            onSelect={(id) => setCargoSelecionado(Number(id))}
          />

          <Input
            id="senha-usuario"
            icone={faLock}
            label="Senha provisória"
            placeholder="••••••••••••••••••••"
            type="password"
            value={senha}
            onChange={(event) => setSenha(event.target.value)}
            disabled={enviando}
          />

          <div className={styles.acoes}>
            <Botao
              type="button"
              onClick={onFechar}
              texto="Cancelar"
              variante="cancelar"
              disabled={enviando}
            />
            <Botao
              texto={enviando ? "Criando..." : "Criar novo usuário"}
              type="submit"
              disabled={enviando}
            />
          </div>
        </form>
      </section>
    </div>
  );
}