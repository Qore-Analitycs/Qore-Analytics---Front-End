import secureLocalStorage from "react-secure-storage";
import { api } from "./api";

export async function login(email: string, senha: string) {
    try {
        const response = await api.post("Autenticacao/login", { email, senha });

        console.log(response.data)

        const token = response.data.token;
        secureLocalStorage.setItem("Token", token);
        console.log(secureLocalStorage.getItem("Token"));
    }
    catch (error: any) {
        throw new Error("Email ou senha inválidos");
    }
}