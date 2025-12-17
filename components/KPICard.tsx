
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string;
  subtext: string;
  icon: LucideIcon;
  colorClass?: string;
}

const KPICard: React.FC<KPICardProps> = ({ title, value, subtext, icon: Icon }) => {
  return (
    <div className="bg-surface border border-slate-800/40 rounded-2xl p-6 shadow-card hover:border-brand-blue/30 transition-all duration-500 relative overflow-hidden group">
      {/* Decorative Brand Glow */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-brand-blue/5 rounded-full blur-3xl group-hover:bg-brand-blue/15 transition-all duration-700"></div>
      
      <div className="flex justify-between items-start mb-6 relative z-10">
        <div className="flex flex-col">
          <h3 className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{title}</h3>
          <div className="h-0.5 w-8 bg-brand-blue/30 rounded-full group-hover:w-12 transition-all duration-500"></div>
        </div>
        <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-brand-blue shadow-inner group-hover:scale-110 transition-transform duration-500">
          <Icon size={20} />
        </div>
      </div>
      
      <div className="flex flex-col gap-1 relative z-10">
        <span className="text-3xl font-black text-white tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
          {value}
        </span>
        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">
          {subtext}
        </span>
      </div>
    </div>
  );
};

export default KPICard;
