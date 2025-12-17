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
    <div className="bg-surface border border-slate-800 rounded-xl p-5 shadow-card hover:border-cyan-500/30 transition-colors duration-300 relative overflow-hidden group">
      {/* Decorative Glow */}
      <div className="absolute -right-6 -top-6 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all"></div>
      
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider">{title}</h3>
        <div className="p-2 bg-slate-900 rounded-lg text-cyan-400 border border-slate-700/50">
          <Icon size={18} />
        </div>
      </div>
      
      <div className="flex flex-col gap-1 relative z-10">
        <span className="text-2xl lg:text-3xl font-bold text-white tracking-tight drop-shadow-[0_0_8px_rgba(255,255,255,0.15)]">
          {value}
        </span>
        <span className="text-xs text-slate-500 font-medium">
          {subtext}
        </span>
      </div>
    </div>
  );
};

export default KPICard;