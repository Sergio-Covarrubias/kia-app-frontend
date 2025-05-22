import { ErrorResponse } from "@schemas/base-errors";
import UnexpectedError from "./unexpected-error";

const getRequestError = <T extends Record<string, string>,>(error: any, errorPool: T) => {
  error = error.response?.data || UnexpectedError;
  const errorData = error as ErrorResponse<T>;
  return { [errorData.type]: errorPool[errorData.type as keyof T] || "Error desconocido" };
}

export default getRequestError;
