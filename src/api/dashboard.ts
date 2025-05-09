import { DashboardDataBodyType, DashboardDataResponseType } from "@schemas/dashboard";
import axios from "./axios";

export const getDashboardDataRequest = (data: DashboardDataBodyType) => axios.post<DashboardDataResponseType>('form/dashboard-data', data);
export const downloadBinnacleRequest = (data: DashboardDataBodyType) => axios.post('form/binnacle', data, { responseType: 'blob' });
