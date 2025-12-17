
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
    <div className="bg-surface border border-slate-800/50 rounded-3xl p-10 shadow-card h-full flex flex-col justify-center relative overflow-hidden group">
      {/* Dynamic Brand Glow background */}
      <div 
        className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full blur-[120px] opacity-10 transition-colors duration-700 group-hover:opacity-20"
        style={{ backgroundColor: color }}
      ></div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-500">
            <ShieldCheck size={18} />
          </div>
          <h3 className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">{name} Geral 2026</h3>
        </div>
        
        <div className="mb-8">
          <h2 
            className="text-5xl font-black tracking-tighter transition-all duration-500 drop-shadow-[0_0_20px_rgba(29,144,255,0.2)]"
            style={{ color: color }}
          >
            {formatCurrency(total)}
          </h2>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3">
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-500/5">
                <ArrowUpRight size={14} />
                <span>Performance Validada</span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-slate-700"></div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Base 2026</span>
          </div>
          
          <p className="text-slate-400 text-sm leading-relaxed font-medium max-w-xs">
            Estratégia baseada no ecossistema <span className="text-white font-bold">ADS GROW</span> de alta conversão e escala vertical.
          </p>
        </div>
      </div>

      <div className="absolute top-10 right-10 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-1000 scale-150 group-hover:rotate-12">
        <TrendingUp size={120} style={{ color: color }} />
      </div>
    </div>
  );
};

export default TotalSummary;
