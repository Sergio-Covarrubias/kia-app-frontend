export type GetResiduesResponse = {
  id: number;
  name: string;
  materials: string;
}[]; 

export type PostResidueBody = {
  name: string;
  materials: string;
};

export type PutResidueBody = PostResidueBody;
