
import React from 'react';
import { CheckCircle2, Crown } from 'lucide-react';
import { MonthlyData, formatCurrency } from '../constants';

interface MonthlyTableProps {
  data: MonthlyData[];
  accentColor: string;
  highlightMonth?: string;
}

const MonthlyTable: React.FC<MonthlyTableProps> = ({ data, accentColor, highlightMonth }) => {
  return (
    <div className="bg-surface border border-slate-800 rounded-2xl flex flex-col h-full shadow-card overflow-hidden">
      <div className="p-5 border-b border-slate-800 bg-slate-900/40 flex justify-between items-center">
        <h3 className="font-bold text-white text-sm uppercase tracking-wider">Detalhamento Mensal</h3>
        <span className="text-[10px] font-bold text-slate-500 uppercase">Ano Fiscal 2026</span>
      </div>
      
      <div className="overflow-auto flex-1 custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-900/80 sticky top-0 z-10 backdrop-blur-sm">
            <tr>
              <th className="p-4 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Mês</th>
              <th className="p-4 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Receita Projetada</th>
              <th className="p-4 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {data.map((row, index) => {
              const isSelected = highlightMonth === row.month;
              return (
                <tr 
                  key={index} 
                  className={`group transition-all duration-300 ${
                    isSelected 
                      ? 'bg-brand-blue/10' 
                      : row.isPeak ? 'bg-white/[0.02]' : 'hover:bg-white/[0.01]'
                  }`}
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <span className={`text-sm font-bold transition-colors ${
                        isSelected ? 'text-brand-blue' : 'text-slate-300 group-hover:text-white'
                      }`}>
                        {row.month}
                      </span>
                      {row.isPeak && (
                        <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[9px] font-black uppercase italic">
                          <Crown size={10} />
                          Pico
                        </div>
                      )}
                      {isSelected && (
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-blue shadow-[0_0_8px_rgba(29,144,255,0.8)]"></div>
                      )}
                    </div>
                  </td>
                  <td className={`p-4 text-sm font-mono font-medium transition-colors ${
                    isSelected ? 'text-white' : 'text-slate-200'
                  }`}>
                    {formatCurrency(row.revenue)}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <span className="text-[10px] font-bold text-slate-500 uppercase group-hover:text-slate-400 transition-colors">Confirmado</span>
                      <CheckCircle2 size={14} className={isSelected ? 'text-brand-blue' : 'text-emerald-500/80'} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MonthlyTable;
