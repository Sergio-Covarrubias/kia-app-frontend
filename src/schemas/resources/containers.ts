export type GetContainersResponse = {
  id: number;
  name: string;
}[]; 

export type PostContainerBody = {
  name: string;
};

export type PutContainerBody = PostContainerBody;
