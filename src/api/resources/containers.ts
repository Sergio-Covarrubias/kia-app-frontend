import { GetContainersResponse, PostContainerBody, PutContainerBody } from "@schemas/resources/containers";
import axios from "../axios";

export const getContainersRequest = () => axios.get<GetContainersResponse>("/containers");
export const postContainerResidueRequest = (data: PostContainerBody) => axios.post<void>("/containers", data);
export const putContainerRequest = (id: number, data: PutContainerBody) => axios.put<void>(`/containers/${id}`, data);
export const deleteContainerRequest = (id: number) => axios.delete<void>(`/containers/${id}`);
