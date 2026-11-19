export interface ListarUsuario{
    id: string,
    nome: string,
    email: string,
    ativo: boolean,
    cargo: string,
}

export interface UsuarioListagem {
    id: number[],
    nome: string,
    email: string,
    ativo: boolean,
    cargo: string
}

export interface UsuarioEdicao {
    nome: string,
    email: string,
}

export interface RedefinirSenha {
    senhaAtual: string,
    novaSenha: string,
    confirmarNovaSenha: string
}

