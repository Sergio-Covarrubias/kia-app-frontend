import { GetProviders1Response, PostProvider1Body, PutProvider1Body } from "@schemas/resources/providers1";
import axios from "../axios";

export const getProviders1Request = () => axios.get<GetProviders1Response>("/providers1");
export const postProvider1ResidueRequest = (data: PostProvider1Body) => axios.post<void>("/providers1", data);
export const putProvider1Request = (id: number, data: PutProvider1Body) => axios.put<void>(`/providers1/${id}`, data);
export const deleteProvider1Request = (id: number) => axios.delete<void>(`/providers1/${id}`);
