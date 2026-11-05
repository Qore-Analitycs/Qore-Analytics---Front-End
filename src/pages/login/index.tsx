import styles from "./login.module.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import * as yup from "yup";
import { userSchema } from "@/hooks/useValidacao";
import { useState, type FormEvent } from "react";

export default function Login() {

  const [erros, setErros] = useState<{
    email?: string;
    senha?: string;
  }>({});

  const loginUsuario = async (evento: FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    const dados = new FormData(evento.currentTarget);

    const formData = {
      email: String(dados.get("email") ?? ""),
      senha: String(dados.get("senha") ?? ""),
    };

    try {
      await userSchema.validate(formData, {
        abortEarly: false,
      });

      setErros({});

      console.log("Login válido!", formData);

      // Aqui você poderá chamar sua API de autenticação.
    } catch (erro) {
      if (erro instanceof yup.ValidationError) {
        const novosErros: { email?: string; senha?: string } = {};

        erro.inner.forEach((item) => {
          if (item.path) {
            novosErros[item.path as "email" | "senha"] = item.message;
          }
        });

        setErros(novosErros);
      }
    }
  };

  return (
    <>
      <main className={styles.main}>
        <section className={styles.ladoEsquerdo}>
          <div className={`${styles.quadrado} ${styles.quadradoLaranja}`}></div>
          <div className={`${styles.quadrado} ${styles.quadradoAzul}`}></div>
          <div className={styles.superior}>
            <img src="../imgs/Logo.png" alt="" />
            <img src="../imgs/NomeCore.png" alt="" />
          </div>
          <img src="../imgs/ImagemLogin.png" alt="" />
          <h1>Automação contínua e inteligência em testes de Web e APIs.</h1>
          <h2>
            Orquestração distribuída de suítes ponta a ponta, análise preditiva
            de flakiness e validação de contratos para equipes de engenharia de
            missão crítica.
          </h2>
        </section>

        {/* Lado Direito */}

        <section className={styles.ladoDireito}>
          <div className={styles.texto}>
            <h1>Acesse sua conta corporativa</h1>
            <p>
              Insira suas credenciais corporativas para gerenciar seus clusters,
              suítes de teste e integrações CI/CD.
            </p>
          </div>
          {/* Formulario  */}
          <form action="" className={styles.formulario} onSubmit={loginUsuario}>
            <div className={styles.campo}>
              <label className={styles.label}>Email</label>

              <div className={styles.inputContainer}>
                <i className="fa-solid fa-envelope"></i>

                <input
                  type="email"
                  name="email"
                  placeholder="email@email.com"
                />
              </div>

              {erros.email && (
                <span className={styles.erro}>
                  <i className="fa-solid fa-circle-exclamation"></i>
                  {erros.email}
                </span>
              )}
            </div>
            <div className={styles.campo}>
              <label htmlFor="" className={styles.label}>
                Senha
              </label>
              <div className={styles.inputContainer}>
                <i
                  className="fa-solid fa-lock"
                  style={{ color: "rgb(255, 0, 122" }}
                ></i>
                <input type="password" placeholder="********" name="senha" />
              </div>

              {erros.senha && (
                <span className={styles.erro}>
                  <i className="fa-solid fa-circle-exclamation"></i>
                  {erros.senha}
                </span>
              )}
            </div>
            <p className={styles.esqueceuSenha}>esqueceu sua senha ?</p>
            <button className={styles.botaoLogin}>Entrar</button>
          </form>
          <hr /> <p>ou</p> <hr />
          <div className={styles.alternativaLogin}>
            <button>
              <img src="../icons/Google.png" alt="" />
              Google
            </button>
            <button>
              <img src="../icons/GitHub.png" alt="" />
              GitHub
            </button>
          </div>
        </section>
      </main>
    </>
  );
}