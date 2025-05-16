import { DashboardDataBody, DashboardDataResponse } from "@schemas/dashboard";
import axios from "./axios";

export const getDashboardDataRequest = (data: DashboardDataBody) => axios.post<DashboardDataResponse>("/form/dashboard-data", data);
export const downloadBinnacleRequest = (data: DashboardDataBody) => axios.post("/form/binnacle", data, { responseType: "blob" });
