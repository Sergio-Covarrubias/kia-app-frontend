import { GetProviders2Response, PostProvider2Body, PutProvider2Body } from "@schemas/resources/providers2";
import axios from "../axios";

export const getProviders2Request = () => axios.get<GetProviders2Response>("/providers2");
export const postProvider2Request = (data: PostProvider2Body) => axios.post<void>("/providers2", data);
export const putProvider2Request = (id: number, data: PutProvider2Body) => axios.put<void>(`/providers2/${id}`, data);
export const deleteProvider2Request = (id: number) => axios.delete<void>(`/providers2/${id}`);
