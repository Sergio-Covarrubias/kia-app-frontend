import { DashboardDataBody, DashboardDataResponse } from "@schemas/dashboard";
import axios from "./axios";

export const getDashboardDataRequest = (data: DashboardDataBody) => axios.post<DashboardDataResponse>("/forms/dashboard-data", data);
export const downloadBinnacleRequest = (data: DashboardDataBody) => axios.post("/forms/binnacle", data, { responseType: "blob" });
