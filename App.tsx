
import React, { useState, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import KPICard from './components/KPICard';
import RevenueChart from './components/RevenueChart';
import MonthlyTable from './components/MonthlyTable';
import TotalSummary from './components/TotalSummary';
import { 
  Target, 
  Users, 
  Tag, 
  CalendarClock, 
  Calendar,
  Layers,
  ArrowRight,
  BarChart3
} from 'lucide-react';
import { SCENARIOS } from './constants';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('comparativo');

  const activeScenario = useMemo(() => {
    return SCENARIOS.find(s => s.id === activeTab);
  }, [activeTab]);

  const isComparison = activeTab === 'comparativo';

  return (
    <div className="min-h-screen bg-background text-slate-200 font-sans selection:bg-cyan-500/30">
      <Sidebar activeId={activeTab} onNavigate={setActiveTab} />
      
      {/* Main Content */}
      <main className="md:ml-64 p-4 lg:p-10 min-h-screen flex flex-col">
        
        {/* Header */}
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
          <div className="animate-in fade-in slide-in-from-left-4 duration-700">
            <div className="flex items-center gap-4 mb-2">
              <h1 className="text-3xl lg:text-5xl font-black text-white tracking-tighter uppercase leading-none">ADS GROW</h1>
              <div className="px-3 py-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 text-[10px] font-black uppercase tracking-[0.25em] border border-indigo-500/20 shadow-xl shadow-indigo-500/5">
                Strategic Intelligence
              </div>
            </div>
            <div className="flex items-center gap-3 text-slate-400 text-xs font-black uppercase tracking-[0.2em]">
              {isComparison ? (
                <div className="flex items-center gap-2 text-violet-400">
                  <Layers size={18} />
                  <span>Benchmark Global de Resultados 2026</span>
                </div>
              ) : (
                <div className="flex items-center gap-2" style={{ color: activeScenario?.color }}>
                  <div className="w-3 h-3 rounded-full animate-pulse shadow-glow" style={{ backgroundColor: activeScenario?.color }}></div>
                  <span>Detalhamento Técnico: {activeScenario?.name}</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4 w-full lg:w-auto animate-in fade-in slide-in-from-right-4 duration-700">
            {/* Period Display */}
            <div className="flex items-center gap-5 bg-surface/80 backdrop-blur-xl px-7 py-4 rounded-2xl border border-slate-800 shadow-2xl flex-1 lg:flex-none">
              <Calendar size={22} className="text-slate-500" />
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] leading-none mb-2">Ano de Exercício</span>
                <span className="text-sm font-bold text-white leading-none">2026 (Projetado)</span>
              </div>
            </div>
          </div>
        </header>

        {!isComparison && activeScenario ? (
          <div className="animate-in fade-in slide-in-from-bottom-6 duration-1000">
            {/* Section 1: KPIs */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              <KPICard 
                title="Conversão" 
                value={activeScenario.conversion} 
                subtext="Taxa Mínima Necessária" 
                icon={Target} 
              />
              <KPICard 
                title="Captação" 
                value={activeScenario.leads} 
                subtext="Meta de Leads Mensal" 
                icon={Users} 
              />
              <KPICard 
                title="Ticket Médio" 
                value={activeScenario.ticket} 
                subtext="VGV Unitário Estimado" 
                icon={Tag} 
              />
              <KPICard 
                title="Diário (Úteis)" 
                value={activeScenario.dailyGoal} 
                subtext="Break-even Diário" 
                icon={CalendarClock} 
              />
            </section>

            {/* Section 2: Main Chart */}
            <section className="w-full h-[450px] mb-10">
              <RevenueChart scenario={activeScenario} />
            </section>

            {/* Section 3: Summary & Table */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <TotalSummary 
                  total={activeScenario.total} 
                  name={activeScenario.name} 
                  color={activeScenario.color}
                />
              </div>
              <div className="lg:col-span-2">
                <MonthlyTable data={activeScenario.data} accentColor={activeScenario.color} />
              </div>
            </section>
          </div>
        ) : (
          /* Comparison View */
          <div className="space-y-12 flex-1 flex flex-col animate-in fade-in zoom-in-95 duration-1000 pb-12">
            {/* Comparison Chart Container */}
            <section className="w-full h-[550px] flex-shrink-0">
              <RevenueChart isComparison />
            </section>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-4 flex items-center gap-4 mb-2 px-3">
                <BarChart3 size={22} className="text-indigo-400" />
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.4em]">Selecione um Cenário para Análise</h3>
              </div>
              
              {SCENARIOS.map((s) => (
                <button 
                  key={s.id} 
                  onClick={() => setActiveTab(s.id)}
                  className="bg-surface border border-slate-800 rounded-[2.5rem] p-8 hover:border-slate-600 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all cursor-pointer group text-left relative overflow-hidden"
                >
                  <div 
                    className="absolute -right-10 -top-10 w-40 h-40 blur-[80px] opacity-0 group-hover:opacity-15 transition-opacity duration-500"
                    style={{ backgroundColor: s.color }}
                  ></div>
                  
                  <div className="flex justify-between items-start mb-8 relative z-10">
                    <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 group-hover:text-slate-300 transition-colors">
                      {s.name}
                    </span>
                    <div className="p-2.5 rounded-xl bg-slate-900 group-hover:bg-slate-800 transition-colors shadow-inner">
                      <ArrowRight size={16} className="text-slate-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                  
                  <p className="text-3xl font-black mb-4 group-hover:scale-105 transition-transform origin-left tracking-tighter" style={{ color: s.color }}>
                    R$ {(s.total / 1000000).toFixed(2)}M
                  </p>
                  
                  <div className="space-y-5 relative z-10">
                    <div className="w-full h-2 bg-slate-800/50 rounded-full overflow-hidden shadow-inner">
                      <div 
                        className="h-full transition-all duration-1000 ease-out shadow-glow" 
                        style={{ 
                          width: `${(s.total / SCENARIOS[SCENARIOS.length-1].total) * 100}%`,
                          backgroundColor: s.color
                        }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      <span className="flex items-center gap-1.5">
                        <Target size={12} className="opacity-50" />
                        {s.conversion}
                      </span>
                      <span className="text-emerald-500/80 bg-emerald-500/5 px-2 py-0.5 rounded">
                        +{((s.total / SCENARIOS[0].total) * 100 - 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
