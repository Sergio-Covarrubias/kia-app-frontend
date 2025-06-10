export type GetProviders2Response = {
  id: number;
  name: string;
  semarnatCode: string;
  address: string;
}[]; 

export type PostProvider2Body = {
  name: string;
  authorizationCode: string;
  address: string;
};

export type PutProvider2Body = PostProvider2Body;
