export type GetManagersResponse = {
  id: number;
  name: string;
}[]; 

export type PostManagerBody = {
  name: string;
};

export type PutManagerBody = PostManagerBody;
