import { useState, type FormEvent } from "react";
import styles from "./ModalUsuario.module.css";
import Botao from "../botao/botao";
import Input from "../input/input";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";

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

          <div className={styles.campo}>
            <span>Cargo</span>

            <div
              className={styles.cargos}
              role="group"
              aria-label="Selecionar cargo"
            >
              {cargos.map((opcao) => (
                <button
                  key={opcao.nome}
                  type="button"
                  className={
                    cargoSelecionado === opcao.nome
                      ? styles.cargoSelecionado
                      : styles.cargo
                  }
                  onClick={() => setCargoSelecionado(opcao.nome)}
                  aria-pressed={cargoSelecionado === opcao.nome}
                >
                  <img
                    src={opcao.icone}
                    alt=""
                    width={16}
                    height={16}
                    aria-hidden="true"
                  />
                  <span>{opcao.nome}</span>
                </button>
              ))}
            </div>
          </div>

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
