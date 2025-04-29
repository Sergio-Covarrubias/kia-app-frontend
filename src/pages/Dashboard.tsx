import classNames from "classnames";
import { useDashboard } from "@contexts/DashboardContext";
import PieChart from "@components/PieChart";

import { Download } from "lucide-react";

const Dashboard = () => {
    const CONTAINER_CLASSNAME = " px-6 py-8 rounded-lg shadow-lg bg-white ";

    const { timeframe } = useDashboard();

    let DateSelector;
    switch (timeframe) {
        case "day":
            DateSelector = DaySelector;
            break;
        case "month":
            DateSelector = MonthSelector;
            break;
        case "year":
            DateSelector = YearSelector;
            break;
        default:
            throw new Error(`Invalid timeframe type ${timeframe}`);
    }

    return (
        <div className="page-container p-10 gap-y-6">
            <div className={`${CONTAINER_CLASSNAME} flex justify-between`}>
                <div className="gap-x-4 flex items-center">
                    <span className="text-sm font-medium">Periodo:</span>
                    <div className="flex">
                        <TimeframeButton timeframe="day" text="Día" className="rounded-l-lg" />
                        <TimeframeButton timeframe="month" text="Mes" className="" />
                        <TimeframeButton timeframe="year" text="Año" className="rounded-r-lg" />
                    </div>
                </div>

                <DateSelector />

                <button className="px-5 py-3 gap-x-2.5 flex items-center bg-[var(--kia-main-color)] shadow-[0_4px_12px_0_var(--kia-main-color-transparent)] rounded-lg cursor-pointer">
                    <Download className="size-5 text-white" />
                    <span className="text-sm text-white font-medium">Descargar Bitácora</span>
                </button>
            </div>

            <div className="grid grid-cols-2 gap-5">
                <div className={CONTAINER_CLASSNAME}>
                    <PieChart
                        title="Distribución por Tipo de Residuo"
                        data={[
                            { value: 1048, name: "Search Engine" },
                            { value: 735, name: "Direct" },
                            { value: 580, name: "Email" },
                            { value: 484, name: "Union Ads" },
                            { value: 300, name: "Video Ads" }
                        ]}
                    />
                </div>

                <div className={CONTAINER_CLASSNAME}>
                    <PieChart
                        title="Estado de Procesamiento"
                        data={[
                            { value: 1048, name: "Search Engine" },
                            { value: 735, name: "Direct" },
                            { value: 580, name: "Email" },
                            { value: 484, name: "Union Ads" },
                            { value: 300, name: "Video Ads" }
                        ]}
                    />
                </div>

                <div className={CONTAINER_CLASSNAME}>
                    <PieChart
                        title="Distribución por Contenedor"
                        data={[
                            { value: 1048, name: "Search Engine" },
                            { value: 735, name: "Direct" },
                            { value: 580, name: "Email" },
                            { value: 484, name: "Union Ads" },
                            { value: 300, name: "Video Ads" }
                        ]}
                    />
                </div>

                <div className={CONTAINER_CLASSNAME}>
                    <PieChart
                        title="Distribución por Tipo de Residuo"
                        data={[
                            { value: 1048, name: "Search Engine" },
                            { value: 735, name: "Direct" },
                            { value: 580, name: "Email" },
                            { value: 484, name: "Union Ads" },
                            { value: 300, name: "Video Ads" }
                        ]}
                    />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;

type TimeframeButtonProps = {
    timeframe: string;
    text: string;
    className: string;
};
const TimeframeButton = (props: TimeframeButtonProps) => {
    const { timeframe, setTimeframe } = useDashboard();

    return (
        <button
            className={
                classNames(
                    "px-4 py-1.5 text-sm font-medium cursor-pointer",
                    props.className,
                    {
                        "bg-gray-200 text-black": props.timeframe != timeframe,
                        "bg-[var(--kia-main-color)] text-white": props.timeframe == timeframe,
                    })
            }
            onClick={() => setTimeframe(props.timeframe)}
        >
            {props.text}
        </button >
    );
}

const DaySelector = () => {
    const { day, setDay } = useDashboard();

    return (
        <input type="date" value={day} onChange={(e) => setDay(e.target.value)} />
    );
}

const MonthSelector = () => {
    const { month, setMonth } = useDashboard();

    return (
        <input type="month" value={month} onChange={(e) => setMonth(e.target.value)} />
    );
}

const YearSelector = () => {
    const { year, setYear } = useDashboard();

    return (
        <select name="year" id="year" value={year} onChange={(e) => setYear(e.target.value)}>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
        </select>
    );
}
