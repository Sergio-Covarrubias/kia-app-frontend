export type GetProcessingStagesResponse = {
  id: number;
  name: string;
}[]; 

export type PostProcessingStageBody = {
  name: string;
};

export type PutProcessingStageBody = PostProcessingStageBody;
