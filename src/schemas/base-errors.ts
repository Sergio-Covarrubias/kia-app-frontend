export type ErrorResponse<T> = {
  type: keyof T;
  message: string;
};
