export interface Usuario{
    id: string,
    nome: string,
    email: string,
    ativo: boolean,
    cargo: string,
}

export interface CriarUsuario {
    nome: string,
    email: string,
    senha: string,
    perfilId: number
}