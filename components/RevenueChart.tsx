
import React, { useMemo } from 'react';
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
  Legend,
  ReferenceArea,
  Cell
} from 'recharts';
import { SCENARIOS, formatCurrency, ProjectionScenario } from '../constants';

interface RevenueChartProps {
  scenario?: ProjectionScenario;
  isComparison?: boolean;
  selectedMonth?: string;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    const sortedPayload = [...payload].sort((a, b) => (b.value as number) - (a.value as number));
    
    return (
      <div className="bg-[#121223]/95 backdrop-blur-xl border border-slate-700/50 p-4 rounded-xl shadow-2xl min-w-[240px] z-50">
        <p className="text-slate-400 text-[10px] font-black mb-3 uppercase tracking-widest border-b border-slate-800 pb-2">
          Período: {label}
        </p>
        <div className="space-y-2.5">
          {sortedPayload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between gap-4 group">
              <div className="flex items-center gap-2">
                <div 
                  className="w-2.5 h-2.5 rounded-full" 
                  style={{ 
                    backgroundColor: entry.color || entry.fill,
                    boxShadow: `0 0 12px ${entry.color || entry.fill}` 
                  }}
                ></div>
                <span className="text-[11px] text-slate-300 font-bold group-hover:text-white transition-colors">
                  {entry.name}
                </span>
              </div>
              <span className="text-xs font-mono font-black text-white">
                {formatCurrency(entry.value)}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

const RevenueChart: React.FC<RevenueChartProps> = ({ scenario, isComparison, selectedMonth = 'Anual' }) => {
  // Dados para comparação anual (Linhas)
  const comparisonData = useMemo(() => {
    return SCENARIOS[0].data.map((monthItem, index) => {
      const entry: any = { month: monthItem.month };
      SCENARIOS.forEach(s => {
        if (s.data && s.data[index]) {
          entry[s.name] = s.data[index].revenue;
        }
      });
      return entry;
    });
  }, []);

  // Dados para comparação mensal (Barras)
  const monthlyComparisonData = useMemo(() => {
    if (selectedMonth === 'Anual') return [];
    return SCENARIOS.map(s => ({
      name: s.name,
      revenue: s.data.find(d => d.month === selectedMonth)?.revenue || 0,
      color: s.color
    }));
  }, [selectedMonth]);

  return (
    <div className="bg-surface border border-slate-800/60 rounded-3xl p-6 lg:p-8 shadow-card h-full flex flex-col relative overflow-hidden min-h-[450px]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4 relative z-10">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div 
              className="w-1.5 h-6 rounded-full shadow-glow" 
              style={{ backgroundColor: isComparison ? '#8b5cf6' : scenario?.color }}
            ></div>
            <h2 className="text-lg lg:text-xl font-black text-white tracking-tight uppercase">
              {isComparison 
                ? (selectedMonth === 'Anual' ? 'Matriz Comparativa Anual' : `Comparativo Mensal: ${selectedMonth}`)
                : `Projeção: ${scenario?.name} ${selectedMonth !== 'Anual' ? `(${selectedMonth})` : ''}`
              }
            </h2>
          </div>
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest ml-4.5">
            {isComparison 
              ? 'Benchmarks entre cenários de escala' 
              : `Faturamento detalhado — Jan/Dez 2026`}
          </p>
        </div>

        {isComparison && selectedMonth === 'Anual' && (
          <div className="flex flex-wrap items-center gap-3 bg-slate-900/40 p-2 rounded-xl border border-slate-800">
            {SCENARIOS.map(s => (
              <div key={s.id} className="flex items-center gap-2 px-2 py-1">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }}></div>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">{s.name.split(' ')[1]}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex-1 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          {isComparison ? (
            selectedMonth === 'Anual' ? (
              <LineChart data={comparisonData} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} strokeOpacity={0.4} />
                <XAxis 
                  dataKey="month" 
                  stroke="#475569" 
                  tick={{ fontSize: 11, fontWeight: 700, fill: '#64748b' }} 
                  tickLine={false} 
                  axisLine={false} 
                  dy={15}
                />
                <YAxis 
                  stroke="#475569" 
                  tick={{ fontSize: 10, fontWeight: 700, fill: '#64748b' }} 
                  tickLine={false} 
                  axisLine={false} 
                  tickFormatter={(val) => `R$${(val / 1000)}k`} 
                  dx={-10}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#334155', strokeWidth: 1, strokeDasharray: '5 5' }} />
                <Legend 
                  verticalAlign="bottom" 
                  iconType="circle"
                  wrapperStyle={{ paddingTop: '40px' }}
                  content={() => (
                    <div className="flex flex-wrap justify-center gap-6 mt-10 border-t border-slate-800 pt-6">
                      {SCENARIOS.map((s) => (
                        <div key={s.id} className="flex items-center gap-2 group cursor-default">
                          <div 
                            className="w-3 h-3 rounded-full transition-all duration-300 group-hover:scale-125" 
                            style={{ backgroundColor: s.color, boxShadow: `0 0 10px ${s.color}66` }}
                          ></div>
                          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest group-hover:text-slate-300 transition-colors">{s.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                />
                {SCENARIOS.map((s) => (
                  <Line
                    key={s.id}
                    type="monotone"
                    dataKey={s.name}
                    name={s.name}
                    stroke={s.color}
                    strokeWidth={4}
                    dot={false}
                    activeDot={{ r: 8, strokeWidth: 0, fill: s.color }}
                    animationDuration={1500}
                  />
                ))}
              </LineChart>
            ) : (
              <BarChart data={monthlyComparisonData} margin={{ top: 10, right: 30, left: 30, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} strokeOpacity={0.4} />
                <XAxis 
                  dataKey="name" 
                  stroke="#475569" 
                  tick={{ fontSize: 10, fontWeight: 900, fill: '#64748b' }} 
                  tickLine={false} 
                  axisLine={false} 
                  dy={15}
                />
                <YAxis 
                  stroke="#475569" 
                  tick={{ fontSize: 10, fontWeight: 700, fill: '#64748b' }} 
                  tickLine={false} 
                  axisLine={false} 
                  tickFormatter={(val) => `R$${(val / 1000)}k`} 
                  dx={-10}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                <Bar 
                  dataKey="revenue" 
                  name="Receita Mensal" 
                  radius={[12, 12, 0, 0]}
                  animationDuration={1500}
                >
                  {monthlyComparisonData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color} 
                      style={{ filter: `drop-shadow(0 0 15px ${entry.color}44)` }} 
                    />
                  ))}
                </Bar>
              </BarChart>
            )
          ) : (
            <AreaChart data={scenario?.data || []} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <defs>
                <linearGradient id={`color-${scenario?.id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={scenario?.color} stopOpacity={0.4} />
                  <stop offset="95%" stopColor={scenario?.color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} strokeOpacity={0.4} />
              <XAxis 
                dataKey="month" 
                stroke="#475569" 
                tick={{ fontSize: 11, fontWeight: 700, fill: '#64748b' }} 
                tickLine={false} 
                axisLine={false} 
                dy={15}
              />
              <YAxis 
                stroke="#475569" 
                tick={{ fontSize: 11, fontWeight: 700, fill: '#64748b' }} 
                tickLine={false} 
                axisLine={false} 
                tickFormatter={(val) => `R$${(val / 1000)}k`}
                dx={-10}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#334155', strokeWidth: 1 }} />
              
              {/* Destaque visual do mês selecionado */}
              {selectedMonth !== 'Anual' && (
                <ReferenceArea 
                  x1={selectedMonth} 
                  x2={selectedMonth} 
                  fill={scenario?.color} 
                  fillOpacity={0.1}
                  stroke={scenario?.color}
                  strokeOpacity={0.5}
                  strokeDasharray="3 3"
                />
              )}

              <Area
                type="monotone"
                dataKey="revenue"
                name={scenario?.name}
                stroke={scenario?.color}
                strokeWidth={4}
                fill={`url(#color-${scenario?.id})`}
                activeDot={{ r: 10, strokeWidth: 0, fill: scenario?.color }}
                animationDuration={2000}
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;
