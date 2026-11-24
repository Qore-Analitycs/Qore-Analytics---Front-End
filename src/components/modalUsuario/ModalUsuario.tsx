import { use, useState, type FormEvent } from "react";
import styles from "./ModalUsuario.module.css";
import Botao from "../botao/botao";
import Input from "../input/input";
import {
  faEnvelope,
  faLock,
  faShield,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import SelecaoCargo from "../selecaoCargo/selecaoCargo";
import SelecoesCargos from "../selecaoCargo/selecoesCargo";
import { useUsuario } from "@/hooks/useUsuario";
import { toast } from "react-toastify";
import { toastErro, toastSucesso } from "@/utils/toast";
import { CriarUsuario } from "@/@types/usuario";

interface ModalUsuarioProps {
  aberto: boolean;
  onFechar: () => void;
}

const cargos = [
  { nome: "Admin", icone: "/admin.png" },
  { nome: "Dev", icone: "/dev.png" },
  { nome: "QA", icone: "/qa.png" },
];

export default function ModalUsuario({ aberto, onFechar }: ModalUsuarioProps) {
  const { cadastrarU } = useUsuario();

  const [nomeUsuario, setNomeUsuario] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [cargoSelecionado, setCargoSelecionado] = useState<number>();

  if (!aberto) {
    return null;
  }
  async function handleSalvar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (
      !nomeUsuario.trim() ||
      !email.trim() ||
      !senha.trim() ||
      !cargoSelecionado
    ) {
      toastErro("Atenção, preencha todos os campos");
      return;
    }

    const novoU: CriarUsuario = {
      nome: nomeUsuario,
      email: email,
      senha: senha,
      perfilId: cargoSelecionado,
    };

    console.log(email);
    console.log(senha);
    console.log(cargoSelecionado);
    console.log(nomeUsuario);

    const sucesso = await cadastrarU(novoU);

    toastSucesso("Cadastro de Usuário realizado com sucesso");

    if (sucesso) {
      setNomeUsuario("");
      setCargoSelecionado(0);
      setEmail("");
      setSenha("");

    }
  }

  return (
    <div className={styles.fundo}>
      <section
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="titulo-modal"
      >
        <header className={styles.cabecalho}>
          <span className={styles.subtitulo}>Novo Usuário</span>

          <button
            type="button"
            className={styles.fechar}
            onClick={onFechar}
            aria-label="Fechar modal"
          >
            ×
          </button>

          <h2 id="titulo-modal">Crie uma conta corporativa</h2>

          <p>
            Preencha os dados abaixo. O acesso é liberado com uma senha
            provisória.
          </p>
        </header>

        <form className={styles.formulario} onSubmit={handleSalvar}>
          <Input
            label="Nome"
            tamanho="compacto"
            icone={faUser}
            placeholder="Nome completo"
            value={nomeUsuario}
            onChange={(event) => setNomeUsuario(event.target.value)}
          />
          <Input
            icone={faEnvelope}
            tamanho="compacto"
            label="Email"
            placeholder="email@email.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <SelecoesCargos
            cargoSelecionado={
              cargoSelecionado ? String(cargoSelecionado) : undefined
            }
            onSelect={(id) => setCargoSelecionado(Number(id))}
          />

          <Input
            icone={faLock}
            label="Senha provisória"
            placeholder="••••••••••••••••••••"
            type="password"
            tamanho="compacto"
            value={senha}
            onChange={(event) => setSenha(event.target.value)}
          />

          <div className={styles.acoes}>
            <Botao
              onClick={onFechar}
              texto="Cancelar"
              variante="cancelar"
              tamanho="compacto"
            />
            <Botao
              texto="Criar novo usuário"
              tamanho="compacto"
              type="submit"
            />
          </div>
        </form>
      </section>
    </div>
  );
}
