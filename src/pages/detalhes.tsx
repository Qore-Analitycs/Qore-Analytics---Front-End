import React from 'react';
import Head from 'next/head';

export default function DetalhesPage() {
  return (
    <>
      <Head>
        <title>Detalhe do Teste - Qore Analytics</title>
      </Head>

      {/* =====================================================================
          CONTAINER PRINCIPAL DA TELA
          Divide a tela inteira em duas partes: Barra lateral (esquerda) e Conteúdo (direita)
          ===================================================================== */}
      <div className="flex min-h-screen bg-[#E5E8EC] font-sans">

        {/* =====================================================================
            SEÇÃO 1: BARRA LATERAL ESQUERDA (SIDEBAR)
            Contém o logotipo no topo, botões de navegação e ícone inferior
            ===================================================================== */}
        <aside className="w-20 bg-[#2C3034] flex flex-col items-center py-6 gap-6 shrink-0">
          
          {/* Bloco Vermelho: Logotipo principal */}
          <div className="w-12 h-12 bg-[#FF0000] flex items-center justify-center text-white font-bold rounded">
            Logo
          </div>

          {/* Grupo de botões de navegação da barra lateral */}
          <div className="flex flex-col gap-4 mt-4">
            <div className="w-10 h-10 bg-[#FF0000] rounded cursor-pointer"></div>
            <div className="w-10 h-10 bg-[#FF0000] rounded cursor-pointer"></div>
            <div className="w-10 h-10 bg-[#FF0000] rounded cursor-pointer"></div>
          </div>

          {/* Bloco Vermelho inferior: Ícone ou imagem de rodapé */}
          <div className="mt-auto w-12 h-12 bg-[#FF0000] flex items-center justify-center text-white font-bold rounded text-xs">
            img
          </div>

        </aside>

        {/* =====================================================================
            SEÇÃO 2: ÁREA DE CONTEÚDO PRINCIPAL (DIREITA)
            ===================================================================== */}
        <main className="flex-1 p-8 overflow-y-auto">

          {/* -----------------------------------------------------------------
              2.1 CABEÇALHO DO RELATÓRIO E BOTÕES DE AÇÃO SUPERIORES
              ----------------------------------------------------------------- */}
          <div className="flex justify-between items-start mb-6">
            
            {/* Bloco de Títulos e Descrição */}
            <div>
              <span className="text-xs text-[#555555] font-medium uppercase tracking-wide">
                Detalhe do teste
              </span>
              <h1 className="text-3xl font-extrabold text-[#111111] mt-1">
                Relatório do fluxo completo de checkout de login
              </h1>
              <p className="text-sm text-[#333333] mt-1 max-w-3xl">
                Inspeção detalhada de telemetria visual, rastreamento de interação Playwright e validações de estado do DOM
              </p>
            </div>

            {/* Blocos Vermelhos Superiores (Botões de Ação) */}
            <div className="flex flex-col gap-3">
              <div className="w-48 h-12 bg-[#FF0000] rounded shadow-sm"></div>
              <div className="w-48 h-12 bg-[#FF0000] rounded shadow-sm"></div>
            </div>

          </div>

          {/* -----------------------------------------------------------------
              2.2 CONTAINER CENTRAL: PLAYER DE VÍDEO / TELEMETRIA VISUAL
              Este bloco possui uma borda azul marcante como no modelo
              ----------------------------------------------------------------- */}
          <div className="w-full h-[420px] bg-[#FF0000] border-2 border-[#00A6FF] rounded-lg shadow-sm mb-8">
            {/* Espaço reservado para o player de vídeo ou replay da sessão */}
          </div>

          {/* -----------------------------------------------------------------
              2.3 SEÇÃO INFERIOR: DOIS BLOCOS DE CONTEÚDO LADO A LADO
              Divisão em duas colunas (Esquerda maior, Direita menor)
              ----------------------------------------------------------------- */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Coluna Esquerda: Ocupa 2 espaços do grid */}
            <div className="lg:col-span-2 h-[380px] bg-[#FF0000] rounded-lg shadow-sm">
              {/* Espaço reservado para a timeline de passos e funcionalidades */}
            </div>

            {/* Coluna Direita: Ocupa 1 espaço do grid */}
            <div className="h-[380px] bg-[#FF0000] rounded-lg shadow-sm">
              {/* Espaço reservado para o painel de métricas e status */}
            </div>

          </div>

        </main>

      </div>
    </>
  );
}