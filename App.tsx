
import React, { useState, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import KPICard from './components/KPICard';
import RevenueChart from './components/RevenueChart';
import MonthlyTable from './components/MonthlyTable';
import TotalSummary from './components/TotalSummary';
import ChatAgent from './components/ChatAgent';
import MonthFilter from './components/MonthFilter';
import Logo from './components/Logo';
import { 
  Target, 
  Users, 
  Tag, 
  CalendarClock, 
  Calendar,
  TrendingUp,
  ArrowRight
} from 'lucide-react';
import { SCENARIOS, formatCurrency } from './constants';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('comparativo');
  const [selectedMonth, setSelectedMonth] = useState('Anual');

  const activeScenario = useMemo(() => {
    return SCENARIOS.find(s => s.id === activeTab);
  }, [activeTab]);

  const isComparison = activeTab === 'comparativo';

  const months = useMemo(() => {
    return SCENARIOS[0].data.map(d => d.month);
  }, []);

  const displayData = useMemo(() => {
    if (!activeScenario) return null;
    if (selectedMonth === 'Anual') {
      return {
        total: activeScenario.total,
        label: activeScenario.name,
        isMonthly: false
      };
    }
    const monthData = activeScenario.data.find(d => d.month === selectedMonth);
    return {
      total: monthData?.revenue || 0,
      label: `Projeção ${selectedMonth}`,
      isMonthly: true
    };
  }, [activeScenario, selectedMonth]);

  return (
    <div className="min-h-screen bg-background text-slate-200 font-sans selection:bg-brand-blue/30">
      <Sidebar activeId={activeTab} onNavigate={setActiveTab} />
      
      {/* Main Content */}
      <main className="md:ml-64 p-6 lg:p-12 min-h-screen flex flex-col relative">
        
        {/* Top Header Row */}
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-12 animate-in fade-in slide-in-from-top-4 duration-1000">
          <div className="space-y-4">
            <div className="flex items-center gap-6">
              <Logo size={48} showText={false} className="lg:hidden" />
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h1 className="text-4xl lg:text-5xl font-black text-white tracking-tighter uppercase leading-none">
                    DASHBOARD <span className="text-brand-blue">2026</span>
                  </h1>
                  <div className="hidden sm:flex px-3 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue text-[9px] font-black uppercase tracking-[0.3em] border border-brand-blue/20 shadow-glow">
                    PRO PERFORMANCE
                  </div>
                </div>
                <div className="flex items-center gap-3">
                   <div className="h-[1px] w-8 bg-slate-800"></div>
                   <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em]">Strategic Revenue Projections</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
            {/* Period Display */}
            <div className="flex items-center gap-6 bg-surface/40 backdrop-blur-xl px-6 py-4 rounded-[1.5rem] border border-slate-800 shadow-card flex-1 lg:flex-none group hover:border-slate-700 transition-colors">
              <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-brand-blue group-hover:scale-110 transition-transform duration-500">
                <Calendar size={18} />
              </div>
              <div className="flex flex-col">
                <span className="text-[8px] font-black text-slate-500 uppercase tracking-[0.3em] mb-0.5 leading-none">Ciclo</span>
                <span className="text-xs font-bold text-white leading-none tracking-tight">JAN - DEZ 2026</span>
              </div>
            </div>
          </div>
        </header>

        {/* Global Filter Section - Agora visível em todas as páginas */}
        <div className="mb-10 animate-in fade-in slide-in-from-left-4 duration-1000 delay-200">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 px-2">
              <div className="w-1 h-3 bg-brand-blue rounded-full"></div>
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Período de Análise</h3>
            </div>
            <MonthFilter 
              selectedMonth={selectedMonth} 
              onMonthChange={setSelectedMonth} 
              months={months} 
            />
          </div>
        </div>

        {/* View Content */}
        {!isComparison && activeScenario && displayData ? (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 space-y-10">
            {/* Section 1: KPIs */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <KPICard 
                title="Taxa de Conversão" 
                value={activeScenario.conversion} 
                subtext="Meta de Fechamento" 
                icon={Target} 
              />
              <KPICard 
                title="Volume de Leads" 
                value={activeScenario.leads} 
                subtext="Meta de Atração Mensal" 
                icon={Users} 
              />
              <KPICard 
                title="Ticket Médio" 
                value={activeScenario.ticket} 
                subtext="Investimento por Cliente" 
                icon={Tag} 
              />
              <KPICard 
                title={selectedMonth === 'Anual' ? "Meta Diária" : `Meta ${selectedMonth}`} 
                value={selectedMonth === 'Anual' ? activeScenario.dailyGoal : formatCurrency(displayData.total / 22)} 
                subtext={selectedMonth === 'Anual' ? "Faturamento Médio Dia" : "Média 22 Dias Úteis"} 
                icon={CalendarClock} 
              />
            </section>

            {/* Section 2: Main Chart */}
            <section className="w-full h-[500px]">
              <RevenueChart scenario={activeScenario} selectedMonth={selectedMonth} />
            </section>

            {/* Section 3: Summary & Table */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
              <div className="lg:col-span-1">
                <TotalSummary 
                  total={displayData.total} 
                  name={displayData.label} 
                  color={activeScenario.color}
                />
              </div>
              <div className="lg:col-span-2">
                <MonthlyTable 
                  data={activeScenario.data} 
                  accentColor={activeScenario.color} 
                  highlightMonth={selectedMonth} 
                />
              </div>
            </section>
          </div>
        ) : (
          /* Comparison View */
          <div className="space-y-12 flex-1 flex flex-col animate-in fade-in zoom-in-95 duration-1000 pb-20">
            {/* Comparison Chart Container */}
            <section className="w-full h-[550px] flex-shrink-0">
              <RevenueChart isComparison selectedMonth={selectedMonth} />
            </section>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-4 flex items-center gap-4 mb-2 px-4">
                <div className="p-2 bg-brand-blue/10 border border-brand-blue/20 rounded-lg text-brand-blue">
                  <TrendingUp size={20} />
                </div>
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em]">Benchmarking Estratégico</h3>
              </div>
              
              {SCENARIOS.map((s) => {
                const val = selectedMonth === 'Anual' 
                  ? s.total 
                  : (s.data.find(d => d.month === selectedMonth)?.revenue || 0);
                  
                return (
                  <button 
                    key={s.id} 
                    onClick={() => {
                      setActiveTab(s.id);
                      // Mantemos o mês selecionado ao trocar para facilitar a análise contínua
                    }}
                    className="bg-surface border border-slate-800/60 rounded-[2.5rem] p-10 hover:border-brand-blue/40 hover:shadow-[0_20px_60px_rgba(0,0,0,0.6)] transition-all cursor-pointer group text-left relative overflow-hidden"
                  >
                    <div 
                      className="absolute -right-12 -top-12 w-48 h-48 blur-[100px] opacity-0 group-hover:opacity-20 transition-opacity duration-700"
                      style={{ backgroundColor: s.color }}
                    ></div>
                    
                    <div className="flex justify-between items-start mb-10 relative z-10">
                      <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 group-hover:text-slate-300 transition-colors">
                        {s.name} {selectedMonth !== 'Anual' ? `(${selectedMonth})` : ''}
                      </span>
                      <div className="p-3 rounded-2xl bg-slate-900 group-hover:bg-brand-blue group-hover:text-black transition-all duration-500 shadow-inner">
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                    
                    <p className="text-3xl font-black mb-6 group-hover:scale-105 transition-transform origin-left tracking-tighter" style={{ color: s.color }}>
                      {formatCurrency(val)}
                    </p>
                    
                    <div className="space-y-6 relative z-10">
                      <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden shadow-inner">
                        <div 
                          className="h-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(0,0,0,0.5)]" 
                          style={{ 
                            width: `${(val / SCENARIOS[SCENARIOS.length-1].total * (selectedMonth === 'Anual' ? 1 : 12)) * 100}%`,
                            backgroundColor: s.color,
                            boxShadow: `0 0 12px ${s.color}44`
                          }}
                        ></div>
                      </div>
                      <div className="flex justify-between items-center text-[9px] font-black text-slate-500 uppercase tracking-widest">
                        <span className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: s.color }}></div>
                          Meta: {s.conversion}
                        </span>
                        {selectedMonth === 'Anual' && (
                          <span className="text-emerald-500/80 bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/20">
                            +{((s.total / SCENARIOS[0].total) * 100 - 100).toFixed(0)}%
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </main>

      {/* Agente de Inteligência ADS GROW AI */}
      <ChatAgent />
    </div>
  );
};

export default App;
