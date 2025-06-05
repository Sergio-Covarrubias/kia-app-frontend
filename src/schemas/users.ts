export type PostUserBody = {
  corporateId: string;
  password: string;
};
export type PostUserErrors = { corporateId?: string; };
export const PostUserErrors: PostUserErrors = {
  corporateId: "Ingresa el ID corporativo",
};

export type PatchUserBody = {
  isAdmin: boolean
};
export type PatchUserErrors = { nonExisting?: string; };
export const PatchUserErrors: PatchUserErrors = {
  nonExisting: "El usuario no existe",
};

export type PatchUserPasswordBody = {
  password: string;
};
export type PatchUserPasswordErrors = { nonExisting?: string; };
export const PatchUserPasswordErrors: PatchUserPasswordErrors = {
  nonExisting: "El usuario no existe",
};

export type DeleteUserErrors = { nonExisting?: string; };
export const DeleteUserErrors: DeleteUserErrors = {
  nonExisting: "El usuario no existe",
};

export type GetUsersResponse = {
  users: {
    id: number;
    corporateId: string;
    isAdmin: boolean;
  }[];
  totalPages: number;
};
export type GetUsersErrors = {
  page?: string;
  limit?: string;
};
export const GetUsersErrors: GetUsersErrors = {
  page: 'El número de página debe de ser mayor a 0',
  limit: 'La cantidad de resultados debe de ser mayor a cero',
};

export type GetUserResponse = {
  corporateId: string;
  isAdmin: boolean;
};
export type GetUserErrors = { nonExisting?: string; };
export const GetUserErrors: GetUserErrors = {
  nonExisting: "No existe un usuario con el ID dado",
};
