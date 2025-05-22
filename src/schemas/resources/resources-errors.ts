export type GetResourceErrors = {};
export const GetResourceErrors: GetResourceErrors = {};

export type PostResourceErrors = {};
export const PostResourceErrors: PostResourceErrors = {};

export type PutResourceErrors = { nonExisting?: string; };
export const PutResourceErrors: PutResourceErrors = {
  nonExisting: "La entrada no existe",
};

export type DeleteResourceErrors = PutResourceErrors;
export const DeleteResourceErrors: DeleteResourceErrors = PutResourceErrors;
