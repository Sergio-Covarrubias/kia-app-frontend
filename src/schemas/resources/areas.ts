export type GetAreasResponse = {
  id: number;
  name: string;
}[]; 

export type PostAreaBody = {
  name: string;
};

export type PutAreaBody = PostAreaBody;
