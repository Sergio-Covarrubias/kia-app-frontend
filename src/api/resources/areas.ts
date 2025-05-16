import { GetAreasResponse, PostAreaBody, PutAreaBody } from "@schemas/resources/areas";
import axios from "../axios";

export const getAreasRequest = () => axios.get<GetAreasResponse>("/areas");
export const postAreaResidueRequest = (data: PostAreaBody) => axios.post<void>("/areas", data);
export const putAreaRequest = (id: number, data: PutAreaBody) => axios.put<void>(`/areas/${id}`, data);
export const deleteAreaRequest = (id: number) => axios.delete<void>(`/areas/${id}`);
