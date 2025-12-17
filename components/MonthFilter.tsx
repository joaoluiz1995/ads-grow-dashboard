
import React from 'react';

interface MonthFilterProps {
  selectedMonth: string;
  onMonthChange: (month: string) => void;
  months: string[];
}

const MonthFilter: React.FC<MonthFilterProps> = ({ selectedMonth, onMonthChange, months }) => {
  const options = ['Anual', ...months];

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar max-w-full">
      <div className="flex p-1.5 bg-surface/60 backdrop-blur-md border border-slate-800/50 rounded-2xl">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onMonthChange(option)}
            className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 whitespace-nowrap ${
              selectedMonth === option
                ? 'bg-brand-blue text-black shadow-glow'
                : 'text-slate-500 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MonthFilter;
