import { useState, type FormEvent } from "react";
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
  const [cargoSelecionado, setCargoSelecionado] = useState("Admin");

  if (!aberto) {
    return null;
  }

  function enviarFormulario(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
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

        <form className={styles.formulario} onSubmit={enviarFormulario}>
          <Input
            label="Nome"
            tamanho="compacto"
            icone={faUser}
            placeholder="Nome completo"
          />
          <Input
            icone={faEnvelope}
            tamanho="compacto"
            label="Email"
            placeholder="email@email.com"
          />

           <SelecoesCargos/>

          <Input
            className={styles.inputSenha}
            icone={faLock}
            label="Senha provisória"
            placeholder="••••••••••••••••••••"
            tamanho="compacto"
          />

          <div className={styles.acoes}>
            <Botao
              onClick={onFechar}
              texto="Cancelar"
              variante="cancelar"
              tamanho="compacto"
            />
            <Botao texto="Criar novo usuário" tamanho="compacto" />
          </div>
        </form>
      </section>
    </div>
  );
}
