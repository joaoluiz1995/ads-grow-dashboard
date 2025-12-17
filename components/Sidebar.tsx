import React from 'react';
import { TrendingUp, BarChart3, Target, Zap, Layers, ChevronRight } from 'lucide-react';

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
    <div className="hidden md:flex flex-col w-64 h-screen bg-surface border-r border-slate-800 fixed left-0 top-0 z-50">
      <div className="p-6 flex items-center space-x-3 border-b border-slate-800">
        <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center shadow-neon">
          <span className="font-bold text-black text-lg">A</span>
        </div>
        <span className="text-xl font-bold tracking-wider text-white">ADS GROW</span>
      </div>

      <nav className="flex-1 py-6 px-3 space-y-1">
        <p className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4">Projeções 2026</p>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 group ${
              activeId === item.id
                ? 'bg-cyan-500/10 text-cyan-400'
                : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
            }`}
          >
            <div className="flex items-center space-x-3">
              <span className={`${activeId === item.id ? 'drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]' : ''}`}>
                {item.icon}
              </span>
              <span className="font-medium text-sm">{item.label}</span>
            </div>
            {activeId === item.id && <ChevronRight size={14} className="text-cyan-400" />}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center space-x-3 p-3 bg-slate-900/50 rounded-xl border border-slate-800/50">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-cyan-500 shadow-lg shadow-purple-500/20"></div>
          <div className="overflow-hidden">
            <p className="text-sm font-semibold text-white truncate">Diretor ADS GROW</p>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider">Painel Financeiro</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;