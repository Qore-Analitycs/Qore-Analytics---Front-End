
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Função centralizada para realizar requisições HTTP.
export async function api<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {

  // Envia a requisição para a API.
  const resposta = await fetch(`${API_URL}${endpoint}`, {
    ...options,

    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  // Trata respostas com erro.
  if (!resposta.ok) {
    const erro = await resposta.text();

    throw new Error(
      erro || `Erro HTTP: ${resposta.status}`
    );
  }

  // Trata respostas sem conteúdo (ex.: HTTP 204).
  if (resposta.status === 204) {
    return undefined as T;
  }

  // Converte o JSON recebido em objeto JavaScript.
  return resposta.json() as Promise<T>;
}
