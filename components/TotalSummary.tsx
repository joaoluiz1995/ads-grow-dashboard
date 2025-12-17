import React from 'react';
import { TrendingUp, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { formatCurrency } from '../constants';

interface TotalSummaryProps {
  total: number;
  name: string;
  color: string;
}

const TotalSummary: React.FC<TotalSummaryProps> = ({ total, name, color }) => {
  return (
    <div className="bg-surface border border-slate-800 rounded-2xl p-8 shadow-card h-full flex flex-col justify-center relative overflow-hidden group">
      {/* Dynamic Glow background */}
      <div 
        className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full blur-[100px] opacity-10 transition-colors duration-500"
        style={{ backgroundColor: color }}
      ></div>

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <ShieldCheck size={18} className="text-slate-500" />
          <h3 className="text-slate-400 text-xs font-black uppercase tracking-[0.2em]">{name} Total 2026</h3>
        </div>
        
        <div className="mb-6">
          <h2 
            className="text-4xl lg:text-5xl font-black tracking-tighter transition-all duration-500 drop-shadow-2xl"
            style={{ color: color }}
          >
            {formatCurrency(total)}
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          <div className="inline-flex items-center self-start gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <ArrowUpRight size={16} />
            <span>Crescimento Exponencial</span>
          </div>
          
          <p className="text-slate-500 text-sm leading-relaxed font-medium">
            Métricas baseadas no desempenho histórico e volume de leads qualificados projetado para o funil de vendas em 2026.
          </p>
        </div>
      </div>

      <div className="absolute top-6 right-6 opacity-5 group-hover:opacity-10 transition-opacity">
        <TrendingUp size={80} style={{ color: color }} />
      </div>
    </div>
  );
};

export default TotalSummary;