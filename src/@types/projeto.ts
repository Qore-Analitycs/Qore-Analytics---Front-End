export interface Projeto {
    id: number
    criadoEm: string
    nome: string
    urlAlvo: string
    urlSwagger?: string
    usuarios: Usuario[]
}

export interface Usuario {
    id: string
    nome: string
    email: string
}
