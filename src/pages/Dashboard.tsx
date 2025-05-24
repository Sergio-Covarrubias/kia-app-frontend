import classNames from "classnames";

import { useDashboard, TimeframeType } from "@contexts/DashboardContext";

import PieChart from "@components/PieChart";
import LoadingIcon from "@components/LoadingIcon";

import {
  Download,
  Calendar,
  ChevronDown,
  RefreshCcw
} from "lucide-react";

const CONTAINER_CLASSNAME = " px-10 py-8 rounded-lg shadow-lg bg-white ";

const Dashboard = () => {
  const { refreshValues, downloadBinnacle, loadingBinnacle } = useDashboard();

  return (
    <div className="page-container p-10 gap-y-6">
      <div className={`${CONTAINER_CLASSNAME} grid grid-cols-1 md:grid-cols-3 gap-y-8 justify-between items-center`}>
        {/* Timeframe selector */}
        <div className="gap-x-4 flex flex-col md:flex-row gap-y-3 justify-start items-center">
          <span className="text-sm font-medium">Periodo:</span>
          <div className="flex">
            <TimeframeButton timeframe="day" text="Día" className="rounded-l-lg" />
            <TimeframeButton timeframe="month" text="Mes" className="" />
            <TimeframeButton timeframe="year" text="Año" className="rounded-r-lg" />
          </div>
        </div>

        {/* Date selector */}
        <div className="flex flex-col gap-y-4 items-center">
          <span className="text-center font-medium">Selecciona el periodo</span>

          <div className="flex gap-x-3 justify-center items-center">
            <DateSelector />
            {/* 
            <MoveHorizontal className="text-black size-6" />
            <DateSelector date={endDate} setDate={setEndDate} /> 
            */}
          </div>

          <button
            className="w-fit h-fit px-5 py-3 rounded-lg text-sm button-component"
            onClick={async () => { await refreshValues(); }}
          >
            Actualizar
            <RefreshCcw className="size-5 text-white" />
          </button>
        </div>

        {/* Download binnacle */}
        <div className="flex justify-end">
          <button
            className="w-fit h-fit px-5 py-3 rounded-lg text-sm button-component"
            onClick={async () => { await downloadBinnacle(); }}
          >
            {loadingBinnacle ? <LoadingIcon /> : <Download className="size-8 md:size-5 text-white" />}
            Descargar Bitácora
          </button>
        </div>
      </div>

      <DashboardContent />
    </div>
  );
};

export default Dashboard;

type TimeframeButtonProps = {
  timeframe: TimeframeType;
  text: string;
  className: string;
};
const TimeframeButton = (props: TimeframeButtonProps) => {
  const { timeframe, setTimeframe } = useDashboard();

  return (
    <button
      className={classNames(
        "px-4 py-1.5 text-sm font-medium cursor-pointer transition duration-150 ease-in-out",
        props.className,
        {
          "bg-gray-200 text-black hover:bg-gray-300": props.timeframe != timeframe,
          "bg-[var(--kia-main-color)] text-white": props.timeframe == timeframe,
        }
      )}
      onClick={() => setTimeframe(props.timeframe)}
    >
      {props.text}
    </button>
  );
};

const DateSelector = () => {
  const { timeframe, startDate, setStartDate } = useDashboard();

  const DATE_CLASSNAME = " relative flex justify-center items-center border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:outline-none ";
  const INPUT_CLASSNAME = " text-sm cursor-pointer py-3 pl-3 ";
  const ICON_CLASSNAME = " size-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none ";

  switch (timeframe) {
    case "day":
      return (
        <div className={DATE_CLASSNAME}>
          <input
            type="date"
            className={`${INPUT_CLASSNAME} pr-5`}
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
          />
          <Calendar className={ICON_CLASSNAME} />
        </div>
      );
    case "month":
      return (
        <div className={DATE_CLASSNAME}>
          <input
            type="month"
            className={`${INPUT_CLASSNAME} pr-5`}
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
          />
          <Calendar className={ICON_CLASSNAME} />
        </div>
      );
    case "year":
      return (
        <div className={DATE_CLASSNAME}>
          <select
            name="year"
            className={`${INPUT_CLASSNAME} pr-9`}
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
          >
            <option value="2024">2024</option>
            <option value="2023">2023</option>
          </select>
          <ChevronDown className={ICON_CLASSNAME} />
        </div>
      );
  }
};

const DashboardContent = () => {
  const { values, loadingValues: loading, errors } = useDashboard();

  const error = errors.empty || errors.noDate || errors.startDate || errors.endDate || errors.timeFrame;
  if (error) {
    return (
      <div className={`${CONTAINER_CLASSNAME} flex justify-center text-center text-red-500 font-medium`}>
        {error}
      </div>
    );
  }

  if (loading) {
    return (
      <div className={`${CONTAINER_CLASSNAME} flex gap-x-3.5 justify-center items-center font-medium`}>
        Cargando
        <LoadingIcon color="text-black" />
      </div>
    );
  }

  if (!values) {
    return (
      <div className={`${CONTAINER_CLASSNAME} flex justify-center text-center font-medium`}>
        Actualice su búsqueda
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className={CONTAINER_CLASSNAME}>
        <PieChart
          title="Distribución por Contenedor"
          data={values.containerCount}
        />
      </div>
      <div className={CONTAINER_CLASSNAME}>
        <PieChart
          title="Toneladas por Contenedor"
          data={values.containerTons}
        />
      </div>

      <div className={CONTAINER_CLASSNAME}>
        <PieChart title="Distribución por Área" data={values.areaCount} />
      </div>
      <div className={CONTAINER_CLASSNAME}>
        <PieChart title="Toneladas por Área" data={values.areaTons} />
      </div>

      <div className={CONTAINER_CLASSNAME}>
        <PieChart
          title="Distribución por Estado de Procesamiento"
          data={values.processingStageCount}
        />
      </div>
      <div className={CONTAINER_CLASSNAME}>
        <PieChart
          title="Toneladas por Estado de Procesamiento"
          data={values.processingStageTons}
        />
      </div>
    </div>
  );
};
