import React from 'react';
import HistoricoExecucoes from '@/components/HistoricoExecucoes/HistoricoExecucoes';
import DistribuicaoTipo from '@/components/DistribuicaoTipo/DistribuicaoTipo';
import AmbientesMonitorados from '@/components/AmbientesMonitorados/AmbientesMonitorados';

export default function TestPage() {
    return (
        <div className="min-h-screen bg-slate-100 p-6 lg:p-10">
            <div className="max-w-[1600px] mx-auto space-y-6">

                {/* Cabeçalho da Página de Teste */}
                <header className="mb-6">
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                        Ambiente de Testes / Monitoramento de Métricas
                    </h1>
                    <p className="text-sm text-slate-500">
                        Validação integrada dos componentes de histórico, distribuição e infraestrutura.
                    </p>
                </header>

                {/* Grid Principal (Layout em 3 colunas para telas grandes, seguindo a referência) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

                    {/* Coluna Esquerda: Histórico de Execuções e Latência (Ocupa 2 colunas) */}
                    <div className="lg:col-span-2 w-full">
                        <HistoricoExecucoes />
                    </div>

                    {/* Coluna Direita: Distribuição por Tipo e Ambientes Monitorados (Ocupa 1 coluna) */}
                    <div className="lg:col-span-1 flex flex-col gap-6 w-full">
                        <DistribuicaoTipo />
                        <AmbientesMonitorados />
                    </div>

                </div>

            </div>
        </div>
    );
}