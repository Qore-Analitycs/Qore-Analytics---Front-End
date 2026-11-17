
import { api } from "./api";

import type {
  Usuario,
  Perfil,
  CriarUsuarioDTO,
  FiltroUsuario
} from "@/types/usuario";

// Serviço responsável pelas operações de usuários.
export const usuarioService = {

  // 1. Consultar todos os usuários.
  listar: () => {
    return api<Usuario[]>("/api/usuarios");
  },

  // 2. Consultar um usuário específico.
  buscarPorId: (id: string) => {
    return api<Usuario>(`/api/usuarios/${id}`);
  },

  // 3. Consultar os perfis disponíveis.
  listarPerfis: () => {
    return api<Perfil[]>("/api/perfis");
  },

  // 4. Cadastrar um novo usuário.
  criar: (dados: CriarUsuarioDTO) => {
    return api<Usuario>("/api/usuarios", {
      method: "POST",
      body: JSON.stringify(dados),
    });
  },

  // 5. Atualizar um usuário.
  atualizar: (id: string, dados: Partial<Usuario>) => {
    return api<Usuario>(`/api/usuarios/${id}`, {
      method: "PUT",
      body: JSON.stringify(dados),
    });
  },

  // 6. Alterar o status do usuário.
  alterarStatus: (id: string, estaAtivo: boolean) => {
    return api<void>(`/api/usuarios/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ estaAtivo }),
    });
  },

  // 7. Pesquisar usuários.
  filtrar: (filtros: FiltroUsuario) => {

    const parametros = new URLSearchParams();

    if (filtros.busca) {
      parametros.set("busca", filtros.busca);
    }

    if (filtros.perfilId !== undefined) {
      parametros.set("perfilId", String(filtros.perfilId));
    }

    if (filtros.estaAtivo !== undefined) {
      parametros.set("estaAtivo", String(filtros.estaAtivo));
    }

    if (filtros.projetoId !== undefined) {
      parametros.set("projetoId", String(filtros.projetoId));
    }

    return api<Usuario[]>(
      `/api/usuarios?${parametros.toString()}`
    );
  },
};
