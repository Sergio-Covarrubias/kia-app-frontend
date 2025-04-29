import React, { createContext, useContext, useState } from "react";
import { Outlet } from "react-router-dom";

interface DashboardContextType {
    timeframe: string;
    setTimeframe: (timeframe: string) => void;

    day: string;
    setDay: (day: string) => void;
    month: string;
    setMonth: (month: string) => void;
    year: string;
    setYear: (year: string) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

interface DashboardProviderProps { }

export const DashboardProvider: React.FC<DashboardProviderProps> = () => {
    const [timeframe, setTimeframe] = useState<string>("month");

    const [day, setDay] = useState<string>(new Date().toISOString().slice(0, 10));
    const [month, setMonth] = useState<string>(new Date().toISOString().slice(0, 7));
    const [year, setYear] = useState<string>(new Date().getFullYear().toString());

    return (
        <DashboardContext.Provider value={{
            timeframe,
            setTimeframe,

            day,
            setDay,
            month,
            setMonth,
            year,
            setYear,
        }}>
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
