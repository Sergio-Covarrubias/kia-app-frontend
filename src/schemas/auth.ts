export type User = {
  id: number;
  isAdmin: boolean;
};

export type LoginBody = {
  corporateId: string;
  password: string;
};

export type LoginResponse = {
  token: string;
} & User;

export type LoginErrors = {
  nonExisting?: string;
  password?: string;
};
export const LoginErrors: LoginErrors = {
  nonExisting: "No existe un usuario el ID dado",
  password: "Contraseña errónea",
};

export type ValidateResponse = User;

export type ValidateErrors = {
  noToken?: string;
  invalidToken?: string;
};
export const ValidateErrors: ValidateErrors = {
  noToken: "No se otorgó el token de autorización",
  invalidToken: "El token otorgado es inválido",
};
