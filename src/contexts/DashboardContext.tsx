import React, { createContext, useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import { ErrorResponse } from "@schemas/errors";
import { DashboardDataResponseType } from "@schemas/dashboard";
import {
  getDashboardDataRequest,
  downloadBinnacleRequest,
} from "@api/dashboard";
import UnexpectedError from "@constants/unexpected-error";

type DashboardContextErrors = {
  noDateSelectedDashboard?: boolean;
  noDateSelectedBinnacle?: boolean;
  emptyDashboard?: boolean;
  emptyBinnacle?: boolean;
  startDate?: boolean;
  endDate?: boolean;
  internal?: boolean;
};
export type TimeframeType = "day" | "month" | "year";

interface DashboardContextType {
  errors: DashboardContextErrors;

  timeframe: TimeframeType;
  setTimeframe: (timeframe: TimeframeType) => void;

  startDate: string;
  setStartDate: (startDate: string) => void;

  loadingValues: boolean;
  values: DashboardDataResponseType | null;
  refreshValues: () => Promise<void>;

  loadingBinnacle: boolean;
  downloadBinnacle: () => Promise<any>;
}

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

interface DashboardProviderProps {}

export const DashboardProvider: React.FC<DashboardProviderProps> = () => {
  const [errors, setErrors] = useState<DashboardContextErrors>({});

  const [timeframe, setTimeframe] = useState<TimeframeType>("month");

  const [startDate, setStartDate] = useState<string>("2024-01");

  const [loadingValues, setLoadingValues] = useState<boolean>(false);
  const [values, setValues] = useState<DashboardDataResponseType | null>(null);

  const [loadingBinnacle, setLoadingBinnacle] = useState<boolean>(false);

  useEffect(() => {
    setValues(null);
  }, [timeframe, startDate]);

  useEffect(() => {
    if (timeframe === "year") {
      setStartDate("2024");
    } else {
      setStartDate("");
    }
  }, [timeframe]);

  const refreshValues = async () => {
    if (!startDate) {
      setErrors({ noDateSelectedDashboard: true });
      return;
    }

    setLoadingValues(true);
    setErrors({});

    try {
      const res = await getDashboardDataRequest({ timeframe, startDate });
      setValues(res.data);
    } catch (error: any) {
      if (!error.response?.data) {
        setLoadingValues(false);
        throw UnexpectedError;
      }

      const errorData = error.response.data as ErrorResponse;
      setErrors({ [errorData.type]: true });
    }

    setLoadingValues(false);
  };

  const downloadBinnacle = async () => {
    if (!startDate) {
      setErrors({ noDateSelectedBinnacle: true });
      return;
    }

    setLoadingBinnacle(true);
    setErrors({});

    try {
      const res = await downloadBinnacleRequest({ timeframe, startDate });

      const blob = res.data;
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Residuos Peligrosos ${startDate}.xlsx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error: any) {
      if (!error.response?.data) {
        setLoadingBinnacle(false);
        throw UnexpectedError;
      }

      // Original request sends a blob, so in case of an error, we need to parse the blob into a JSON
      const errorData = JSON.parse(
        await error.response.data.text()
      ) as ErrorResponse;
      setErrors({ [errorData.type]: true });
    }

    setLoadingBinnacle(false);
  };

  return (
    <DashboardContext.Provider
      value={{
        errors,

        timeframe,
        setTimeframe,

        startDate,
        setStartDate,

        loadingValues,
        values,
        refreshValues,

        loadingBinnacle,
        downloadBinnacle,
      }}
    >
      <Outlet />
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
};
