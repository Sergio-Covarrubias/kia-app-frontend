export type GetSctCodesResponse = {
  id: number;
  code: string;
}[]; 

export type PostSctCodeBody = {
  code: string;
};

export type PutSctCodeBody = PostSctCodeBody;
