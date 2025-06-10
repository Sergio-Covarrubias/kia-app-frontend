export type GetContainersResponse = {
  id: number;
  name: string;
  capacity: string;
}[]; 

export type PostContainerBody = {
  name: string;
  capacity: string;
};

export type PutContainerBody = PostContainerBody;
