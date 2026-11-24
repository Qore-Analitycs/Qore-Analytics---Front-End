
import { validarSenhaAtual } from "@/services/authService";
import * as yup from "yup";

// VALIDAÇÃO DO LOGIN
export const userSchema = yup.object({
    email: yup.string()
        .required("Informe seu email")
        .email("Informe um email válido"),

    senha: yup.string()
        .required("Informe sua senha")
});

// VALIDAÇÃO DA ATUALIZAÇÃO DO PERFIL
export const atualizarUsuarioSchema = yup.object({
    nome: yup.string()
        .required("Informe seu nome"),

    email: yup.string()
        .required("Informe seu email")
        .email("Informe um email válido"),

    senhaAtual: yup.string()
        .test(
            "senha-atual-valida",
            "A senha atual está incorreta",
            async function (valor) {
                const email = this.parent.email;

                // Se não digitou senhaAtual ou ainda não tem email, deixa as outras regras tratarem
                if (!valor || !email) return true;

                return await validarSenhaAtual(email, valor);
            }
        ),

    novaSenha: yup.string()
        .test(
            "tamanho",
            "A senha deve ter no mínimo 8 caracteres",
            (valor) => !valor || valor.length >= 8
        ),

    confirmarNovaSenha: yup.string()
        .test(
            "confirmar",
            "As senhas não coincidem",
            function (valor) {
                return valor === this.parent.novaSenha;
            }
        )
}).test("validar-senha", function (dados) {
    const {
        senhaAtual,
        novaSenha,
        confirmarNovaSenha
    } = dados || {};

    if (!senhaAtual && !novaSenha && !confirmarNovaSenha) {
        return true;
    }

    if (!senhaAtual) {
        return this.createError({
            path: "senhaAtual",
            message: "Informe sua senha atual"
        });
    }

    if (!novaSenha) {
        return this.createError({
            path: "novaSenha",
            message: "Informe sua nova senha"
        });
    }

    if (!confirmarNovaSenha) {
        return this.createError({
            path: "confirmarNovaSenha",
            message: "Confirme sua nova senha"
        });
    }

    return true;
});
