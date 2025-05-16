export type GetProviders1Response = {
  id: number;
  name: string;
  semarnatCode: string;
}[]; 

export type PostProvider1Body = {
  name: string;
  semarnatCode: string;
};

export type PutProvider1Body = PostProvider1Body;
