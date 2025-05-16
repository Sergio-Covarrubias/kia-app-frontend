export type GetResourceErrors = {};
export const GetResourceErrors: GetResourceErrors = {};

export type PostResourceErrors = { existing?: string; };
export const PostResourceErrors: PostResourceErrors = {
  existing: 'El valor no se puede repetir',
};

export type PutResourceErrors = { nonExisting?: string; };
export const PutResourceErrors: PutResourceErrors = {
  nonExisting: 'La entrada no existe',
};

export type DeleteResourceErrors = PutResourceErrors;
export const DeleteResourceErrors: DeleteResourceErrors = PutResourceErrors;
