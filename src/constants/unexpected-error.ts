import { ErrorResponse } from "@schemas/errors";

const UnexpectedError: ErrorResponse = {
    type: "internal",
    message: "Unexpected error",
};

export default UnexpectedError;
