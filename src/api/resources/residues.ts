import { GetResiduesResponse, PostResidueBody, PutResidueBody } from "@schemas/resources/residues";
import axios from "../axios";

export const getResiduesRequest = () => axios.get<GetResiduesResponse>("/residues");
export const postResidueRequest = (data: PostResidueBody) => axios.post<void>("/residues", data);
export const putResidueRequest = (id: number, data: PutResidueBody) => axios.put<void>(`/residues/${id}`, data);
export const deleteResidueRequest = (id: number) => axios.delete<void>(`/residues/${id}`); 
