import { ErrorResponse } from "@schemas/base-errors";

type UnexpectedError = { internal?: string; }
const UnexpectedError: ErrorResponse<UnexpectedError> = {
  type: "internal",
  message: "Unexpected error",
};

export default UnexpectedError;
