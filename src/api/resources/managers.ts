import { GetManagersResponse, PostManagerBody, PutManagerBody } from "@schemas/resources/managers";
import axios from "../axios";

export const getManagersRequest = () => axios.get<GetManagersResponse>("/managers");
export const postManagersRequest = (data: PostManagerBody) => axios.post<void>("/managers", data);
export const putManagersRequest = (id: number, data: PutManagerBody) => axios.put<void>(`/managers/${id}`, data);
export const deleteManagersRequest = (id: number) => axios.delete<void>(`/managers/${id}`);
