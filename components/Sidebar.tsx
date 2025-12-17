
import React from 'react';
import { TrendingUp, BarChart3, Target, Zap, Layers, ChevronRight } from 'lucide-react';
import Logo from './Logo';

interface SidebarProps {
  activeId: string;
  onNavigate: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeId, onNavigate }) => {
  const menuItems = [
    { id: 'minima', icon: <TrendingUp size={20} />, label: 'Projeção Mínima' },
    { id: 'cota', icon: <BarChart3 size={20} />, label: 'Projeção Cota' },
    { id: 'meta', icon: <Target size={20} />, label: 'Projeção Meta' },
    { id: 'super-meta', icon: <Zap size={20} />, label: 'Projeção Super Meta' },
    { id: 'comparativo', icon: <Layers size={20} />, label: 'Comparativo' },
  ];

  return (
    <div className="hidden md:flex flex-col w-64 h-screen bg-surface border-r border-slate-800/50 fixed left-0 top-0 z-50">
      <div className="p-8 flex items-center border-b border-slate-800/30">
        <Logo size={32} />
      </div>

      <nav className="flex-1 py-8 px-4 space-y-1">
        <p className="px-4 text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] mb-6">Unidades de Negócio</p>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl cursor-pointer transition-all duration-300 group ${
              activeId === item.id
                ? 'bg-brand-blue/10 text-brand-blue border border-brand-blue/20'
                : 'text-slate-400 hover:bg-slate-800/40 hover:text-white border border-transparent'
            }`}
          >
            <div className="flex items-center space-x-3">
              <span className={`${activeId === item.id ? 'drop-shadow-[0_0_8px_rgba(29,144,255,0.6)]' : 'group-hover:text-brand-blue transition-colors'}`}>
                {item.icon}
              </span>
              <span className="font-bold text-xs uppercase tracking-wider">{item.label}</span>
            </div>
            {activeId === item.id && <ChevronRight size={14} className="text-brand-blue" />}
          </button>
        ))}
      </nav>

      <div className="p-6 border-t border-slate-800/30">
        <div className="flex items-center space-x-3 p-4 bg-slate-900/40 rounded-2xl border border-slate-800/50 hover:border-slate-700 transition-colors cursor-pointer group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-blue to-white p-[1px] shadow-lg shadow-brand-blue/20">
            <div className="w-full h-full rounded-[11px] bg-slate-900 flex items-center justify-center overflow-hidden">
               <div className="w-8 h-8 rounded-full bg-brand-blue/20 flex items-center justify-center">
                 <span className="text-[10px] font-black text-brand-blue">AG</span>
               </div>
            </div>
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-black text-white uppercase tracking-tighter truncate">Diretoria Executiva</p>
            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Master Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
