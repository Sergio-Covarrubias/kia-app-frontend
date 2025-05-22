import { GetSctCodesResponse, PostSctCodeBody, PutSctCodeBody } from "@schemas/resources/sct-codes"; 
import axios from "../axios";

export const getSctCodesRequest = () => axios.get<GetSctCodesResponse>("/sct-codes");
export const postSctCodeRequest = (data: PostSctCodeBody) => axios.post<void>("/sct-codes", data);
export const putSctCodeRequest = (id: number, data: PutSctCodeBody) => axios.put<void>(`/sct-codes/${id}`, data);
export const deleteSctCodeRequest = (id: number) => axios.delete<void>(`/sct-codes/${id}`);
