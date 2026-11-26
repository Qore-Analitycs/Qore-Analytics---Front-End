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
import Select, { OpcaoSelect } from "../select/select";

interface ModalUsuarioProps {
  aberto: boolean;
  onFechar: () => void;
  onUsuarioCriado?: () => void;
}

const EMPRESAS_MOCK: OpcaoSelect[] = [
  { valor: "alfaSolucoes", texto: "Alfa Soluções" },
  { valor: "betaSistemas", texto: "Beta Sistemas" },
  { valor: "gamaTecnologia", texto: "Gama Tecnologia" },
];

export default function ModalUsuario({
  aberto,
  onFechar,
  onUsuarioCriado,
}: ModalUsuarioProps) {
  const { cadastrarU } = useUsuario({
    carregarAutomaticamente: false,
    buscarPerfilLogado: false,
  });
  const [nomeUsuario, setNomeUsuario] = useState<string>("");
  const [empresa, setEmpresa] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [cargoSelecionado, setCargoSelecionado] = useState<number>();
  const [enviando, setEnviando] = useState<boolean>(false);

  if (!aberto) {
    return null;
  }

  async function handleSalvar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (enviando) return;

    if (
      !nomeUsuario.trim() ||
      !email.trim() ||
      !empresa.trim() ||
      !senha.trim() ||
      !cargoSelecionado
    ) {
      toastErro("Atenção, preencha todos os campos");
      return;
    }

    const novoU: CriarUsuario = {
      nome: nomeUsuario.trim(),
      email: email.trim(),
      empresa,
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
      setEmpresa("");
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
              opcoes={EMPRESAS_MOCK}
              value={empresa}
              onChange={(valor) => setEmpresa(valor)}
              disabled={enviando}
            />
          </div>

          <SelecoesCargos
            cargoSelecionado={
              cargoSelecionado ? String(cargoSelecionado) : ""
            }
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
