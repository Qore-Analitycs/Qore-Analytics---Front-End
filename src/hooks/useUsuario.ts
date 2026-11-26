import {
    AtualizarUsuario,
    CriarUsuario,
    FiltrosUsuario,
    Usuario,
} from "@/@types/usuario";
import { UsuarioService } from "@/services/usuarioService";
import { toastErro, toastSucesso } from "@/utils/toast";
import { useCallback, useEffect, useRef, useState } from "react";

export type UseUsuarioOptions = {
    carregarAutomaticamente?: boolean;
    buscarPerfilLogado?: boolean;
};

export function useUsuario(opcoes?: UseUsuarioOptions) {
    const carregarAutomaticamente = opcoes?.carregarAutomaticamente ?? true;
    const buscarPerfilLogado = opcoes?.buscarPerfilLogado ?? true;

    const [u, setU] = useState<Usuario[]>([]);
    const [me, setMe] = useState<Usuario | null>(null);
    const [carregando, setCarregando] = useState<boolean>(
        carregarAutomaticamente
    );
    const [filtrosAtivos, setFiltrosAtivos] = useState<FiltrosUsuario>({});
    const requestIdRef = useRef(0);

    const listarU = useCallback(async (filtros?: FiltrosUsuario) => {
        const reqId = ++requestIdRef.current;

        setCarregando(true);
        try {
            const dados = await UsuarioService.listar(filtros);

            if (reqId !== requestIdRef.current) return;

            setU(dados);
        } catch (error) {
            if (reqId !== requestIdRef.current) return;
            console.error("Erro ao listar usuários:", error);
            toastErro("Erro ao listar usuários");
        } finally {
            if (reqId === requestIdRef.current) {
                setCarregando(false);
            }
        }
    }, []);

    const buscarUsuarios = useCallback(
        async (novosFiltros: FiltrosUsuario) => {
            setFiltrosAtivos(novosFiltros);
            await listarU(novosFiltros);
        },
        [listarU]
    );

    const getMe = useCallback(async () => {
        try {
            const dados = await UsuarioService.getMe();
            setMe(dados);
        } catch (error) {
            console.error(error);
            toastErro("Erro ao buscar usuário logado");
        }
    }, []);

    async function cadastrarU(dados: CriarUsuario) {
        try {
            const novoU = await UsuarioService.cadastrar(dados);

            setU((antigos) => [novoU, ...antigos]);

            return novoU;
        } catch {
            toastErro("Erro ao cadastrar usuário");
            return;
        }
    }

    async function atualizarU(id: string, dados: AtualizarUsuario) {
        try {
            await UsuarioService.atualizar(id, dados);

            await listarU(filtrosAtivos);

            toastSucesso("Perfil atualizado com sucesso!");

            return true;
        } catch (error: unknown) {
            const axiosError = error as {
                response?: {
                    data?: string | { message?: string; title?: string };
                };
            };
            console.error(
                "Erro ao atualizar:",
                axiosError.response?.data || error
            );

            const dataErro = axiosError.response?.data;
            const mensagemApi =
                typeof dataErro === "string"
                    ? dataErro
                    : dataErro?.message ||
                      dataErro?.title ||
                      "Erro ao atualizar perfil";

            toastErro(mensagemApi);

            return false;
        }
    }

    useEffect(() => {
        if (!carregarAutomaticamente && !buscarPerfilLogado) return;

        let ativo = true;

        async function carregarInicial() {
            if (carregarAutomaticamente) {
                try {
                    const dados = await UsuarioService.listar();
                    if (ativo) {
                        setU(dados);
                    }
                } catch (error) {
                    if (ativo) {
                        console.error("Erro ao listar usuários:", error);
                        toastErro("Erro ao listar usuários");
                    }
                } finally {
                    if (ativo) {
                        setCarregando(false);
                    }
                }
            }

            if (buscarPerfilLogado) {
                try {
                    const perfil = await UsuarioService.getMe();
                    if (ativo) {
                        setMe(perfil);
                    }
                } catch (error) {
                    if (ativo) {
                        console.error(error);
                        toastErro("Erro ao buscar usuário logado");
                    }
                }
            }
        }

        void carregarInicial();

        return () => {
            ativo = false;
        };
    }, [carregarAutomaticamente, buscarPerfilLogado]);

    return {
        u,
        carregando,
        filtrosAtivos,
        cadastrarU,
        atualizarU,
        me,
        getMe,
        listarU,
        buscarUsuarios,
    };
}
