export type DashboardEntryType = {
    name: string;
    value: number;
};

export type DashboardDataBodyType = {
    timeframe: string;
    startDate: string;
};

export type DashboardDataResponseType = {
    totalTons: number;
    residueCount: DashboardEntryType[];
    containerCount: DashboardEntryType[];
    areaCount: DashboardEntryType[];
    processingStageCount: DashboardEntryType[];
    provider1Count: DashboardEntryType[];
    provider2Count: DashboardEntryType[];
    residueTons: DashboardEntryType[];
    containerTons: DashboardEntryType[];
    areaTons: DashboardEntryType[];
    processingStageTons: DashboardEntryType[];
    provider1Tons: DashboardEntryType[];
};

export type BinnacleBodyType = {
    timeframe: string;
    startDate: string;
};
