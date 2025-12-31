
export enum View {
  DASHBOARD = 'DASHBOARD',
  DATA_ENTRY = 'DATA_ENTRY',
  DATA_QUALITY = 'DATA_QUALITY',
  REPORTS = 'REPORTS',
  PIVOT_TABLE = 'PIVOT_TABLE',
  VISUALIZER = 'VISUALIZER',
  MAPS = 'MAPS',
  SCORECARD = 'SCORECARD',
  SETTINGS = 'SETTINGS'
}

export interface ScorecardIndicator {
  name: string;
  value: number;
  status: 'achieved' | 'progress' | 'on-track' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
}

export interface OrgUnit {
  id: string;
  name: string;
  level: number;
  children?: OrgUnit[];
}

export interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: string;
  color: string;
}
