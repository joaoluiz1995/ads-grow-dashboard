
export interface MonthlyData {
  month: string;
  revenue: number;
  isPeak?: boolean;
}

export interface ProjectionScenario {
  id: string;
  name: string;
  total: number;
  conversion: string;
  leads: string;
  ticket: string;
  dailyGoal: string;
  color: string;
  data: MonthlyData[];
}

export const SCENARIOS: ProjectionScenario[] = [
  {
    id: 'minima',
    name: 'Projeção Mínima',
    total: 2832000.00,
    conversion: '7,5%',
    leads: '7.5k',
    ticket: 'R$ 430',
    dailyGoal: 'R$ 11.465,60',
    color: '#1d90ff', // Azul da Logo ADS GROW
    data: [
      { month: 'Jan', revenue: 240777.60 },
      { month: 'Fev', revenue: 206380.80 },
      { month: 'Mar', revenue: 252243.20 },
      { month: 'Abr', revenue: 229312.00 },
      { month: 'Mai', revenue: 229312.00 },
      { month: 'Jun', revenue: 240777.60 },
      { month: 'Jul', revenue: 263708.80, isPeak: true },
      { month: 'Ago', revenue: 240777.60 },
      { month: 'Set', revenue: 240777.60 },
      { month: 'Out', revenue: 240777.60 },
      { month: 'Nov', revenue: 217846.40 },
      { month: 'Dez', revenue: 229312.00 },
    ]
  },
  {
    id: 'cota',
    name: 'Projeção Cota',
    total: 3681000.00,
    conversion: '10%',
    leads: '7.5k',
    ticket: 'R$ 430',
    dailyGoal: 'R$ 14.903,00',
    color: '#3b82f6', // Blue
    data: [
      { month: 'Jan', revenue: 312963.00 },
      { month: 'Fev', revenue: 268254.00 },
      { month: 'Mar', revenue: 327866.00 },
      { month: 'Abr', revenue: 298060.00 },
      { month: 'Mai', revenue: 298060.00 },
      { month: 'Jun', revenue: 312963.00 },
      { month: 'Jul', revenue: 342769.00, isPeak: true },
      { month: 'Ago', revenue: 312963.00 },
      { month: 'Set', revenue: 312963.00 },
      { month: 'Out', revenue: 312963.00 },
      { month: 'Nov', revenue: 283157.00 },
      { month: 'Dez', revenue: 298060.00 },
    ]
  },
  {
    id: 'meta',
    name: 'Projeção Meta',
    total: 5664000.00,
    conversion: '15%',
    leads: '7.5k',
    ticket: 'R$ 430',
    dailyGoal: 'R$ 22.931,18',
    color: '#8b5cf6', // Violet
    data: [
      { month: 'Jan', revenue: 481554.78 },
      { month: 'Fev', revenue: 412761.24 },
      { month: 'Mar', revenue: 504485.96 },
      { month: 'Abr', revenue: 458623.60 },
      { month: 'Mai', revenue: 458623.60 },
      { month: 'Jun', revenue: 481554.78 },
      { month: 'Jul', revenue: 527417.14, isPeak: true },
      { month: 'Ago', revenue: 481554.78 },
      { month: 'Set', revenue: 481554.78 },
      { month: 'Out', revenue: 481554.78 },
      { month: 'Nov', revenue: 435692.42 },
      { month: 'Dez', revenue: 458623.60 },
    ]
  },
  {
    id: 'super-meta',
    name: 'Projeção Super Meta',
    total: 6513000.00,
    conversion: '17%',
    leads: '7.5k',
    ticket: 'R$ 430',
    dailyGoal: 'R$ 26.368,45',
    color: '#ec4899', // Pink
    data: [
      { month: 'Jan', revenue: 553737.45 },
      { month: 'Fev', revenue: 474632.10 },
      { month: 'Mar', revenue: 580105.90 },
      { month: 'Abr', revenue: 527369.00 },
      { month: 'Mai', revenue: 527369.00 },
      { month: 'Jun', revenue: 553737.45 },
      { month: 'Jul', revenue: 606474.35, isPeak: true },
      { month: 'Ago', revenue: 553737.45 },
      { month: 'Set', revenue: 553737.45 },
      { month: 'Out', revenue: 553737.45 },
      { month: 'Nov', revenue: 501000.55 },
      { month: 'Dez', revenue: 527369.00 },
    ]
  }
];

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};
