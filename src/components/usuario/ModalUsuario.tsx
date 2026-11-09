
import { useState, type FormEvent } from "react";
import styles from "./ModalUsuario.module.css";

// Define as informações recebidas pelo componente.
interface ModalUsuarioProps {
  aberto: boolean;
  onFechar: () => void;
}

export default function ModalUsuario({
  aberto,
  onFechar,
}: ModalUsuarioProps) {

  // Guarda o cargo selecionado.
  const [cargo, setCargo] = useState("Cargo 1");

  // Se o modal estiver fechado, não exibe nada.
  if (!aberto) {
    return null;
  }

  // Impede o recarregamento da página ao enviar o formulário.
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

        {/* Cabeçalho */}
        <header className={styles.cabecalho}>

          <span className={styles.subtitulo}>
            Novo Usuário
          </span>

          <button
            type="button"
            className={styles.fechar}
            onClick={onFechar}
            aria-label="Fechar modal"
          >
            ×
          </button>

          <h2 id="titulo-modal">
            Crie uma conta corporativa
          </h2>

          <p>
            Preencha os dados abaixo. O acesso é liberado
            com uma senha provisória.
          </p>

        </header>

        {/* Formulário */}
        <form
          className={styles.formulario}
          onSubmit={enviarFormulario}
        >

          {/* Nome */}
          <div className={styles.campo}>
            <label htmlFor="nome">Nome</label>

            <input
              id="nome"
              name="nome"
              type="text"
              placeholder="Digite o nome"
              required
            />
          </div>

          {/* Email */}
          <div className={styles.campo}>
            <label htmlFor="email">Email</label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="Digite o email"
              required
            />
          </div>

          {/* Cargo */}
          <div className={styles.campo}>
            <span>Cargo</span>

            <div
              className={styles.cargos}
              role="group"
              aria-label="Selecionar cargo"
            >
              {["Cargo 1", "Cargo 2", "Cargo 3"].map((opcao) => (
                <button
                  key={opcao}
                  type="button"
                  className={
                    cargo === opcao
                      ? styles.cargoSelecionado
                      : styles.cargo
                  }
                  onClick={() => setCargo(opcao)}
                  aria-pressed={cargo === opcao}
                >
                  {opcao}
                </button>
              ))}
            </div>
          </div>

          {/* Senha */}
          <div className={styles.campo}>
            <label htmlFor="senha">Senha</label>

            <input
              id="senha"
              name="senha"
              type="password"
              placeholder="Digite a senha provisória"
              required
            />
          </div>

          {/* Botões */}
          <div className={styles.acoes}>

            <button
              type="button"
              className={styles.botaoCancelar}
              onClick={onFechar}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className={styles.botaoCriar}
            >
              Criar usuário
            </button>

          </div>

        </form>

      </section>
    </div>
  );
}
