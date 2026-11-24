import styles from "./login.module.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import * as yup from "yup";
import { userSchema } from "@/hooks/useValidacao";
import { useState, type FormEvent } from "react";
import Botao from "@/components/botao/botao";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import Input from "@/components/input/input";
import { login } from "../../services/authService";
import { toastErro, toastInfo, toastSucesso } from "@/utils/toast";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [erros, setErros] = useState<{
    email?: string;
    senha?: string;
  }>({});

  const loginUsuario = async (evento: FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    try {
      await userSchema.validate({ email, senha }, { abortEarly: false });
      setErros({});
    } catch (erro) {
      const mensagemPadrao = "Email ou senha incorretos";
      const novosErros: { email?: string; senha?: string } = {
        email: mensagemPadrao,
        senha: mensagemPadrao,
      };

      if (erro instanceof yup.ValidationError) {
        erro.inner.forEach((item) => {
          if (item.path === "email" || item.path === "senha") {
            novosErros[item.path] = item.message || mensagemPadrao;
          }
        });
      }

      setErros(novosErros);
      return;
    }
    try {
      const resposta = await login(email, senha);
      toastInfo("Login realizado com sucesso!");
      await router.push("/historico");
    } catch (error) {
      setErros({
        email: "Email ou senha incorretos",
        senha: "Email ou senha incorretos",

      });
    }
  };

  return (
    <main className={styles.main}>
      {/* Lado Esquerdo */}
      <section className={styles.ladoEsquerdo}>
        <div className={`${styles.quadrado} ${styles.quadradoLaranja}`} />

        <div className={`${styles.quadrado} ${styles.quadradoAzul}`} />

          <div className={styles.fundoGlass}></div>

          <div className={styles.superior}>
            <img src="../imgs/LogoMinimalista.png" alt="Logo QA" />
            <img src="../imgs/QoreAnalytics.png" alt="Qore Analytics" />
          </div>

          <div className={styles.conteudoCentro}>
            <img
              src="../imgs/ImagemLogin.png"
              alt="Ilustração de Testes"
              className={styles.imagemIlustracao}
            />
            <h1>Automação contínua e inteligência em testes de Web e APIs.</h1>
            <h2>
              Orquestração distribuída de suítes ponta a ponta, análise predditiva
              de flakiness e validação de contratos para equipes de engenharia de
              missão crítica.
            </h2>
          </div>
        </section>

        {/* Lado Direito */}
        <section className={styles.ladoDireito}>
          <div className={styles.containerDireito}>
            <div className={styles.texto}>
              <h1 className={styles.titulo}>Acesse sua conta corporativa</h1>
              <p>
                Insira suas credenciais corporativas para gerenciar seus clusters,
                suítes de teste e integrações CI/CD.
              </p>
            </div>

            <form
              className={styles.formulario}
              onSubmit={loginUsuario}
              noValidate
            >
              <div className={styles.campo}>
                <Input
                  icone={faEnvelope}
                  label="Email"
                  placeholder="email@email.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                {erros.email && (
                  <span className={styles.erro}>
                    <i className="fa-solid fa-circle-exclamation"></i>
                    {erros.email}
                  </span>
                )}
              </div>

              <div className={styles.campo}>
                <div>
                  <Input
                    name="email"
                    type="email"
                    icone={faEnvelope}
                    label="Email"
                    placeholder="email@email.com"
                  />
                  {erros.senha && (
                    <span className={styles.erro}>
                      <i className="fa-solid fa-circle-exclamation"></i>
                      {erros.senha}
                    </span>
                  )}
                </div>
                <div className={styles.campo}>
                  <div>
                    <Input
                      name="senha"
                      type="password"
                      className={styles.inputSenha}
                      icone={faLock}
                      label="Senha"
                      placeholder="••••••••••••••••••••"
                    />
                    {erros.senha && (
                      <span className={styles.erro}>
                        <i className="fa-solid fa-circle-exclamation"></i>
                        {erros.senha}
                      </span>
                    )}
                  </div>
                  <p className={styles.esqueceuSenha}>esqueceu sua senha ?</p>
                </div>
                <div className={styles.botaoEntrar}>
                  <Botao page="/historico" texto="Entrar" />
                </div>
            </form>
            <div>
              <div className={styles.divisorContainer}>
                <hr /> <p>OU</p> <hr />
              </div>
              <div className={styles.botaoAlternativo}>
                <Botao variante="alternativo" texto="GitHub" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main >
  );
}
