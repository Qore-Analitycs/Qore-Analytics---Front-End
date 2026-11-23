import * as yup from "yup";

export const userSchema = yup.object().shape({
  email: yup
    .string()
    .required("O e-mail é obrigatório")
    .email("Email ou senha incorretos"),

  senha: yup
    .string()
    .required("A senha é obrigatória")
    .min(8, "Email ou senha incorretos"),
});