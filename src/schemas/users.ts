export type PostUserBody = {
  corporateId: string;
  password: string;
};
export type PostUserErrors = { corporateId?: string; };
export const PostUserErrors: PostUserErrors = {
  corporateId: "Ingresa el ID corporativo",
};

export type PutUserBody = {
  corporateId: string;
  password: string;
};
export type PutUserErrors = { nonExistingId?: string; };
export const PutUserErrors: PutUserErrors = {
  nonExistingId: "El usuario no existe",
};

export type DeleteUserBody = {
  corporateId: string;
};
export type DeleteUserErrors = { nonExistingId?: string; };
export const DeleteUserErrors: DeleteUserErrors = {
  nonExistingId: "El usuario no existe",
};