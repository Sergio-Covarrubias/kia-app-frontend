export type DashboardEntry = {
  name: string;
  value: number;
};

export type DashboardDataBody = {
  timeframe: string;
  startDate: string;
};

export type DashboardDataResponse = {
  totalTons: number;
  residueCount: DashboardEntry[];
  containerCount: DashboardEntry[];
  areaCount: DashboardEntry[];
  processingStageCount: DashboardEntry[];
  provider1Count: DashboardEntry[];
  provider2Count: DashboardEntry[];
  residueTons: DashboardEntry[];
  containerTons: DashboardEntry[];
  areaTons: DashboardEntry[];
  processingStageTons: DashboardEntry[];
  provider1Tons: DashboardEntry[];
};

export type DashboardDataErrors = { 
  empty?: string;
  timeFrame?: string;
  startDate?: string;
  endDate?: string;
};
export const DashboardDataErrors: DashboardDataErrors = {
  empty: "No hay registros en el periodo seleccionado",
  timeFrame: "Tipo de periodo de tiempo inválido",
  startDate: "Formato de fecha de inicio inválida",
  endDate: "Formato de fecha final inválida",
};

export type BinnacleBody = {
  timeframe: string;
  startDate: string;
};

export type BinnacleErrors = DashboardDataErrors;
export const BinnacleErrors: BinnacleErrors = DashboardDataErrors;
