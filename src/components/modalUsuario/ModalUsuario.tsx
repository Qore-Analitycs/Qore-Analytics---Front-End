import { useState, type FormEvent } from "react";
import styles from "./ModalUsuario.module.css";
import Botao from "../botao/botao";
import Input from "../input/input";
import {
  faBuilding,
  faEnvelope,
  faLock,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import SelecoesCargos from "../selecaoCargo/selecoesCargo";
import { useUsuario } from "@/hooks/useUsuario";
import { toastErro, toastSucesso } from "@/utils/toast";
import { CriarUsuario } from "@/@types/usuario";
import Select from "../select/select";
import { useEmpresa } from "@/hooks/useEmpresa";

interface ModalUsuarioProps {
  aberto: boolean;
  onFechar: () => void;
  onUsuarioCriado?: () => void;
}

export default function ModalUsuario({ aberto, onFechar }: ModalUsuarioProps) {
  const { cadastrarU } = useUsuario();
  const { empresa } = useEmpresa();

  const [nomeUsuario, setNomeUsuario] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [cargoSelecionado, setCargoSelecionado] = useState<number>();
  const [enviando, setEnviando] = useState<boolean>(false);
  const [empresaSelecionado, setEmpresaSelecionado] = useState<number>();

  if (!aberto) {
    return null;
  }

  async function handleSalvar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (enviando) return;

    if (
      !nomeUsuario.trim() ||
      !email.trim() ||
      empresaSelecionado === undefined ||
      !senha.trim() ||
      !cargoSelecionado
    ) {
      toastErro("Atenção, preencha todos os campos");
      return;
    }

    const novoU: CriarUsuario = {
      nome: nomeUsuario.trim(),
      email: email.trim(),
      empresa: empresaSelecionado,
      senha,
      perfilId: cargoSelecionado,
    };

    setEnviando(true);
    const sucesso = await cadastrarU(novoU);
    setEnviando(false);

    if (sucesso) {
      toastSucesso("Cadastro de Usuário realizado com sucesso");
      setNomeUsuario("");
      setEmail("");
      setEmpresaSelecionado(undefined);
      setCargoSelecionado(undefined);
      setSenha("");
      onUsuarioCriado?.();
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
            disabled={enviando}
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
              id="empresa-usuario"
              label="Empresa"
              placeholder="Selecione uma empresa"
              icone={faBuilding}
              opcoes={empresa.map((item) => ({
                valor: String(item.id),
                texto: item.value,
              }))}
              value={
                empresaSelecionado !== undefined
                  ? String(empresaSelecionado)
                  : ""
              }
              onChange={(valor) => {
                setEmpresaSelecionado(valor !== "" ? Number(valor) : undefined);
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