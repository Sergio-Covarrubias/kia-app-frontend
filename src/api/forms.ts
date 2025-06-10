import { GetFormOptionsResponse, PostFormBody, GetFormsResponse, GetFormResponse } from "@schemas/forms";
import axios from "./axios";

export const getFormOptionsRequest = () => axios.get<GetFormOptionsResponse>("/forms/options");
export const postFormRequest = (data: PostFormBody) => axios.post("/forms", data);
export const getFormsRequest = (query: string, page: number, limit: number, startDate: string) => axios.get<GetFormsResponse>(`/forms?query=${query}&page=${page}&limit=${limit}&startDate=${startDate}`);
export const getFormRequest = (formId: number) => axios.get<GetFormResponse>(`forms/${formId}`);
export const putFormRequest = (formId: number, data: PostFormBody) => axios.put(`/forms/${formId}`, data);
export const deleteFormRequest = (formId: number) => axios.delete(`forms/${formId}`);
