import { GetProcessingStagesResponse, PostProcessingStageBody, PutProcessingStageBody } from "@schemas/resources/processing-stages";
import axios from "../axios";

export const getProcessingStagesRequest = () => axios.get<GetProcessingStagesResponse>("/processing-stages");
export const postProcessingStageResidueRequest = (data: PostProcessingStageBody) => axios.post<void>("/processing-stages", data);
export const putProcessingStageRequest = (id: number, data: PutProcessingStageBody) => axios.put<void>(`/processing-stages/${id}`, data);
export const deleteProcessingStageRequest = (id: number) => axios.delete<void>(`/processing-stages/${id}`);
