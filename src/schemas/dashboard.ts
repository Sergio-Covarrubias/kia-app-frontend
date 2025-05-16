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

export type DashboardDataErrors = { empty?: string; };
export const DashboardDataErrors: DashboardDataErrors = {
  empty: "No hay registros en el periodo seleccionado",
};

export type BinnacleBody = {
  timeframe: string;
  startDate: string;
};

export type BinnacleErrors = { empty?: string; };
export const BinnacleErrors: BinnacleErrors = {
  empty: "No hay registros en el periodo seleccionado"
};
